import Head from "next/head";
import TextInput from "./components/TextInput";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pitaya</title>
        <meta name="description" content="Turn text into content using GPT" />
        <link rel="icon" href="/gpt-p5-emerald.svg" />
      </Head>
      <div className="w-full p-5 flex flex-col gap-5 max-w-2xl min-w-[320px] relative 2xl:max-w-7xl">
        <header className="flex gap-3 justify-between">
          <div className="flex gap-3">
            <img src="gpt-p5-emerald.png" alt="logo" className="h-12 w-12 p-1 bg-white rounded-full shadow shadow-red-600/30 overflow-visible"/>
            <div className="text-gray-700">
              <h1 className="font-semibold text-xl ">
                Pitaya
              </h1>
              <p>An AI powered content generator ✨</p>
            </div>
          </div>
        </header>
        <TextInput/>
        <p className="text-gray-400 text-sm text-center mt-3">Made by Pitaya</p>
      </div>
    </>
  );
}
