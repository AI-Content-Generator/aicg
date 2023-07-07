import { useState, useCallback, useEffect } from "react";
import Editor from "./Editor";
import Form from "./Form";

export default function ImageInput() {
  const [imageResult, setImageResult] = useState("// type a text prompt above and click 'Generate image'");
  const [imageInput, setImageInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [logMsg, setlogMsg] = useState("");
  const [selGoal, setSelGoal] = useState("");
  const [selTone, setSelTone] = useState("");
  const [keyword, setKeyword] = useState("");
  const [mask, setMask] = useState("");


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

  const toneTypeArray = [
    {
      value: "friendly",
      length: "friendly"
    },
    {
      value: "excited",
      length: "excited"
    }
  ]

  function imageInputChange(event) {
    event.preventDefault();
    setImageInput(event.target.value);
  }

  async function imageInputSubmit(event) {
    event.preventDefault();
    setlogMsg("");
    setWaiting(true);
    setImageResult("// Please be patient, this may take a while...");
    setSelGoal("");
    let apiEndpoint
    if (mask.length > 0) {
      apiEndpoint = "generateInpaint"
    } else {
      apiEndpoint = "generateImage"
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_API_URL || ''}/api/${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: imageInput, promptType: selGoal, promptTone: selTone, keyword: keyword, mask: mask }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        setWaiting(false);
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
    //   TODO: This is not the best way to extract output
      const outputRegex = /"output":\s*\["(.*?)"]/;
      const match = data.code.match(outputRegex);
      var output = match ? match[1] : "";
      if (output.length == 0) {
        // TODO: temporary redirect to a hardcode url for testing purposes
        output = "https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/980343f9-512d-40ea-8f1c-377b04eebec2-0.png"
      }
      setImageResult(output);
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

  function keywordInputChange(event) {
    setKeyword(event.target.value);
    event.preventDefault();
  }

  function maskInputChange(event) {
    setMask(event.target.value);
    event.preventDefault();
  }

  function runClickPlay(event) {
    event.preventDefault();
  }

  function runClickStop(event) {
    event.preventDefault();
    setlogMsg("");
  }

  function goalSelectChange(event) {
    setSelGoal(event.target.value);
    event.preventDefault();
    const search = event.target.value;
    const selectedEg = contentLengthArray.find((obj) => obj.value === search);
    if(selectedEg) {
      setlogMsg('');
      setImageInput(selectedEg.prompt);
      setImageResult(selectedEg.code);
    } else {
      setlogMsg('');
      setImageInput('');
      setImageResult('');
    }
  }

  function toneSelectChange(event) {
    setSelTone(event.target.value);
    event.preventDefault();
  }

    return (
      <div className="rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
        <div className="flex justify-between xs:mb-2">
          <h3 className="font-semibold text-gray-500">Image Description prompt</h3>
        </div>

        <Form key="form-01" selectGoal={selGoal} goalSelectChange={goalSelectChange} egArray={contentLengthArray} selectTone={selTone} 
        toneSelectChange={toneSelectChange} toneTypeArray={toneTypeArray} 
        keywordInput={keyword} keywordInputChange={keywordInputChange}
        maskInput={mask} maskInputChange={maskInputChange}/>

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
          { waiting ? 
          <button className="bg-gray-300 p-2 rounded w-full text-white text-sm px-3" type="submit" disabled>
            <img src="loading.png" alt="loading icon" className="animate-spin w-4 h-4 mr-2 inline" />
            Generating image...
          </button>
          : 
          <button className="bg-emerald-500 p-2 rounded w-full text-white text-sm px-3 cursor-pointer" type="submit">Generate image</button> }
        </form>

        <Editor key="editor-01" result={imageResult} onChange={editorChange} waiting={waiting}/>
      </div>
    );
  }