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

admin.initializeApp();
const app = express();
app.use(cors());

type ApiConfig = {
  id: string;
  [key: string]: unknown;
};

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
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

export const api = functions.onRequest(
  { cors: true },
  app
);
