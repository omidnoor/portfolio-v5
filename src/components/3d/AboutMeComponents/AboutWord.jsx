import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const fontProps = {
  font: "/Inter-Bold.woff",
  fontSize: 1.2,
  letterSpacing: -0.05,
  lineHeight: 1,
  "material-toneMapped": true,
};

const AboutWord = ({ children, wordType, wordColor, ...props }) => {
  // const color = new THREE.Color();
  const [color] = useState(new THREE.Color());
  const [targetScale, setTargetScale] = useState(
    new THREE.Vector3(1.2, 1.2, 1.2),
  );
  //   const material = new THREE.MeshMatcapMaterial({ matcapTexture });
  const textRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = (e) => {
    e.stopPropagation();
    setHovered(true);
  };

  const handleMouseOut = (e) => {
    setHovered(false);
  };

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
      setTargetScale(
        new THREE.Vector3(
          1.1 * fontProps.fontSize,
          1.1 * fontProps.fontSize,
          1.1 * fontProps.fontSize,
        ),
      );
    }
    return () => {
      document.body.style.cursor = "auto";
      setTargetScale(
        new THREE.Vector3(
          fontProps.fontSize,
          fontProps.fontSize,
          fontProps.fontSize,
        ),
      );
    };
  }, [hovered]);

  useFrame((state, delta) => {
    textRef.current.quaternion.copy(state.camera.quaternion);
    if (
      !hovered &&
      (wordType === "tech" ||
        wordType === "general" ||
        wordType === "education")
    ) {
      textRef.current.material.color.lerp(
        color.set(wordColor.get()[wordType]),
        0.1,
      );
    } else {
      textRef.current.material.color.lerp(color.set("#ffc400"), 0.1);
    }
    textRef.current.scale.lerp(targetScale, 0.1);
  });
  // console.log(textRef.current);
  return (
    <Text
      ref={textRef}
      {...fontProps}
      onPointerOver={handleMouseOver}
      onPointerOut={handleMouseOut}
      {...props}
    >
      {children}
    </Text>
  );
};
export default AboutWord;
