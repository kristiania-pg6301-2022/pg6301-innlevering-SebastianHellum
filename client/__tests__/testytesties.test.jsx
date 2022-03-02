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
                <FrontPage correctAnswers={3} questionsAnswered={10}/>
            </MemoryRouter>,
            element
        );
        expect(element.querySelector("[data-testid=status]").textContent).toEqual(
            "You have answered 3 of 10 correctly"
        );
        expect(element.innerHTML).toMatchSnapshot();
    });
});