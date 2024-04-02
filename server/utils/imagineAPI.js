const axios = require("axios");

const config = require("../config");
const { sleep } = require("./helpers");
const UserModel = require("../models/userModel");
const socketio = require("../scripts/socketio");

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "https://cl.imagineapi.dev/items/images/";

axiosClient.defaults.headers = {
  'Authorization': `Bearer ${config.IMAGINE_API_KEY}`, // <<<< TODO: remember to change this
  'Content-Type': 'application/json'
};

// const data = {
//   prompt: "Cinematic Portrait, GodlyBeautiful french supermodel, dynamic lighting, [light + space of James Turrell + Bauhaus architectural forms], BeautyCore, Sharp Details --ar 21:9 --style raw"
// };

// we wrap it in a main function here so we can use async/await inside of it.
exports._generateImage = async (prompt) => {
  try {
    console.log("[LOG]:Prompt", prompt);
    const response = await axiosClient.post('/', { prompt });

    const responseData = response.data;
    console.log(responseData);
    return responseData.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

exports._getImages = async (imageId, req) => {
  try {
    let response = await axiosClient.get(`${imageId}`);
    let responseData = response.data;
    // console.log(responseData)
    let data = responseData.data;
    while (data.status != "completed" && data.status != "failed") {
      console.log(req.user.name, data.status, Date.now());
      response = await axiosClient.get(`${imageId}`);
      responseData = response.data;
      data = responseData.data;
      // console.log(data);
      // let user = await UserModel.findById(req.user._id);
      // if (user.socketId) {
      // console.log(user.socketId, 'socket_id');
      socketio.getSocketIO().to(req.user._id.toString()).emit("IMAGE_PROCESS", {
        progress: data.progress,
        status: data.status.replace('pending', 'uploading').replace('in-progress', 'generating'),
        id: data.id,
        url: data.url,
      });
      // }
      await sleep(1);
    }
    console.log(req.user.name, data.status, Date.now());
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};


// generateImage();

// getImages("11335757-f6ca-4459-b73b-174aa1af7f49");
// _getImages("68b14b16-7cfb-4f36-9ab7-77c7312999df");