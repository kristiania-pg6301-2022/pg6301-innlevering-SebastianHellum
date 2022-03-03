import React from "react";
import ReactDOM from "react-dom";
import { FrontPage, QuizGame, ShowQuestion } from "../quizGame";
import { MemoryRouter } from "react-router-dom";
import "app.css";

describe("Quiz game", () => {
  it("Shows answer status", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <FrontPage correctAnswers={3} questionsAnswered={10} />
      </MemoryRouter>,
      element
    );
    expect(element.querySelector("[data-testid=status]").textContent).toEqual(
      "You have answered 3 of 10 correctly"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("shows quizgame", () => {
    const element = document.createElement("div");
    ReactDOM.render(<QuizGame />, element);
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("shows question", () => {
    const question = {
      question: "Is this fun?",
      answers: {
        answer_a: "Yes",
        answer_b: "No",
        answer_c: "Maybe",
      },
    };
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <ShowQuestion />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
  });
});
