import './App.css';
import { useCallback, useState, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let nums = '0123456789';
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (numbersAllowed) {
      str += nums;
    }

    if (symbolsAllowed) {
      str += symbols;
    }

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, symbolsAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, symbolsAllowed]);

  const CopyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  return (
    <>
      <div className="bg-grey-500 h-full w-full">
        <h1 className="text-4xl  font-extrabold mb-8"> Password Generator </h1>
        <div className="flex overflow-hidden mb-4 shadow-lg rounded-md">
          <input
            type="text"
            value={password}
            className="border-2 border-blue-500 w-full px-3 py-2"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={CopyToClipboard}
            className="outline-none bg-blue-500 text-white px-3 py-1  shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              name=""
              id=""
            />
            <label htmlFor="length"> length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              onChange={() => setNumbersAllowed((prev) => !prev)}
              name=""
              id=""
            />
            <label htmlFor="length"> Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={symbolsAllowed}
              onChange={() => setSymbolsAllowed((prev) => !prev)}
              name=""
              id=""
            />
            <label htmlFor="Symbols">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
