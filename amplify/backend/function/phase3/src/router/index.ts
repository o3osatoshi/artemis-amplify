import express, { NextFunction, Request, Response } from "express";
import UseCase from "../application/p3/useCase";
import { P3Player } from "../domain/type";

const router = express.Router();
const useCase = new UseCase();

router.put(
  "/api/p3/players/:walletAddress",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const p3Player: P3Player = req.body.p3Player;
      // const p3Artifacts: P3Artifacts = await useCase.checkArtifacts(p3Player);
      // res.json({ p3Artifacts: p3Artifacts });
      await useCase.checkArtifacts(p3Player);
      res.json({ result: "success" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
