import express from "express";

const app = express();

app.get("/api/questions", (req, res) => {
  res.json({
    questionNumber: 1,
    questionText: "How do you build this thing",
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${server.address().port}`);
});
