const express = require("express");
const planController = require("../controllers/plan");
const { isAdmin } = require("../middlewares/checkAdmin");
const router = express.Router();

router.get('/', planController.getAll);
router.get('/activePlan', planController.getActivePlan);
router.get('/getUserSubscription', planController.getUserSubscription);
router.post('/createSubscription', planController.createSubscription);
router.post('/increasePlanLimit', isAdmin, planController.increasePlanLimit);

module.exports = router;
