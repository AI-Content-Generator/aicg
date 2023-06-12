import { useState, useCallback, useEffect } from "react";
import Editor from "./Editor";

export default function ImageInput() {
  const [imageResult, setImageResult] = useState("// type a text prompt above and click 'Generate image'");
  const [imageInput, setImageInput] = useState("");
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

  function imageInputChange(event) {
    event.preventDefault();
    setImageInput(event.target.value);
  }

  async function imageInputSubmit(event) {
    console.log('i am in imageInputSubmit')
    event.preventDefault();
    setlogMsg("");
    setWaiting(true);
    setImageResult("// Please be patient, this may take a while...");
    setSelVal("");
    try {
      console.log(`before fetch, prompt ${imageInput}`)
      const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_API_URL || ''}/api/generateImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: imageInput, promptType: selVal }),
      });
      console.log(`my response ${response}`)
      const data = await response.json();
      console.log(`my data ${data}`)
      if (response.status !== 200) {
        setWaiting(false);
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(typeof(data.code))
    //   TODO: This is not the best way to extract output
      const outputRegex = /"output":\s*\["(.*?)"]/;
      const match = data.code.match(outputRegex);
      const output = match ? match[1] : null;
      setImageResult(output);
      setSandboxRunning(true);
      setWaiting(false);
    } catch(error) {
      console.error(error);
      alert(error.message);
      setWaiting(false);
    }
  }

  const editorChange = useCallback((value, viewUpdate) => {
    setImageResult(value);
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

  function imageSelectChange(event) {
    setSelVal(event.target.value);
    event.preventDefault();
    const search = event.target.value;
    const selectedEg = egArray.find((obj) => obj.value === search);
    if(selectedEg) {
      setlogMsg('');
      setImageInput(selectedEg.prompt);
      setImageResult(selectedEg.code);
      setSandboxRunning(true);
    } else {
      setlogMsg('');
      setImageInput('');
      setImageResult('');
      setSandboxRunning(false);
    }
  }

    return (
      <div className="rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
        <div className="flex justify-between xs:mb-2">
          <h3 className="font-semibold text-gray-500">Image Description prompt</h3>
          <select 
            name="examples" 
            id="eg-select" 
            value={selVal}
            className="bg-emerald-100 rounded text-sm px-1 text-gray-600"
            onChange={imageSelectChange}
            >
              <option value="">Choose a content type</option>
              {contentLengthArray?.map((eg, index) => {
                  return <option value={eg.value} key={index}>{eg.value}</option>
                }
              )}
          </select>
        </div>
        <form onSubmit={imageInputSubmit} className="w-full">
          <textarea key="textarea-01" className="block min-h-[50px] xs:min-h-[70px] border-[1.5px] border-emerald-500 p-2 rounded w-full mb-2 text-sm
          disabled:border-gray-300 disabled:text-gray-600 disabled:bg-gray-100"
            type="text"
            name="prompt"
            placeholder="Describe your image."
            value={imageInput}
            onChange={imageInputChange}
            disabled={waiting}
          />
          <Editor key="editor-01" result={imageResult} onChange={editorChange} waiting={waiting}/>
          { waiting ? 
          <button className="bg-gray-300 p-2 rounded w-full text-white text-sm px-3" type="submit" disabled>
            <img src="loading.png" alt="loading icon" className="animate-spin w-4 h-4 mr-2 inline" />
            Generating image...
          </button>
          : 
          <button className="bg-emerald-500 p-2 rounded w-full text-white text-sm px-3 cursor-pointer" type="submit">Generate image</button> }
          
        </form>
      </div>
    );
  }