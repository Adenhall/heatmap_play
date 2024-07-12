import "./App.css";
import useHeatmap from "./hooks/useHeatmap";

function App() {
  const { heatmapInstance, heatmapRef } = useHeatmap();

  const download = (img?: string) => {
    if (!img) return;
    const a = document.createElement("a");
    a.href = img;
    a.download = "Image.png";
    a.click();
  };
  return (
    <>
      <div ref={heatmapRef} className="heatmap">
        <div>
          Hover on here
        </div>
      </div>
      <button onClick={() => download(heatmapInstance?.getDataURL())}>
        Export Heatmap data
      </button>
    </>
  );
}

export default App;
