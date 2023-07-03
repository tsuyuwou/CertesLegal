import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from "maath/random/dist/maath-random.esm";
import Globe from "./Globe/Globe.jsx";
import Form from './Form/Form.jsx';

const Stars = (props) => {
  
  const ref = useRef();
  const { camera } = useThree();
  const [sphere] = useState(() => inSphere(new Float32Array(6000), { radius: 1.2 }));

  useFrame((_state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    if (camera.position.z > 1) {
      camera.position.z -= delta * (camera.position.z - 1);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ContactUs = () => {

  const baseURL = import.meta.env.BASE_URL;
  let aspect = Math.max(window.innerWidth, 500) / Math.max(window.innerHeight - 89.5, 881.5);
  const [showCanvas, setShowCanvas] = useState(false);
  const [tabIndex, setTabIndex] = useState();

  useEffect(() => {
    const starsContainer = document.getElementById("starsContainer");
    const contactContainer = document.getElementById("contactContainer");
    starsContainer.style.height = `${starsContainer.clientWidth / aspect}px`;
    contactContainer.style.top = `${-starsContainer.clientHeight}px`;

    const handleResize = () => {
      if (location.pathname === `${baseURL}contact-us`) {
        aspect = Math.max(window.innerWidth, 500) / Math.max(window.innerHeight - 89.5, 881.5);
        starsContainer.style.height = `${starsContainer.clientWidth / aspect}px`;
        contactContainer.style.height = `${starsContainer.clientHeight}px`;
        contactContainer.style.top = `${-starsContainer.clientHeight}px`;
      }
    };
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const starsContainer = document.getElementById("starsContainer");
    if (location.pathname === `${baseURL}contact-us`) {
      starsContainer.style.height = `${starsContainer.clientWidth / aspect}px`;
      setTimeout(() => {
        setShowCanvas(true);
      }, 500);
      setTabIndex(0);
    }
    else {
      starsContainer.style.height = '0px';
      setShowCanvas(false);
      setTabIndex(-1);
    }
  }, [location.pathname]);

  return (
    <div id="starsContainer" style={{overflow: 'hidden', backgroundColor: 'black'}}>
      {location.pathname === `${baseURL}contact-us` && showCanvas ? (
        <Canvas camera={{ position: [0, 0, 3] }}>
          <Stars />
        </Canvas>
      ) : null}
      <div id="contactContainer" style={{display: 'flex', position: 'relative'}}>
        <Globe />
        <Form tabIndex={tabIndex}/>
      </div>
      <style jsx="true">{`
        @media (max-width: 1200px) {
          #contactContainer {
            flex-direction: column;
          }
        }
      `}
      </style>
    </div>
  );
};

export default ContactUs;
