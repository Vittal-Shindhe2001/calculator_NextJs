import React, { useState } from 'react'

export default function index() {
  const [expression, setExpression] = useState('');
  const [expressionHistory, setExpressionHistory] = useState([])
  console.table(expressionHistory)
  console.log(expression);
  const [result, setResult] = useState('');
  console.log(result);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        if (expression.length > 0) {
          const calculatedResult = eval(expression);
          setExpressionHistory(expressionHistory => [...expressionHistory, `${expression}=${calculatedResult}`]);
          setResult(calculatedResult);
          setExpression(calculatedResult.toString());
        }
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === '⌫') {
      setExpression(expression.slice(0, -1));
    } 
    else {
      setExpression((prevExpression) => prevExpression + value);
    }
  };

  const handleOperationClick = (operator) => {
    const lastCharIsOperator = /[+\-*/]$/.test(expression);

    if (lastCharIsOperator) {
      setExpression((prevExpression) =>
        prevExpression.slice(0, -1) + operator
      );
    } else {
      setExpression((prevExpression) => prevExpression + operator);
    }
  };

  const handleNumberClick = (number) => {
    handleButtonClick(number);
  };

  const clearHistory = () => {
    setExpressionHistory([])
    setResult("")
    setExpression("")
  }
  const printHistory = () => {
    if (typeof window !== 'undefined') {
      const content = expressionHistory.map(calculation => `<p>${calculation}</p>`).join('');
      const pageSizeStyles = `
        @page {
          size: 80mm  80mm;
          /* Adjust the width and height values based on your custom page size */
        }
      `;
      
      const printableBlob = new Blob([`<html><head><title>Bill Invoice</title><style>${pageSizeStyles}</style></head><body>${content}</body></html>`], { type: 'text/html' });
      const printableUrl = URL.createObjectURL(printableBlob);
  
      const printWindow = window.open(printableUrl, '_blank');
      
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
          printWindow.onafterprint = () => {
            printWindow.close();
            URL.revokeObjectURL(printableUrl); // Release the object URL
          };
        };
      }
    }
  };
  
  

  return (
    <div className="main">
      <div className="display">
        <button className="dark_mode_btn">
          <i className="fa fa-moon-o" aria-hidden="true"></i>
        </button>
        <h2 id="history">{!handleOperationClick && result > 0 ? result : expression}</h2>
        <div className="mt-2 ml-5">
          {/* <!-- <button class="btn btn-success" onclick="saveHistory()">Save History</button>--> */}
          <button className="btn btn-info " onClick={clearHistory}>Clear History</button><span></span><span></span>
          {/* <!-- <button class="btn btn-warning" onclick="calculateTotalBill()">Total Bill</button> --> */}
          <button className="btn btn-primary ml-4" onClick={printHistory}>Print History</button>
        </div>
      </div>
      <div className="buttons">
        <button id="clear" onClick={() => handleButtonClick('C')}>C</button>
        <button id="delete_single_num" onClick={() => handleButtonClick('⌫')}><i className="fa fa-scissors" aria-hidden="true"></i></button> <button id="Normal_btn" onClick={() => handleOperationClick('/')}>/</button>
        <button id="Normal_btn" onClick={() => handleOperationClick('*')}>*</button>
      </div>
      <div className="buttons">
        <button id="Normal_btn" onClick={() => handleNumberClick('7')}>7</button>
        <button id="Normal_btn" onClick={() => handleNumberClick('8')}>8</button>
        <button id="Normal_btn" onClick={() => handleNumberClick('9')}>9</button>
        <button id="Normal_btn" onClick={() => handleOperationClick('-')}>-</button>
      </div>
      <div className="buttons">
        <button id="Normal_btn" onClick={() => handleNumberClick('4')}>4</button>
        <button id="Normal_btn" onClick={() => handleNumberClick('5')}>5</button>
        <button id="Normal_btn" onClick={() => handleNumberClick('6')}>6</button>
        <button id="Normal_btn" onClick={() => handleOperationClick('+')}>+</button>
      </div>
      <div className="buttons">
        <button id="Normal_btn" onClick={() => handleNumberClick('1')}>1</button>
        <button id="Normal_btn" onClick={() => handleNumberClick('2')}>2</button>
        <button id="Normal_btn" onClick={() => handleNumberClick('3')}>3</button>
        <button id="Normal_btn" onClick={() => handleNumberClick('.')}>.</button>
      </div>
      <div className="buttons">
        <button id="Normal_btn" onClick={() => handleNumberClick('0')}>0</button>
        <button id="Normal_btn" onClick={() => handleNumberClick('00')}>00</button>
        <button id="equalTo" onClick={() => handleButtonClick('=')}>=</button>

      </div>
    </div>
  )
}



