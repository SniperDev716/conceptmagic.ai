const delFile = require('../utils/delFile');
const { getDescription, getPromptByKeywords } = require("../utils/chatGPT");
const ConceptModel = require('../models/concepts');
const { _generateImage, _getImages } = require('../utils/imagineAPI');
const { pinterestSearch } = require('../scripts/pinSearch');

exports.upload = async (req, res) => {
  try {
    const file = req.file;
    const oldFile = req.body.oldFile;
    if (oldFile) {
      delFile(`public${oldFile}`);
    }

    return res.json({
      success: true,
      path: file.path.replace(/\\/g, '/').replace('public/', '/'),
      filename: file.originalname,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteFile = async (req, res) => {
  const path = req.body.path;

  if (path) {
    delFile(`public${path}`);
  }

  return res.json({
    success: true,
  });
}

exports.getImageDescriptions = async (req, res) => {
  try {
    let fileLists = req.body.fileLists;
    let name = req.body.name || "Untitled";
    let inputImages = [];
    for (const file of fileLists) {
      let desc = await getDescription(`http://46.175.146.14${file}`);
      // let desc = await getDescription(`http://54.173.222.178${file}`);

      inputImages.push({
        path: file,
        desc,
      });
    };
    if (inputImages.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload images."
      });
    }

    let prompt = inputImages[0].desc/* await getPromptByKeywords(inputImages[0].desc) */;

    let data = await _generateImage(prompt);

    let concept = new ConceptModel({
      inputImages,
      userId: req.user._id,
      name,
      resultImages: [{ imageId: data.id, prompt, status: data.status }]
    });

    await concept.save();

    _getImages(data.id).then(async (_res) => {
      await ConceptModel.updateOne(
        {
          _id: concept._id,
          'resultImages.imageId': data.id
        },
        {
          $set: {
            'resultImages.$.urls': _res.upscaled_urls,
            'resultImages.$.status': _res.status,
          }
        }, { new: true });
      req.app.get('io').to(req.user.socketId).emit('IMAGE_GENERATED', {
        success: true,
      });
    });

    return res.json({
      success: true,
      id: concept._id
    });
  } catch (error) {
    console.log("[LOG:ERROR-getImageDescription]", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getConceptById = async (req, res) => {
  try {
    let id = req.params.id;
    let concept = await ConceptModel.findById(id);
    if (!concept) {
      return res.status(404).json({
        success: false,
        message: "Not Found!"
      })
    }
    return res.json({
      success: true,
      concept
    })
  } catch (error) {
    console.log("[LOG:ERROR] getConceptById", error);
    return res.status(500).json({
      succes: false,
      message: error.message
    })
  }
}

exports.generateImage = async (req, res) => {
  try {
    const keywords = req.body.keywords;
    const id = req.params.id;
    const imageId = req.body.imageId;
    const isAdvanced = req.body.isAdvanced;

    const concept = await ConceptModel.findById(id);
    let prevPrompt;
    if (imageId && !isAdvanced) {
      let img = concept.resultImages.filter(img => img.imageId == imageId);
      prevPrompt = img[0].prompt;
    }
    let prompt = keywords;
    if (!isAdvanced && keywords) {
      prompt = await getPromptByKeywords(keywords, prevPrompt);
    }

    prompt = prompt || prevPrompt;

    let data = await _generateImage(prompt);

    concept.resultImages = [...concept.resultImages, { imageId: data.id, prompt, status: data.status }];

    await concept.save();

    _getImages(data.id).then(async (_res) => {
      await ConceptModel.updateOne(
        {
          _id: concept._id,
          'resultImages.imageId': data.id
        },
        {
          $set: {
            'resultImages.$.urls': _res.upscaled_urls,
            'resultImages.$.status': _res.status,
          }
        }, { new: true });
      req.app.get('io').to(req.user.socketId).emit('IMAGE_GENERATED', {
        success: true,
      });
    });

    return res.json({
      success: true,
      concept,
    });

  } catch (error) {
    console.log(error.response);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getProjects = async (req, res) => {
  try {
    const projects = await ConceptModel.find({
      userId: req.user._id
    });
    return res.json({
      success: false,
      projects
    });
  } catch (error) {
    console.log("[ERROR]:getProject", error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.getImagesfromPin = async (req, res) => {
  const { query, token, bookmarks, cookie } = req.body;

  try {
    let data = await pinterestSearch(query, cookie, token, bookmarks);
    return res.json({
      success: true,
      ...data,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}