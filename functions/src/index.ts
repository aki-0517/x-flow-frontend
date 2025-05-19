/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import { paymentMiddleware } from "x402-express";

admin.initializeApp();
const app = express();
app.use(cors());

type ApiConfig = {
  resource: string;
  endpoints: {
    path: string;
    method: string;
    price: string;
    network: string;
    payTo: string;
    [key: string]: unknown;
  }[];
  [key: string]: unknown;
};

// 動的にx402 paymentMiddlewareを適用する
app.get("/resource/:filename", async (req, res) => {
  try {
    // Storageからapi-configs/{filename}.jsonを取得
    const bucket = admin.storage().bucket();
    const file = bucket.file(`api-configs/${req.params.filename}.json`);
    const [exists] = await file.exists();
    if (!exists) {
      res.status(404).send("Not found");
      return;
    }
    const [contents] = await file.download();
    const config: ApiConfig = JSON.parse(contents.toString());

    // endpointsからこのリクエストに該当する設定を探す
    const endpoint = config.endpoints.find(
      ep => ep.path === `/resource/${req.params.filename}` && ep.method === "GET"
    );
    if (!endpoint) {
      res.status(404).send("endpoint not found");
      return;
    }

    // 型の衝突を明示的に無視
    return paymentMiddleware(
      endpoint.payTo as `0x${string}`,
      {
        price: endpoint.price,
        network: endpoint.network,
      },
      {
        url: "https://x402.org/facilitator",
      }
    )(
      req as unknown as import("express").Request,
      res as unknown as import("express").Response,
      () => {
        file.createReadStream().pipe(res);
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).send("internal error");
  }
});

// APIリスト取得（無料）
app.get("/list", async (req, res) => {
  try {
    const bucket = admin.storage().bucket();
    const [files] = await bucket.getFiles({ prefix: "api-configs/" });
    const configs: ApiConfig[] = [];
    for (const file of files) {
      if (!file.name.endsWith(".json")) continue;
      const [contents] = await file.download();
      const json = JSON.parse(contents.toString());
      configs.push({ ...json, id: json.resource });
    }
    res.json(configs);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e);
      res.status(500).json({ error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ error: "Unknown error" });
    }
  }
});

export const api = functions.onRequest(
  { cors: true },
  app
);
