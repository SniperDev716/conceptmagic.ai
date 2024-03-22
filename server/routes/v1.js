const express = require("express");

const v1Controller = require("../controllers/v1.js");
const upload = require("../middlewares/upload.js");

const router = express.Router();

router.post("/upload", upload, v1Controller.upload);
router.post("/deleteFile", v1Controller.deleteFile);
router.post("/getImageDescription", v1Controller.getImageDescriptions);
router.get("/getConceptById/:id", v1Controller.getConceptById);
router.post("/generateImage/:id", v1Controller.generateImage);

module.exports = router;
