import { useEffect, useRef, useState } from "react";
import h337 from "heatmap.js";

const useHeatmap = () => {
  const heatmapContainer = useRef<HTMLDivElement | null>(null);
  const [heatmapInstance, setHeatmapInstance] = useState<h337.Heatmap<"value", "x", "y"> | null>(null);

  useEffect(() => {
    const container = heatmapContainer.current;
    if (!container || heatmapInstance) return;

    setHeatmapInstance(h337.create({
      container,
      radius: 25,
    }));
  }, [heatmapInstance]);

  return { heatmapRef: heatmapContainer, heatmapInstance };
};

export default useHeatmap;
