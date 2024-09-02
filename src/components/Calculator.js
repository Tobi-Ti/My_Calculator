import React, { useState } from "react";

function Calculator() {
  const [prevAnswer, setPrevAnswer] = useState("");
  const [answer, setAnswer] = useState("0");
  const [operand, setOperand] = useState("");

  const handleOperand = (e) => {
    const value = e.target.value;

    // Prevent multiple leading zeros
    if (operand === "0" && value === "0") return;

    // Append the operand
    setOperand((opd) => (opd === "0" ? value : opd + value));
  };

  const handleOperator = (e) => {
    const value = e.target.value;

    if (value === "ac") {
      setOperand("");
      if (answer > 0) setPrevAnswer(answer);
      setAnswer(0);
      return;
    }

    // Handle the plus/minus toggle
    if (value === "pm") {
      if (operand === "") return;
      setOperand((opd) =>
        opd.charAt(0) === "-" ? opd.slice(1) : "-" + opd
      );
      return;
    }

    if (value === "=") {
      try {
        // Check for division by zero
        if (operand.includes("/0")) {
          // Ensure that "/0" isn't followed by any other digits or decimals
          const divisionByZero = /\/0([^\d.]|$)/;
          if (divisionByZero.test(operand)) {
            setAnswer("Error");
            setOperand("");
            return;
          }
        }

        const result = eval(operand);

        if (isFinite(result)) {
          setAnswer(result);
          setOperand("");
          if (answer > 0) setPrevAnswer(answer);
        } else {
          setAnswer("Error");
        }
      } catch (error) {
        setAnswer("Error");
      }
    } else {
      // Continue building the operand
      if (["+", "-", "*", "/"].includes(operand.slice(-1)) && ["+", "-", "*", "/"].includes(value)) {
        setOperand((opd) => opd.slice(0, -1) + value);
      } else {
        setOperand((opd) => opd + value);
      }
    }
  };

  const handleDelete = () => {
    if (operand.length > 0) {
      setOperand((opd) => opd.slice(0, -1));
    }
  };

  return (
    <div className="calculator">
      <div className="c-wrapper">
        <div className="ctc c-type">
          <button className="active">Calculator</button>
        </div>
        <div className="ctc c-screen">
          <div className="c-history-answer">
            <i className="fa-solid fa-clock"></i>
            <span>{prevAnswer}</span>
          </div>
          <div className="c-answer">
            <span>{answer}</span>
          </div>
        </div>
        <div className="ctc c-compute">
          <button className="c-reverse" value="rv" onClick={handleDelete}>
            <i className="fa-solid fa-rotate-left"></i>
          </button>
          <span>{operand ? operand : "0"}</span>
        </div>
        <div className="c-grid">
          <button type="button" className="top-btn" value="ac" onClick={handleOperator}>
            ac
          </button>
          <button type="button" className="top-btn" value="pm" onClick={handleOperator}>
            &plusmn;
          </button>
          <button type="button" className="top-btn" value="%" onClick={handleOperator}>
            %
          </button>
          <button type="button" className="top-btn special" value="/" onClick={handleOperator}>
            /
          </button>

          <button className="normal" value="7" onClick={handleOperand}>
            7
          </button>
          <button className="normal" value="8" onClick={handleOperand}>
            8
          </button>
          <button className="normal" value="9" onClick={handleOperand}>
            9
          </button>

          <button className="special" value="*" onClick={handleOperator}>
            x
          </button>
          <button className="normal" value="4" onClick={handleOperand}>
            4
          </button>
          <button className="normal" value="5" onClick={handleOperand}>
            5
          </button>
          <button className="normal" value="6" onClick={handleOperand}>
            6
          </button>

          <button className="special" value="-" onClick={handleOperator}>
            -
          </button>
          <button className="normal" value="1" onClick={handleOperand}>
            1
          </button>
          <button className="normal" value="2" onClick={handleOperand}>
            2
          </button>
          <button className="normal" value="3" onClick={handleOperand}>
            3
          </button>
          <button className="special" value="+" onClick={handleOperator}>
            +
          </button>

          <button className="span-two normal" value="0" onClick={handleOperand}>
            0
          </button>
          <button className="normal" value="." onClick={handleOperand}>
            .
          </button>
          <button className="special" value="=" onClick={handleOperator}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
