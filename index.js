import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const TOKEN = "8470504498:AAGJVfqgazWHNRNmXAAEDXzqEl0o1JArbgk"; // এখানে আপনার BotFather এর Token দিন
const API_URL = `https://api.telegram.org/bot${TOKEN}/`;

// Root check
app.get("/", (req, res) => {
  res.send("✅ Telegram Bot is running on Render!");
});

// Webhook route
app.post("/webhook", async (req, res) => {
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    let reply = "আপনি লিখেছেন: " + text;
    if (text === "/start") {
      reply = " হ্যালো! আমি Render.com এ রান হওয়া Node.js Telegram Bot ✅";
    }

    // Reply পাঠানো
    await fetch(API_URL + "sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply
      })
    });
  }

  res.sendStatus(200);
});

// Render PORT ব্যবহার করবে
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot server running on port ${PORT}`));
