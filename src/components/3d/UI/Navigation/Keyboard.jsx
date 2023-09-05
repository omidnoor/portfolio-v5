import { useStore } from "@/stores/store";
import { useEffect } from "react";

function Keyboard() {
  const {
    setForward,
    setBackward,
    setLeft,
    setRight,
    setYawLeft,
    setYawRight,
    setPitchUp,
    setPitchDown,
  } = useStore((state) => ({
    setForward: state.setForward,
    setBackward: state.setBackward,
    setLeft: state.setLeft,
    setRight: state.setRight,
    setYawLeft: state.setYawLeft,
    setYawRight: state.setYawRight,
    setPitchUp: state.setPitchUp,
    setPitchDown: state.setPitchDown,
  }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setPitchUp(true);
          break;
        case "ArrowDown":
          setPitchDown(true);
          break;
        case "ArrowLeft":
          setYawLeft(true);
          break;
        case "ArrowRight":
          setYawRight(true);
          break;
        case "w":
        case "W":
          setForward(true);
          break;
        case "a":
        case "A":
          setLeft(true);
          break;
        case "s":
        case "S":
          setBackward(true);
          break;
        case "d":
        case "D":
          setRight(true);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setPitchUp(false);
          break;
        case "ArrowDown":
          setPitchDown(false);
          break;
        case "ArrowLeft":
          setYawLeft(false);
          break;
        case "ArrowRight":
          setYawRight(false);
          break;
        case "w":
        case "W":
          setForward(false);
          break;
        case "a":
        case "A":
          setLeft(false);
          break;
        case "s":
        case "S":
          setBackward(false);
          break;
        case "d":
        case "D":
          setRight(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return null;
}

export default Keyboard;
