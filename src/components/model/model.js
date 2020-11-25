import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.7}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function Yellow() {
  const group = useRef();
  const {nodes} = useLoader(GLTFLoader, "yellow.glb");

  console.log(nodes);
  useFrame(() => {
    group.current.rotation.y += 0.004;
  });
  return (
    <group ref={group}>
      <mesh visible geometry={nodes["Idle"]}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

export default function App() {
  return (
    <>
      <Canvas style={{ background: "#171717" }}>
        <directionalLight intensity={0.5} />
        <Suspense fallback={<Loading />}>
          <Yellow />
        </Suspense>
      </Canvas>
      
    </>
  );
}
