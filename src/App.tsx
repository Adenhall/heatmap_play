import { useState } from "react";
import "./App.css";
import useHeatmap from "./hooks/useHeatmap";

function App() {
  const { heatmapInstance, heatmapRef } = useHeatmap();
  const [viewHeatmap, setViewHeatmap] = useState(false);

  const download = (img?: string) => {
    if (!img) return;
    const a = document.createElement("a");
    a.href = img;
    a.download = "Image.png";
    a.click();
  };
  return (
    <>
      <div
        ref={heatmapRef}
        className={`heatmap ${viewHeatmap ? "" : "heatmap-hide"}`}
      >
        <div>
          Hover on here
        </div>
      </div>
      <button onClick={() => download(heatmapInstance?.getDataURL())}>
        Export Heatmap data
      </button>
      <button onClick={() => setViewHeatmap(!viewHeatmap)}>
        Toggle Heatmap
      </button>
    </>
  );
}

export default App;
