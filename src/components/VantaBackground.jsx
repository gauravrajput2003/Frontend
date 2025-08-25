import React, { useEffect, useRef, useState } from "react";
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";

const VantaBackground = ({ children }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    let effect = vantaEffect;
    if (!effect) {
      effect = WAVES({
        el: vantaRef.current,
        THREE,
        color: 0x1e3c72,
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 1,
        zoom: 1.2,
        backgroundColor: 0x10172a,
      });
      setVantaEffect(effect);
    }
    // Handle WebGL context loss and auto-recover
    const canvas = vantaRef.current?.querySelector('canvas');
    let contextLostHandler;
    if (canvas) {
      contextLostHandler = () => {
        if (effect) effect.destroy();
        setTimeout(() => {
          setVantaEffect(WAVES({
            el: vantaRef.current,
            THREE,
            color: 0x1e3c72,
            shininess: 50,
            waveHeight: 20,
            waveSpeed: 1,
            zoom: 1.2,
            backgroundColor: 0x10172a,
          }));
        }, 100);
      };
      canvas.addEventListener('webglcontextlost', contextLostHandler, false);
    }
    return () => {
      if (effect) effect.destroy();
      if (canvas && contextLostHandler) {
        canvas.removeEventListener('webglcontextlost', contextLostHandler);
      }
    };
  }, [vantaEffect]);

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%" }}>
      <div
        ref={vantaRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default VantaBackground;
