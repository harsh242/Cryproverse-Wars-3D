import React from "react";
import { Canvas } from "react-three-fiber";
import Box from "./box";

const Play = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} scale={2}/>
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
};

export default Play;
