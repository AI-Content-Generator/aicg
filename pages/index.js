import Head from "next/head";
import Link from "next/link";
import TextInput from "./components/TextInput";
import ImageInput from "./components/ImageInput";


export default function Home() {
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
        <div className="index-main-container">
          <div className="button-container">
              <a href="./components/TextInput.html" className="button-green">Go to Text-To-Text Input</a>
          </div>
          <div className="button-container">
              <a href="./components/ImageInput.html" className="button-green">Go to Text-To-Image Input</a>
          </div>
        </div>
        <p className="text-gray-400 text-sm text-center mt-3">Made by <a href="https://chat.openai.com/" target="_blank" className="underline">AICG</a></p>
      </div>
    </>
  );
}
