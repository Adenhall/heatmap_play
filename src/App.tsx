import { useState } from "react";
import html2canvas from "html2canvas";

import "./App.css";
import useHeatmap from "./hooks/useHeatmap";
import MemoryGame from "./components/MemoryGame";

function App() {
  const { heatmapInstance, heatmapRef } = useHeatmap();
  const [viewHeatmap, setViewHeatmap] = useState(false);

  const captureHeatmapOnGame = async () => {
    if (!heatmapRef.current) return;
    const captured = await html2canvas(heatmapRef.current, {
      useCORS: true,
      onclone: (node) =>
        node.querySelector(".heatmap-hide")?.classList.remove("heatmap-hide"), // Ensure to show the heatmap
    });
    const imgUrl = captured.toDataURL("image/png");

    download(imgUrl);
  };

  const download = (img?: string) => {
    if (!img) return;
    const a = document.createElement("a");
    a.href = img;
    a.download = "Image.png";
    a.click();
  };
  return (
    <div className="App">
      <div
        ref={heatmapRef}
        className={`heatmap ${viewHeatmap ? "" : "heatmap-hide"}`}
        onClick={(e) =>
          heatmapInstance?.addData({ x: e.clientX, y: e.clientY, value: 100 })}
      >
        <MemoryGame />
      </div>
      <div className="buttons-container">
        <button onClick={() => download(heatmapInstance?.getDataURL())}>
          Export Heatmap data
        </button>
        <button onClick={captureHeatmapOnGame}>
          Export Heatmap On Game
        </button>
        <button onClick={() => setViewHeatmap(!viewHeatmap)}>
          Toggle Heatmap
        </button>
      </div>
    </div>
  );
}

export default App;
