import Head from "next/head";
import TextInput from "./components/TextInput";

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
        <TextInput/>
        <p className="text-gray-400 text-sm text-center mt-3">Made by <a href="https://github.com/AI-Content-Generator" target="_blank" className="underline">AICG</a></p>
      </div>
    </>
  );
}
