import React from "react";
import { Carousel } from "react-bootstrap";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

const Model = (props) =>{
  const { scene } = useGLTF(props.modelPath);
  return <primitive object={scene} {...props} />;
}

const Banner = ({ modelPath }) => {
  return (
    <div className="row align-items-center p-0">
      <div className="col-6" style={{ backgroundColor: "#898989", padding: "1rem", display: "flex", justifyContent: "center", alignItems: "center", height: "450px" }}>
        <p className="text" style={{ color: "white", alignItems: "center", fontSize: 25, fontWeight: "bold" }}>
          Elevate Your Shopping Experience
        </p>
      </div>  
      <div className="col-6" style={{ backgroundColor: "#898989", padding: "1rem", height: "450px" }}>
        <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
          <color attach="background" args={["#898989"]} />
          <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
            <Stage environment="sunset">
             <Model modelPath={modelPath} scale={0.03} />
            </Stage>
          </PresentationControls>
        </Canvas>
      </div>
    </div>
  );
}

const BannerCarousel = () =>{
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <Banner modelPath="/car.glb" />
        </Carousel.Item>
        <Carousel.Item>
          <Banner modelPath="/shirt.glb" />
        </Carousel.Item>
        <Carousel.Item>
          <Banner modelPath="/necklace.glb" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
