import express from "express";
import * as path from "path";
import { isCorrectAnswer, randomQuestion, Questions } from "./quiz.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/api/question", (req, res) => {
  const { id, category, question, answers } = randomQuestion();
  res.json({ id, question, answers, category });
});

// callback: (req, res) => {}
app.post("/api/question", (req, res) => {
  const { id, answer } = req.body;
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : {
        answered: 0,
        correct: 0,
      };
  const question = Questions.find((q) => q.id === id);

  if (!question) {
    return res.sendStatus(404);
  }

  score.answered += 1;
  if (isCorrectAnswer(question, answer)) {
    score.correct += 1;
    res.cookie("score", JSON.stringify(score), { signed: true });
    return res.json({ result: "correct" });
  } else {
    res.cookie("score", JSON.stringify(score), { signed: true });
    return res.json({ result: "incorrect" });
  }
});

app.get("/api/score", (req, res) => {
  const score = req.signedCookies.score
    ? JSON.parse(req.signedCookies.score)
    : {
        answered: 0,
        correct: 0,
      };
  res.json(score);
});

//middleware for dist file
app.use(express.static(path.resolve("../client/dist")));

//path
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

//assigning port
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server started on port http://localhost:${server.address().port}`
  );
});
export default app;

export const handler = function () {
  server.close();
};
