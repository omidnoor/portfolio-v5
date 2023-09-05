import {
  Environment,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSpring } from "react-spring";
import * as THREE from "three";
import { a } from "@react-spring/three";

const AnimatedMaterial = a(MeshDistortMaterial);

const AboutSphere = ({ setBg, wordColor, colors }) => {
  const sphere = useRef();
  const light = useRef();
  const [mode, setMode] = useState(false);
  const [down, setDown] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "default";
  }, [hovered]);

  useFrame((state, delta) => {
    light.current.position.x = state.mouse.x * 20;
    light.current.position.y = state.mouse.y * 20;
    if (sphere.current) {
      sphere.current.position.x = THREE.MathUtils.lerp(
        sphere.current.position.x,
        hovered ? state.mouse.x * 30 : 0,
        0.2,
      );
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime * 2) +
          (hovered ? state.mouse.y * 30 : 0),
        0.2,
      );
    }
  });

  const [{ wobble, coat, color, ambient, env }] = useSpring(
    {
      wobble: down ? 13 : hovered ? 13.2 : 13,
      coat: mode && !hovered ? 0.04 : 1,
      ambient: mode && !hovered ? 1.5 : 0.5,
      env: mode && !hovered ? 0.4 : 1,
      color: hovered ? "#F8C069" : mode ? "#F8C069" : "#2dbbf0",
      config: (n) =>
        n === "wobble" && hovered && { mass: 3, tension: 1000, friction: 5 },
    },
    [mode, hovered, down],
  );

  return (
    <>
      <a.ambientLight intensity={ambient} />
      <a.pointLight
        intensity={env}
        ref={light}
        position={[0, 0, 30]}
        color="#F8C069"
      />
      <a.mesh
        ref={sphere}
        scale={wobble}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onPointerDown={() => setDown(true)}
        onPointerUp={() => {
          setDown(false);
          setMode(!mode);
          setBg({
            background: !mode ? "#1c0200" : colors.background,
            fill: !mode ? "#340200" : colors.background,
            wordColor: {
              tech: !mode ? "#dcfcff" : colors.wordColors.tech,
              education: !mode ? "#ced" : colors.wordColors.education,
              general: !mode ? "#52affc" : colors.wordColors.general,
            },
          });
        }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <AnimatedMaterial
          color={color}
          envMapIntensity={env}
          clearCoat={coat}
          clearcoatRoughness={1}
          roughness={0.1}
          metalness={0.9}
          distort={hovered ? 0.5 : 0.4}
        />
      </a.mesh>
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </>
  );
};
export default AboutSphere;
