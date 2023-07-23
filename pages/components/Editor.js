import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export default function Editor({result, onChange, waiting}) {
  const fileUrl = result 
  var isDisabled = !fileUrl || !fileUrl.endsWith(".png");

  // // [Deprecated] - Download png file from the returned url using Stable Diffusion API --------------------------
  // The below is to open up the image in a new tab
  // const handleDownload = () => {
  //   const newTab = window.open(fileUrl, "_blank");
  //   if (newTab) {
  //     newTab.focus();
  //   } else {fd
  //     console.error("Failed to open the image in a new tab.");
  //   }
  // };

  // // The below is to actually download to user's local file system
  // const handleDownload = async () => {
  //   try {
  //     const response = await fetch(fileUrl);
  //     const blob = await response.blob();

  //     // Create a temporary URL object
  //     const url = window.URL.createObjectURL(blob);

  //     // Create a temporary <a> element
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "image.png");
  //     link.click();

  //     // Cleanup
  //     URL.revokeObjectURL(url);

  //     setDownloaded(true);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // }

  return (
    <div className="max-h-[25vh] overflow-scroll rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
      <h3 className="font-semibold text-gray-500 mb-2">Content</h3>
      <CodeMirror key='code-mirror-01'
        value={result}
        height="100%"
        width="100%"
        style={{border: "1.5px solid #d1d5db", borderRadius: "5px", overflow: "clip"}}
        minHeight="100px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        readOnly={waiting}
      />

    {/* <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      {fileUrl && (
        <button
          onClick={handleDownload}
          className={`bg-emerald-500 p-2 rounded w-full text-white text-sm px-3 cursor-pointer ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ padding: "10px", fontSize: "14px" }}
          disabled={isDisabled}
        >
          Download File
        </button>
      )}
    </div> */}

    </div>
  );
}