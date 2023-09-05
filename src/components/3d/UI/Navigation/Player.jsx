import { useStore } from "@/stores/store";

function Player() {
  const { forward, backward, yaw } = useStore((state) => ({
    forward: state.forward,
    backward: state.backward,
    yaw: state.yaw,
  }));

  // Use the `forward`, `backward`, and `yaw` values to control the player's movement or camera rotation

  return;
}

export default Player;
