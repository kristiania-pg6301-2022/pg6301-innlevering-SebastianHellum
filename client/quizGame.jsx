import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./app.css";
import { fetchJSON, postJSON } from "./http";
import { useLoader } from "./useLoader";

export function FrontPage() {
  return (
    <div className="main">
      <h1>Quiz app</h1>
      <div>
        <Link to={"/question"}>
          <button className="answerButton">Take a new quiz</button>
        </Link>
      </div>
      <div>
        <Link to={"/score"}>
          <button className="answerButton">Show your score</button>
        </Link>
      </div>
    </div>
  );
}

export function ShowQuestion() {
  const { loading, error, data, reload } = useLoader(
    async () => await fetchJSON("/api/question")
  );
  const question = data;
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.toString()} </div>;
  }

  async function handleAnswer(answer) {
    const { id } = question;
    await postJSON("api/question", { id, answer });
    await reload();
  }

  return (
    <div className="main">
      <h1>{question.question}</h1>
      {Object.keys(question.answers)
        .filter((a) => question.answers[a])
        .map((a) => (
          <div key={a}>
            <button className="answerButton" onClick={() => handleAnswer(a)}>
              {question.answers[a]}
            </button>
          </div>
        ))}
      <Link to={"/score"}>
        <button className="showButton">Show your score</button>
      </Link>
    </div>
  );
}

function ShowAnswer() {
  return (
    <div className="main">
      <Routes>
        <Route path={"correct"} element={<h1>Correct!</h1>} />
        <Route path={"wrong"} element={<h1>Wrong!</h1>} />
      </Routes>
      <div>
        <Link className="links" to={"/score"}>
          Show your score
        </Link>
      </div>
      <div>
        <Link to={"/question"}>New question</Link>
      </div>
    </div>
  );
}

export function ShowScore() {
  const { loading, error, data } = useLoader(
    async () => await fetchJSON("/api/score")
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.toString()} </div>;
  }
  const { answered, correct } = data;

  return (
    <div className="main">
      <h1>
        You have answered {correct} out of {answered} answers correctly
      </h1>
      <div>
        <Link to={"/question"}>New question</Link>
      </div>
      <Link to={"/"}>Back to frontpage</Link>
    </div>
  );
}

export function QuizGame() {
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={
            <FrontPage
              questionsAnswered={questionsAnswered}
              correctAnswers={correctAnswers}
            />
          }
        />
        <Route
          path={"/question"}
          element={
            <ShowQuestion
              setQuestionsAnswered={setQuestionsAnswered}
              setCorrectAnswers={setCorrectAnswers}
            />
          }
        />
        <Route path={"/answer/*"} element={<ShowAnswer />} />
        <Route path={"/score"} element={<ShowScore />} />
      </Routes>
    </BrowserRouter>
  );
}
