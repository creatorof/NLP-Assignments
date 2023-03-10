import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const translate = (text) => {
    axios
      .post(
        'http://127.0.0.1:5000/translate',
        {
          source: text,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        const result = res.data;
        setOriginalText(result.source);
        setTranslatedText(result.translated_text);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onKeyUp = (text) => {
    setOriginalText(text);
    translate(text);
    // console.log(text);
  };

  return (
    <div className="App container">
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="nepali-text" className="form-label">
              Nepali
            </label>
            <textarea
              className="form-control"
              id="nepali-text"
              rows="10"
              onKeyUp={(e) => onKeyUp(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="col">
          {' '}
          <div className="mb-3">
            <label htmlFor="english-text" className="form-label">
              English
            </label>
            <textarea
              disabled="disabled"
              className="form-control"
              id="english-text"
              rows="10"
              value={translatedText}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
