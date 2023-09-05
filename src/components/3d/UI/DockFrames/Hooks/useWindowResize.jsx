import { useEffect } from "react";
import { useCallbackRef } from "./useCallbackRef";

export const useWindowResize = (callback) => {
  const callbackRef = useCallbackRef(callback);

  useEffect(() => {
    const handleResize = () => {
      callbackRef(window.innerWidth, window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callbackRef]);
};
