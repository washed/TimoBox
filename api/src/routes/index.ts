import express from "express";
import PingController from "../controllers/ping";
import CommandPlayerController from "../controllers/commandPlayer";
import CommandExtensionController from "../controllers/commandExtension";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/commandplayer", async (_req, res) => {
  const controller = new CommandPlayerController();
  const response = await controller.getCurrentCommand();
  return res.send(response);
});

router.post("/commandplayer", async (_req, res) => {
  const controller = new CommandPlayerController();
  const response = await controller.setCurrentCommand(_req.body);
  return res.send(response);
});

router.get("/commandextension", async (_req, res) => {
  const controller = new CommandExtensionController();
  const response = await controller.getCurrentCommand();
  return res.send(response);
});

router.post("/commandextension", async (_req, res) => {
  const controller = new CommandExtensionController();
  const response = await controller.setCurrentCommand(_req.body);
  return res.send(response);
});

export default router;