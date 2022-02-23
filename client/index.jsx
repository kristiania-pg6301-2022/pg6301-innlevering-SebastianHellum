import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function Frontpage() {
  return (
    <div>
      <h1>Quiz time</h1>
      <div>
        <div>
          <Link to={"/quiz"}>Start quiz</Link>
        </div>
      </div>
    </div>
  );
}

function Quiz() {
  return (
    <div>
      <h1>It's quiz time</h1>
    </div>
  );
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
