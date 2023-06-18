import Head from "next/head";
import { useState, useCallback, useEffect } from "react";
import TextInput from "./components/TextInput";
import ImageInput from "./components/ImageInput";
import Editor from "./components/Editor";
import Form from "./components/Form";


export default function Home() {
// <<<<<<< HEAD
  // const [result, setResult] = useState("// type a text prompt above and click 'Generate content'");
  // const [textInput, setTextInput] = useState("");
  // const [waiting, setWaiting] = useState(false);
  // const [sandboxRunning, setSandboxRunning] = useState(false);
  // const [logMsg, setlogMsg] = useState("");
  // const [selVal, setSelVal] = useState("");
// =======
  // const [result, setResult] = useState("// type a text prompt above and click 'Generate content'");
  // const [textInput, setTextInput] = useState("");
  // const [waiting, setWaiting] = useState(false);
  // const [logMsg, setlogMsg] = useState("");
  // const [selGoal, setSelGoal] = useState("");
  // const [selTone, setSelTone] = useState("");
// >>>>>>> main

  // const contentLengthArray = [
  //   {
  //     value: "30 Characters Headline",
  //     length: "30"
  //   },
  //   {
  //     value: "90 Characters Description",
  //     length: "90"
  //   }
  // ]

// <<<<<<< HEAD
  // useEffect(() => {
  //   let ranOnce = false;
// =======
//   const toneTypeArray = [
//     {
//       value: "friendly",
//       length: "friendly"
//     },
//     {
//       value: "excited",
//       length: "excited"
//     }
//   ]

//   useEffect(() => {
//     let ranOnce = false;
// >>>>>>> main

  //   const handler = event => {
  //     const data = JSON.parse(event.data)
  //     if (!ranOnce) {
  //       setlogMsg(data.logMsg);
  //       ranOnce = true;
  //     } else {
  //       setlogMsg(msg => msg + '\n' + data.logMsg);
  //     }
  //   }

  //   window.addEventListener("message", handler)

// <<<<<<< HEAD
  //   // clean up
  //   return () => window.removeEventListener("message", handler)
  // }, [result, sandboxRunning])
// =======
    // clean up
//     return () => window.removeEventListener("message", handler)
//   }, [result])
// >>>>>>> main

  // function textInputChange(event) {
  //   event.preventDefault();
  //   setTextInput(event.target.value);
  // }

// <<<<<<< HEAD
  // async function textInputSubmit(event) {
  //   event.preventDefault();
  //   setlogMsg("");
  //   setWaiting(true);
  //   setResult("// Please be patient, this may take a while...");
  //   setSelVal("");
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_API_URL || ''}/api/generate`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ prompt: textInput, promptType: selVal }),
  //     });

  //     const data = await response.json();
  //     if (response.status !== 200) {
  //       setWaiting(false);
  //       throw data.error || new Error(`Request failed with status ${response.status}`);
  //     }
  //     setResult(data.code);
  //     setSandboxRunning(true);
  //     setWaiting(false);
  //   } catch(error) {
  //     console.error(error);
  //     alert(error.message);
  //     setWaiting(false);
  //   }
  // }
// =======
//   async function textInputSubmit(event) {
//     event.preventDefault();
//     setlogMsg("");
//     setWaiting(true);
//     setResult("// Please be patient, this may take a while...");
//     setSelGoal("");
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_API_URL || ''}/api/generate`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: textInput, promptType: selGoal, promptTone: selTone }),
//       });

//       const data = await response.json();
//       if (response.status !== 200) {
//         setWaiting(false);
//         throw data.error || new Error(`Request failed with status ${response.status}`);
//       }
//       setResult(data.code);
//       setWaiting(false);
//     } catch(error) {
//       console.error(error);
//       alert(error.message);
//       setWaiting(false);
//     }
//   }
// >>>>>>> main

  // const editorChange = useCallback((value, viewUpdate) => {
  //   setResult(value);
  // }, []);
  
// <<<<<<< HEAD
  // function runClickPlay(event) {
  //   event.preventDefault();
  //   setSandboxRunning(true);
  // }

  // function runClickStop(event) {
  //   event.preventDefault();
  //   setSandboxRunning(false);
  //   setlogMsg("");
  // }

  // function textSelectChange(event) {
  //   setSelVal(event.target.value);
  //   event.preventDefault();
  //   const search = event.target.value;
  //   const selectedEg = egArray.find((obj) => obj.value === search);
  //   if(selectedEg) {
  //     setlogMsg('');
  //     setTextInput(selectedEg.prompt);
  //     setResult(selectedEg.code);
  //     setSandboxRunning(true);
  //   } else {
  //     setlogMsg('');
  //     setTextInput('');
  //     setResult('');
  //     setSandboxRunning(false);
  //   }
  // }
// =======
//   function runClickPlay(event) {
//     event.preventDefault();
//   }

//   function runClickStop(event) {
//     event.preventDefault();
//     setlogMsg("");
//   }

//   function goalSelectChange(event) {
//     setSelGoal(event.target.value);
//     event.preventDefault();
//     const search = event.target.value;
//     const selectedEg = contentLengthArray.find((obj) => obj.value === search);
//     if(selectedEg) {
//       setlogMsg('');
//       setTextInput(selectedEg.prompt);
//       setResult(selectedEg.code);
//     } else {
//       setlogMsg('');
//       setTextInput('');
//       setResult('');
//     }
//   }
// >>>>>>> main

  // function toneSelectChange(event) {
  //   setSelTone(event.target.value);
  //   event.preventDefault();
  // }

  return (
    <>
      <Head>
        <title>AICG</title>
        <meta name="description" content="Turn text into content using GPT" />
        <link rel="icon" href="/gpt-p5.svg" />
      </Head>
      <div className="w-full p-5 flex flex-col gap-5 max-w-2xl min-w-[320px] relative 2xl:max-w-7xl">
        <header className="flex gap-3 justify-between">
          <div className="flex gap-3">
            <img src="gpt-p5-emerald.png" alt="logo" className="h-11 w-11 p-2 bg-white rounded-full shadow shadow-emerald-600/30 overflow-visible"/>
          <div className="text-gray-700">
            <h1 className="font-semibold text-xl ">
              AICG
            </h1>
            <p>An AI powered content generator ✨</p>
          </div>
          </div>
        </header>
        <div className="flex flex-col gap-4 2xl:flex-row w-full">
          <div className="flex flex-col gap-4 2xl:w-1/2">
{/* <<<<<<< HEAD */}
            {/* <Form key="form-01" selectGoal={selGoal} goalSelectChange={goalSelectChange} egArray={contentLengthArray} selectTone={selTone} toneSelectChange={toneSelectChange} toneTypeArray={toneTypeArray}/> */}
            <TextInput/>
            {/* <Editor key="editor-01" result={result} onChange={editorChange} waiting={waiting}/> */}
            <br/>
            <ImageInput/>
{/* =======
            
            <TextInput>
            
>>>>>>> main */}
          </div>
        </div>
        <p className="text-gray-400 text-sm text-center mt-3">Made by <a href="https://chat.openai.com/" target="_blank" className="underline">AICG</a></p>
      </div>
    </>
  );
}
