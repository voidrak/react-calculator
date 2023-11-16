import React from "react";

const App = () => {
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="preview-output"></div>
        <div className="main-output"></div>
        <button className="two-span">AC</button>
        <button>DEL</button>
        <button>÷</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>*</button>
        <button>+</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button className="two-span">=</button>
      </div>
    </div>
  );
};

export default App;
