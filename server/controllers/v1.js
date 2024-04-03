const delFile = require('../utils/delFile');
const { getDescription, getPromptByKeywords, getIdeas } = require("../utils/chatGPT");
const ConceptModel = require('../models/concepts');
const { _generateImage, _getImages } = require('../utils/imagineAPI');
const { pinterestSearch } = require('../scripts/pinSearch');
const UserModel = require('../models/userModel');
const config = require('../config');
const { randomUUID } = require('crypto');
const socketio = require('../scripts/socketio');

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
      // let path = file.includes("https://") ? file : `http://46.175.146.14:5000${file}`;
      // let path = file.includes("https://") ? file : `http://54.173.222.178${file}`;
      // let desc = await getDescription(path);
      // console.log(desc);

      inputImages.push({
        path: file,
        // desc,
      });
    };
    if (inputImages.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload images."
      });
    }

    // let prompt = inputImages[0].desc/* await getPromptByKeywords(inputImages[0].desc) */;

    // if (!prompt) {
    //   return res.status(400).json({
    //     succes: false,
    //     message: "Error get image descriotion.",
    //   });
    // }

    // let data = await _generateImage(prompt);

    let concept = new ConceptModel({
      inputImages,
      userId: req.user._id,
      name,
      resultImages: [{ imageId: "tmp", status: "processing" }]
    });

    await concept.save();
    req.user.projects = [...req.user.projects, concept._id];
    await req.user.save();
    // let path = inputImages[0].path.includes("https://") ? inputImages[0].path : `http://46.175.146.14:5000${inputImages[0].path}`;
    let path = inputImages[0].path.includes("https://") ? inputImages[0].path : `${config.ASSETS_URL}${inputImages[0].path}`;
    getDescription(path).then(async prompt => {
      concept.inputImages[0].desc = prompt;
      let ideas = await getIdeas(prompt);
      _generateImage(prompt).then(async data => {
        concept.resultImages = [{ imageId: data.id, prompt, status: data.status }];
        ideas.forEach((idea, index) => {
          concept.resultImages = [...concept.resultImages, { imageId: `tmp-${index}`, parent: data.id, addition: idea, status: "processing" }];
        });
        await concept.save();

        ideas.forEach((idea, index) => {
          // let tmpId = randomUUID();
          new Promise(async () => {

            let newPrompt = await getPromptByKeywords(idea, prompt);

            let _data = await _generateImage(newPrompt);

            await ConceptModel.updateOne(
              {
                _id: concept._id,
                'resultImages.imageId': `tmp-${index}`
              },
              {
                $set: {
                  'resultImages.$.imageId': _data.id,
                  'resultImages.$.prompt': newPrompt,
                  'resultImages.$.status': _data.status,
                }
              }, { new: true });
            _getImages(_data.id, req).then(async (_res) => {
              await ConceptModel.updateOne(
                {
                  _id: concept._id,
                  'resultImages.imageId': _data.id
                },
                {
                  $set: {
                    'resultImages.$.urls': _res.upscaled_urls,
                    'resultImages.$.status': _res.status,
                  }
                }, { new: true });
              socketio.getSocketIO().to(req.user._id.toString()).emit('IMAGE_GENERATED', {
                success: true,
              });
            });
          });
        });
        // for (const idea of ideas) {

        // }

        _getImages(data.id, req).then(async (_res) => {
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
          socketio.getSocketIO().to(req.user._id.toString()).emit('IMAGE_GENERATED', {
            success: true,
          });
        });
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
    // let resultImages = concept.resultImages;
    // new Promise((resolve, reject) => {
    //   resultImages.map(resultImage => {
    //     if (resultImage.status != 'completed' && resultImage.status != 'failed' && resultImage.status != 'processing') {
    //       _getImages(resultImage.imageId, req).then(async (_res) => {
    //         await ConceptModel.updateOne(
    //           {
    //             _id: concept._id,
    //             'resultImages.imageId': resultImage.imageId
    //           },
    //           {
    //             $set: {
    //               'resultImages.$.urls': _res.upscaled_urls,
    //               'resultImages.$.status': _res.status,
    //             }
    //           }, { new: true });
    //         let user = await UserModel.findById(req.user._id);
    //         if (user.socketId) {
    //           req.app.get('io').to(user.socketId).emit('IMAGE_GENERATED', {
    //             success: true,
    //           });
    //         }
    //         resolve(true);
    //         // console.log(req.user.socketId, '-=-=-=-=-=-=-=-=-=-=-=-=-');
    //       });
    //     }
    //   });
    // });
    let result = await ConceptModel.aggregate([
      {
        $match: {
          'resultImages.status': { $in: ['pending', 'processing', 'in-progress'] },
          'createdAt': { $lt: concept.createdAt }
        }
      },
      {
        $project: {
          resultImages: {
            $filter: {
              input: '$resultImages',
              as: 'resultImage',
              cond: { $in: ['$$resultImage.status', ['pending', 'processing', 'in-progress']] }
            }
          }
        }
      },
      { $unwind: '$resultImages' },
      {
        $match: {
          'resultImages.status': { $in: ['pending', 'processing', 'in-progress'] }
        }
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      }
    ]);
    // console.log(result[0].count);
    return res.json({
      success: true,
      concept,
      count: result[0].count
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
    // new Promise()
    let tmpId = randomUUID();
    concept.resultImages = [...concept.resultImages, { imageId: tmpId, parent: imageId, addition: prevPrompt ? keywords : "", status: "processing" }];
    await concept.save();
    new Promise(async (resolve, reject) => {
      let prompt = keywords;
      if (!isAdvanced && keywords) {
        prompt = await getPromptByKeywords(keywords, prevPrompt);
      }

      prompt = prompt || prevPrompt;

      let data = await _generateImage(prompt);

      await ConceptModel.updateOne(
        {
          _id: concept._id,
          'resultImages.imageId': tmpId
        },
        {
          $set: {
            'resultImages.$.imageId': data.id,
            'resultImages.$.prompt': prompt,
            'resultImages.$.status': data.status,
          }
        }, { new: true });

      // concept.resultImages = [...concept.resultImages, { imageId: data.id, prompt, status: data.status }];

      // await concept.save();

      _getImages(data.id, req).then(async (_res) => {
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

        socketio.getSocketIO().to(req.user._id.toString()).emit('IMAGE_GENERATED', {
          success: true,
        });
        resolve(true);
        // console.log(req.user.socketId, '--=-=-=-=-=-=-=-=-=-=-=-=-');
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
    let userId = req.user._id;
    if (req.params.id) {
      userId = req.params.id;
    }
    const projects = await ConceptModel.find({
      userId
    }).sort('-createdAt');
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