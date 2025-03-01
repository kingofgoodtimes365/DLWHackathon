import React, { useState } from "react";
import "./MentalWellBeing.css";

// Expanded responses with follow-ups
const responses = {
  // Crisis & Urgent Support
  suicidal:
    "I'm really sorry you're feeling this way. 💙 You're not alone. Please reach out to someone who can help. Call 📞 999 or Samaritans 1800-221-4444. Would you like to talk about what’s been on your mind?",
  suicide:
    "Please know that you are valued and loved. 💙 Reach out to a trusted person or call 📞 999 or Samaritans 1800-221-4444. Do you have someone you trust to talk to?",
  "self-harm":
    "You matter. 💙 If you're struggling, please reach out to someone who can help. Call 📞 999 or Samaritans 1800-221-4444. Would you like me to share self-care tips?",

  // Stress & Anxiety
  "work stress":
    "Work stress can be overwhelming. 🌱 Do you have a heavy workload, or is it more about workplace pressure? Maybe taking short breaks or time-blocking your tasks could help.",
  "exam stress":
    "Exams can be nerve-wracking! 📚 Have you tried breaking your study sessions into small chunks? I can share some study techniques if you’d like!",
  "social anxiety":
    "Social situations can feel overwhelming. 🌿 Do you feel anxious in large groups, or is it more about one-on-one interactions? Practicing small conversations in low-pressure settings can help!",
  "performance anxiety":
    "Feeling nervous before a big event is normal! 🎤 Would practicing in a safe space help? Visualization and deep breathing can work wonders!",
  "relationship stress":
    "Relationships can be complicated. 💙 Is it about communication, expectations, or something else? Talking things through often helps!",
  "financial stress":
    "Money worries can be tough. 💰 Are you struggling with budgeting, or is it something else? I can share some financial wellness tips if you'd like.",
  "health anxiety":
    "Health concerns can feel overwhelming. 🌿 Have you spoken to a professional, or are you looking for ways to ease your worries?",
  "general anxiety":
    "Anxiety can feel exhausting. 🌱 Have you tried grounding techniques like deep breathing or mindfulness? I can guide you through one if you'd like!",
  overwhelmed:
    "It sounds like a lot is on your plate. 💙 What’s one small thing you can do right now to feel a little better?",

  // Negative Feelings
  sad: "I’m here for you. 💙 Do you want to talk about what’s making you feel this way?",
  lonely:
    "You are not alone. 💙 It might help to reach out to a friend or engage in an activity you love. Would you like some ideas?",
  "no one to talk to":
    "I’m here to listen. 💙 Have you tried joining an online community or support group?",
  disappointed:
    "Disappointment is tough. 💙 Want to share what happened? Sometimes, venting helps.",
  hopeless:
    "Even when things feel dark, hope is never truly gone. 💙 What’s something that used to bring you joy?",
  empty:
    "Feeling empty can be tough. 🌱 Have you been taking care of yourself? Small acts of self-care might help. Would you like some suggestions?",
  worthless:
    "You matter. 💙 The world is a better place with you in it. Want to hear a positive affirmation?",
  lost: "It's okay to feel lost sometimes. 🌱 What’s something that usually brings you comfort?",
  exhausted:
    "Rest is important! 💤 Have you been sleeping well? Maybe a short break or a nap could help.",
  "burned out":
    "You might need a break. 🛌 What’s one thing you can do to take care of yourself today?",
  numb: "Feeling numb can be tough. 💙 Have you tried listening to music or journaling your thoughts?",

  // Positivity & Motivation
  happy: "That’s amazing! 😊 What made you smile today?",
  excited:
    "That’s great! 🎉 What’s making you feel this way? I’d love to hear!",
  motivated: "Keep up the great work! 💪 What goal are you working on?",
  grateful:
    "Gratitude is powerful. 💙 Want to share something you’re grateful for?",
  inspired: "That’s fantastic! 🌟 What’s inspiring you today?",
  loved: "You deserve love and kindness. 💙 Hold onto that feeling!",
  proud: "You should be proud of yourself! 🌟 Keep going, you’re doing great!",

  // General Support
  confused:
    "It’s okay to feel uncertain. 🌱 Taking things one step at a time can help. Need guidance?",
  bored:
    "How about trying something new? 🎨 Reading, music, or even a quick walk can help. Want a fun challenge?",
  "lost interest":
    "Losing interest in things happens sometimes. 🌿 Maybe trying something new or revisiting an old hobby could help?",
  default: "I'm here for you. 💙 How are you feeling today?",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    // Check for keywords in the user's input
    const lowerInput = input.toLowerCase();
    let botResponse = responses["default"];

    Object.keys(responses).forEach((keyword) => {
      if (lowerInput.includes(keyword)) {
        botResponse = responses[keyword];
      }
    });

    setTimeout(() => {
      setMessages([
        ...messages,
        userMessage,
        { sender: "ai", text: botResponse },
      ]);
    }, 1000); // Simulate delay

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "user-msg" : "ai-msg"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
