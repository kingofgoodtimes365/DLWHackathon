from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key
openai.api_key = "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"  # Replace with your API key

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")

    # Generate AI response
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a friendly chatbot providing mental health support."},
            {"role": "user", "content": user_message},
        ]
    )

    bot_reply = response["choices"][0]["message"]["content"]
    return jsonify({"response": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)
