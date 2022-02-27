import express from "express";
import * as path from "path";
import { isCorrectAnswer, randomQuestion, Questions } from "./quiz.js";

const app = express();

//GET - Returns random question with: id, category, question, answers
app.get("/api/question", (req, res) => {
  const { id, category, question, answers } = randomQuestion();
  res.json({ id, category, question, answers });
});

//POST - Takes in:  id, answer, Returns: "true" || "false"
app.post("/api/question", (req, res) => {
  const { id, answer } = req.body;
  const question = Questions.find((q) => q.id === id);
  if (!question) {
    return res.sendStatus(404);
  }
  if (isCorrectAnswer({ question, answer })) {
    return res.json({ result: "true" });
  } else {
    return res.json({ result: "false" });
  }
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on http://localhost:${server.address().port}`);
});
