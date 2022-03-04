import React from "react";
import ReactDOM from "react-dom";
import { FrontPage, QuizGame, ShowQuestion } from "../quizGame";
import { MemoryRouter } from "react-router-dom";
import "app.css";

describe("Quiz game", () => {
  it("shows quizgame", () => {
    const element = document.createElement("div");
    ReactDOM.render(<QuizGame />, element);
    expect(element.innerHTML).toMatchSnapshot();
  });
});
