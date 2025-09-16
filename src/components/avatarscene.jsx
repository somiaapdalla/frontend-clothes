import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// استيراد الملفات مباشرة
// import AvatarGLB from "..";
import ShirtGLB from "../assets/models/Shirt.glb";
import PantsGLB from "../assets/models/Pants.glb";

function Model({ glb, scale = 1 }) {
  const gltf = useGLTF(glb);
  return <primitive object={gltf.scene} scale={scale} />;
}

export default function AvatarScene() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 1.6, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<span>Loading 3D Models...</span>}>
          <Model glb={AvatarGLB} scale={1.5} />
          <Model glb={ShirtGLB} scale={1.5} />
          <Model glb={PantsGLB} scale={1.5} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
