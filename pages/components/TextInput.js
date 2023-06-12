import { useState, useCallback, useEffect } from "react";
import Editor from "./Editor";

export default function TextInput() {
  const [result, setResult] = useState("// type a text prompt above and click 'Generate content'");
  const [textInput, setTextInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [sandboxRunning, setSandboxRunning] = useState(false);
  const [logMsg, setlogMsg] = useState("");
  const [selVal, setSelVal] = useState("");

  const contentLengthArray = [
    {
      value: "30 Characters Headline",
      length: "30"
    },
    {
      value: "90 Characters Description",
      length: "90"
    }
  ]

  // useEffect(() => {
  //   let ranOnce = false;

  //   const handler = event => {
  //     console.log(event)
  //     const data = JSON.parse(event.data)
  //     if (!ranOnce) {
  //       setlogMsg(data.logMsg);
  //       ranOnce = true;
  //     } else {
  //       setlogMsg(msg => msg + '\n' + data.logMsg);
  //     }
  //   }

  //   window.addEventListener("message", handler)

  //   // clean up
  //   return () => window.removeEventListener("message", handler)
  // }, [result, sandboxRunning])

  function textInputChange(event) {
    event.preventDefault();
    setTextInput(event.target.value);
  }

  async function textInputSubmit(event) {
    event.preventDefault();
    setlogMsg("");
    setWaiting(true);
    setResult("// Please be patient, this may take a while...");
    setSelVal("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_API_URL || ''}/api/generateText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: textInput, promptType: selVal }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        setWaiting(false);
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setResult(data.code);
      setSandboxRunning(true);
      setWaiting(false);
    } catch(error) {
      console.error(error);
      alert(error.message);
      setWaiting(false);
    }
  }

  const editorChange = useCallback((value, viewUpdate) => {
    setResult(value);
  }, []);
  
  function runClickPlay(event) {
    event.preventDefault();
    setSandboxRunning(true);
  }

  function runClickStop(event) {
    event.preventDefault();
    setSandboxRunning(false);
    setlogMsg("");
  }

  function textSelectChange(event) {
    setSelVal(event.target.value);
    event.preventDefault();
    const search = event.target.value;
    const selectedEg = egArray.find((obj) => obj.value === search);
    if(selectedEg) {
      setlogMsg('');
      setTextInput(selectedEg.prompt);
      setResult(selectedEg.code);
      setSandboxRunning(true);
    } else {
      setlogMsg('');
      setTextInput('');
      setResult('');
      setSandboxRunning(false);
    }
  }

    return (
      <div className="rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
        <div className="flex justify-between xs:mb-2">
          <h3 className="font-semibold text-gray-500">Text prompt</h3>
          <select 
            name="examples" 
            id="eg-select" 
            value={selVal}
            className="bg-emerald-100 rounded text-sm px-1 text-gray-600"
            onChange={textSelectChange}
            >
              <option value="">Choose a content type</option>
              {contentLengthArray?.map((eg, index) => {
                  return <option value={eg.value} key={index}>{eg.value}</option>
                }
              )}
          </select>
        </div>
        <form onSubmit={textInputSubmit} className="w-full">
          <textarea key="textarea-01" className="block min-h-[50px] xs:min-h-[70px] border-[1.5px] border-emerald-500 p-2 rounded w-full mb-2 text-sm
          disabled:border-gray-300 disabled:text-gray-600 disabled:bg-gray-100"
            type="text"
            name="prompt"
            placeholder="Enter a text prompt for content generation. Click the dropdown for type of content."
            value={textInput}
            onChange={textInputChange}
            disabled={waiting}
          />
          <Editor key="editor-01" result={result} onChange={editorChange} waiting={waiting}/>
          { waiting ? 
          <button className="bg-gray-300 p-2 rounded w-full text-white text-sm px-3" type="submit" disabled>
            <img src="loading.png" alt="loading icon" className="animate-spin w-4 h-4 mr-2 inline" />
            Generating content...
          </button>
          : 
          <button className="bg-emerald-500 p-2 rounded w-full text-white text-sm px-3 cursor-pointer" type="submit">Generate content</button> }
          
        </form>
      </div>
    );
  }