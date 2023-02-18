import express from "express";
import PingController from "../controllers/ping";
import CommandController from "../controllers/command";
import ExtensionCommandController from "../controllers/extensionCommand";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/command", async (_req, res) => {
  const controller = new CommandController();
  const response = await controller.getCurrentCommand();
  return res.send(response);
});

router.post("/command", async (_req, res) => {
  const controller = new CommandController();
  const response = await controller.setCurrentCommand(_req.body);
  return res.send(response);
});

router.get("/extensioncommand", async (_req, res) => {
  const controller = new ExtensionCommandController();
  const response = await controller.getCurrentCommand();
  return res.send(response);
});

router.post("/extensioncommand", async (_req, res) => {
  const controller = new ExtensionCommandController();
  const response = await controller.setCurrentCommand(_req.body);
  return res.send(response);
});

export default router;