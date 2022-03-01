import * as React from "react";
import { render } from "react-dom";
import { Questions } from "../quiz";

describe("movie pages", () => {
  it("lets the user add a new movie", () => {
    const question = Questions.find((q) => q.id === 995);
    const answersNames = Object.keys(question.answers).filter(
      (a) => question.answers[a]
    );
    expect(answersNames).toEqual([
      "answer_a",
      "answer_b",
      "answer_c",
      "answer_d",
    ]);
  });
});
