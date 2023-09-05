import { useStore } from "@/stores/store";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CameraMovement = (ref) => {
  const {
    forward,
    backward,
    left,
    right,
    yawLeft,
    yawRight,
    pitchUp,
    pitchDown,
  } = useStore((state) => ({
    forward: state.forward,
    backward: state.backward,
    left: state.left,
    right: state.right,
    yawLeft: state.yawLeft,
    yawRight: state.yawRight,
    pitchUp: state.pitchUp,
    pitchDown: state.pitchDown,
  }));

  useFrame(() => {
    const speed = 1;
    const rotationSpeed = 0.02;

    if (forward) {
      ref.forward(speed, false);
    }
    if (backward) {
      ref.forward(-speed, false);
    }
    if (left) {
      ref.truck(-speed, 0, false);
    }
    if (right) {
      ref.truck(speed, 0, false);
    }
    if (yawLeft) {
      ref.rotate(rotationSpeed, 0, true);
    }
    if (yawRight) {
      ref.rotate(-rotationSpeed, 0, true);
    }
    if (pitchUp) {
      ref.rotate(0, -rotationSpeed, true);
    }
    if (pitchDown) {
      ref.rotate(0, rotationSpeed, true);
    }
  });

  return null;
};

export default CameraMovement;
