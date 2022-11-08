import express from "express";
import {
  deleteRobotById,
  getAllRobots,
  getRobotById,
} from "../controllers/robotsControllers.js";

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/robots", getAllRobots);
router.get("/robots/:idRobot", getRobotById);
router.delete("/robots/delete/:idRobot", deleteRobotById);

export default router;
