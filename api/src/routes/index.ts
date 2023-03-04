import express from "express";
import PingController from "../controllers/ping";
import CommandController from "../controllers/command";
import NfcTagController from "../controllers/nfcTag";
import StatisticController from "../controllers/statistic";
import ActivityController from "../controllers/activity";
import SpotifyController from "../controllers/spotify";

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

router.get("/tags", async (_req, res) => {
  const controller = new NfcTagController();
  const response = await controller.getNfcTags();
  return res.send(response);
});

router.get("/tag/:tagid", async (_req, res) => {
  const controller = new NfcTagController();
  const response = await controller.getNfcTag(_req.params.tagid);
  return res.send(response);
});

router.get("/tag/:tagid/execute", async (_req, res) => {
  const controller = new NfcTagController();
  const response = await controller.executeNfcTag(_req.params.tagid);
  return res.send(response);
});

router.post("/tag", async (_req, res) => {
  const controller = new NfcTagController();
  const response = await controller.setNfcTag(_req.body);
  return res.send(response);
});

router.get("/statistic", async (_req, res) => {
  const controller = new StatisticController();
  const response = await controller.getStatistic();
  return res.send(response);
});

router.get("/activity", async (_req, res) => {
  const controller = new ActivityController();
  const response = await controller.getActivityList();
  return res.send(response);
});

router.post("/spotifysecret", async (_req, res) => {
  const controller = new SpotifyController();
  const response = await controller.setSecret(_req.body);
  return res.send(response);
});

export default router;