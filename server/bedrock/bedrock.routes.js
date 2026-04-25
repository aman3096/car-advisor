const express = require("express");
const router = express.Router();
const {
  InvokeModelWithResponseStreamCommand
} = require("@aws-sdk/client-bedrock-runtime");

const bedrockClient = require("./bedrock.client");
const carsData = require("../cars_dataset.json"); // 50 car generated JSON is present here

// For the streaming of the responses of the customer
router.post("/ask", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "prompt is required" });
  }
  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1024,
    system: `You are a car advisor assistant. Use ONLY the following car dataset to answer questions.
    Do not make up data outside of what is provided.
    DATASET: ${JSON.stringify(carsData, null, 2)}`,
    messages: [
      { role: "user", content: prompt }
    ],
  };

  try {
   const command = new InvokeModelWithResponseStreamCommand({
      modelId: "us.anthropic.claude-sonnet-4-20250514-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    });

    const response = await bedrockClient.send(command);

    for await (const chunk of response.body) {
      if (chunk.chunk?.bytes) {
        const decoded = JSON.parse(Buffer.from(chunk.chunk.bytes).toString("utf-8"));
        if (decoded.type === "content_block_delta" && decoded.delta?.text) {
          res.write(`data: ${JSON.stringify({ text: decoded.delta.text })}\n\n`);
        }
      }
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

module.exports = router;