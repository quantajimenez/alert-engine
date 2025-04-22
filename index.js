const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 8080;
const TELEGRAM_ENDPOINT = process.env.TELEGRAM_WEBHOOK || "https://quanta-telegram-bot.onrender.com/tradingview"; // fallback if env var is missing

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Alert engine is live!');
});

app.post('/send-alert', async (req, res) => {
  const payload = req.body;
  console.log("📨 Received TradingView payload:", payload);

  try {
    const response = await axios.post(TELEGRAM_ENDPOINT, payload);
    console.log("✅ Forwarded to Telegram bot:", response.data);
    res.status(200).send("✅ Alert forwarded to Telegram.");
  } catch (error) {
    console.error("❌ Error forwarding alert:", error.message);
    res.status(500).send("❌ Failed to forward alert.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Alert engine running on port ${PORT}`);
});
