import Layout from "@/components/3d/Layout";
import { Suspense } from "react";
import CustomLoader from "@/components/utilComponents/Loader/CustomLoader";
import SceneModel from "@/components/3d/Models/SceneModel";

import Navigation from "@/components/3d/UI/Navigation/Navigation";
import ImageFrames from "@/components/3d/ImageFrames";
import Menu from "@/components/utilComponents/UI/Menu/Menu";
import Instruction from "@/components/utilComponents/UI/Instruction/Instruction";
import { useState } from "react";
import { useEffect } from "react";
import Nominne from "@/components/utilComponents/UI/Nominee/Nominne";
import Keyboard from "@/components/3d/UI/Navigation/Keyboard";

const HomePage = () => {
  const [initPage, setInitPage] = useState(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setInitPage(false);
    }, 10000);
    return () => clearTimeout(time);
  }, []);
  return (
    <>
      <Suspense fallback={null}>
        <Layout>
          <Navigation />
          <SceneModel />
          <ImageFrames />
        </Layout>
        {initPage && <Instruction />}
        <Menu />
        <Nominne />
      </Suspense>
      <Keyboard />
      <CustomLoader />
    </>
  );
};
export default HomePage;
