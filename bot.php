<?php
$API_KEY = "8470504498:AAEt9uUhmLlz7SkPo79ohKZ0Sj4qC5kap2c"; // এখানে আপনার BotFather এর Token দিন
$API_URL = "https://api.telegram.org/bot$API_KEY/";

// Telegram থেকে ডাটা নিন
$update = json_decode(file_get_contents("php://input"), true);

$chat_id = $update["message"]["chat"]["id"];
$message = $update["message"]["text"];

// Response logic
if ($message == "/start") {
    $reply = "👋 হ্যালো! আমি আপনার PHP Telegram Bot ✅";
} else {
    $reply = "আপনি লিখেছেন: $message";
}

// ইউজারকে মেসেজ পাঠানো
file_get_contents($API_URL."sendMessage?chat_id=".$chat_id."&text=".urlencode($reply));
?>
