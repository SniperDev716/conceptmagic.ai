const express = require("express");

const v1Controller = require("../controllers/v1.js");
const upload = require("../middlewares/upload.js");
const { isAdmin } = require("../middlewares/checkAdmin");

const router = express.Router();

router.post("/upload", upload, v1Controller.upload);
router.post("/deleteFile", v1Controller.deleteFile);
router.post("/getImageDescription", v1Controller.getImageDescriptions);
router.get("/getConceptById/:id", v1Controller.getConceptById);
router.post("/generateImage/:id", v1Controller.generateImage);
router.get("/getProjects", v1Controller.getProjects);
router.get("/getProjects/:id", isAdmin, v1Controller.getProjects);
router.post("/getImagesfromPin", v1Controller.getImagesfromPin);

module.exports = router;
