// import { useFBX, useGLTF } from "@react-three/drei";
import { useStore } from "@/stores/store";
import { worldScale } from "@/stores/variables";
// import { Suspense } from "react";
import Floor from "./Floor";
import Ceiling from "./Ceiling";
import Walls from "./Walls";
import Post from "./Post";
import { Environment, MeshReflectorMaterial } from "@react-three/drei";

// useGLTF.preload("./models/SceneModel.glb");

const SceneModel = () => {
  // const model = useGLTF("./models/SceneModel.glb");
  // const model = useFBX("./models/SceneModel.fbx");

  const setIsSceneClicked = useStore((state) => state.setIsSceneClicked);
  const isSceneClicked = useStore((state) => state.isSceneClicked);
  const setActiveMenuButton = useStore((state) => state.setActiveMenuButton);
  const setImageClicked = useStore((state) => state.setImageClicked);
  const setNoteClicked = useStore((state) => state.setNoteClicked);

  const handleClick = (e) => {
    e.stopPropagation();
    // setIsSceneClicked(!isSceneClicked);
    setActiveMenuButton("");
    setImageClicked(false);
    setNoteClicked(false);
  };
  // console.log(model.nodes.ceiling);
  return (
    <mesh scale={worldScale} onClick={handleClick}>
      <color attach="background" args={["#191920"]} />
      <fog attach="fog" args={["#191920", 0, 150]} />
      <group position={[0, -0.5, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[200, 200]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
      </group>
      <Environment preset="city" />
    </mesh>
  );
};
export default SceneModel;
