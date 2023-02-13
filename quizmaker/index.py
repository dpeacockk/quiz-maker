from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/create", methods=["GET", "POST"])
def create():
    if request.method == "POST":
        question_text = request.form.get("question_text")
        question_type = request.form.get("question_type")
        if question_type == "multiple_choice":
            choices = request.form.getlist("choice")
        else:
            choices = []
        return render_template("survey.html", question_text=question_text, question_type=question_type, choices=choices)
    return render_template("create.html")

@app.route("/survey", methods=["POST"])
def survey():
    responses = []
    for question in request.form:
        if question != "question_type":
            responses.append((question, request.form[question]))
    return render_template("results.html", responses=responses)

if __name__ == "__main__":
    app.run(debug=True)
