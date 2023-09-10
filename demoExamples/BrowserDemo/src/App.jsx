import { useState } from 'react';
import htmlToObject from 'html-to-object-converter';
import './App.css'; // You can place your CSS styles here

function App() {
  const [htmlInput, setHtmlInput] = useState('');
  const [result, setResult] = useState('');

  const generateObject = () => {
    if (htmlInput.trim() !== '') {
      const obj = htmlToObject(htmlInput);
      setResult(JSON.stringify(obj, null, 2));
    }
  };

  return (
    <div className="container">
      <h1>HTML to Object Converter</h1>
      <textarea
        id="htmlInput"
        placeholder="Enter HTML here"
        value={htmlInput}
        onChange={(e) => setHtmlInput(e.target.value)}
      ></textarea>
      <button id="convertButton" onClick={generateObject}>
        Generate Object
      </button>
      <div id="result" dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  );
}

export default App;
