import { useEffect, useRef } from "react";
import h337 from "heatmap.js";

const useHeatmap = () => {
  const heatmapContainer = useRef<HTMLDivElement | null>(null);
  const heatmapInstance = useRef<h337.Heatmap<"value", "x", "y"> | null>(null);

  useEffect(() => {
    const container = heatmapContainer.current;
    if (!container || heatmapInstance.current) return;

    heatmapInstance.current = h337.create({
      container,
      radius: 25,
    });
  }, []);

  useEffect(() => {
    const container = heatmapContainer.current;
    if (!container || !heatmapInstance.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      heatmapInstance.current!.addData({
        x,
        y,
        value: 100,
      });
    };

    container.addEventListener("click", handleMouseMove);

    return () => {
      container.removeEventListener("click", handleMouseMove);
    };
  }, []);

  return { heatmapRef: heatmapContainer, heatmapInstance: heatmapInstance.current };
};

export default useHeatmap;
