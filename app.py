from flask import Flask, render_template, request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

# Initialize Flask app
app = Flask(__name__)

# Create a chatbot
english_bot = ChatBot("ChatterBot",
                      storage_adapter="chatterbot.storage.SQLStorageAdapter",
                      database_uri="sqlite:///database.sqlite3"
                      )

# Training the chatbot with English corpus data
trainer = ChatterBotCorpusTrainer(english_bot)
trainer.train("chatterbot.corpus.english")

# Route to render HTML template
@app.route("/")
def home():
    return render_template("index.html")

# Route to handle chatbot logic
@app.route("/get")
def get_bot_response():
    user_input = request.args.get("msg")
    bot_response = str(english_bot.get_response(user_input))
    return bot_response

if __name__ == "__main__":
    app.run(debug=True)
