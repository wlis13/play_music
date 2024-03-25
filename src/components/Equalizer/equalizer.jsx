import { Equalizer } from 'equalizer.js';
import { useEffect, useRef } from "react";
import "./equalizer.css";

function EqualizerBar() {
  const equalizerRef = useRef(null);

  useEffect(() => {
    const equalizer = new Equalizer({
      target: equalizerRef.current,
      bands: 10,
      responsive: true,
    });

    return () => {
      equalizer.destroy();
    };
  }, []);

  return <div ref={equalizerRef}></div>;
}
export default EqualizerBar;
