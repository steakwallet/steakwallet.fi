import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useSpring, animated, config } from "@react-spring/three";
import logo from "../images/logo.svg";
import flexaReg from "../fonts/GT-Flexa-Standard-Regular.woff2";
import flexaBold from "../fonts/GT-Flexa-Standard-Bold.woff2";
import multichain from "../images/multichain.jpg";
import easy from "../images/easy.jpg";
import keys from "../images/keys.jpg";
import SEO from "../components/seo";
import ogImg from "../images/ogimage.png";

const lg = "684px";
const xl = "1680";
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  @font-face {
    font-family: "flexa";
    src: url(${flexaReg});
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "flexa";
    src: url(${flexaBold});
    font-weight: bold;
    font-style: normal;
  }
  html,
  body,
  #___gatsby{
    height: 100%;
  }
  div[role="group"][tabindex] {
    height: 100%;
  }
  html,
  body{
    margin: 0;
    padding: 0;
    background: #000;
    font-family: "flexa", "Helvetica Neue", Helvetica, arial, sans;
    font-size: 16px;
    line-height: 16px;
  }
  canvas{
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
  }
`;

const SpaceSteak = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Main = styled.main`
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 2;
  position: relative;
  @media (min-width: ${lg}) {
    pointer-events: none;
  }
`;

const NavBar = styled.div`
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  z-index: 3;
  a {
    margin-left: 1rem;
    font-size: 0.75rem;
    color: #fff;
    text-decoration: none;
    pointer-events: auto;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
    @media (min-width: ${lg}) {
      font-size: 1rem;
    }
  }
`;
const LogoImg = styled.img`
  width: 112px;
  height: auto;
  @media (min-width: ${lg}) {
    width: 140px;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  margin-bottom: -20vh;
  h1 {
    max-width: 90vw;
    font-weight: normal;
    font-size: clamp(16px, 15vw, 56px);
    line-height: 1em;
    margin-bottom: 1rem;
    letter-spacing: -0.06em;
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
    @media (min-width: ${lg}) {
      font-size: clamp(16px, 8vw, 80px);
      maring-bottom: 2rem;
    }
    @media (min-width: ${xl}) {
      font-size: clamp(16px, 8vw, 120px);
      maring-bottom: 2rem;
    }
  }
  p {
    max-width: 540px;
    font-size: 1rem;
    line-height: 1.5rem;
    text-align: center;
    margin: 0 2rem 3rem 2rem;
    @media (min-width: ${lg}) {
      font-size: 1.25rem;
      line-height: 2rem;
    }
  }
`;

const CTA = styled.a`
  background-color: #fff;
  color: #000;
  padding: 1rem 1.5rem;
  border-radius: 2rem;
  display: inline-block;
  font-size: 1.25rem;
  line-height: 1rem;
  cursor: pointer;
  pointer-events: auto;
  text-decoration: none;
  &:hover {
    background-color: #dedede;
  }
`;

const FeatureContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 1280px;
  margin: 0 auto 4rem auto;
  @media (min-width: ${lg}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
  }
`;
const FeatureItem = styled.div`
  border-radius: 2rem;
  background: #1c1c1e;
  border: 1px solid #1c1c1e;
  color: #fff;
  overflow: hidden;
  text-align: center;
  margin-bottom: 1rem;
  div {
    padding: 2rem;
  }
  img {
    width: 100%;
    height: auto;
  }
  h3 {
    font-weight: bold;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    line-height: 2rem;
  }
  p {
    line-height: 1.5rem;
  }
`;

const Footer = styled.footer`
  color: #909090;
  padding: 3rem;
  text-align: center;
  display: block;
  margin: 0 auto;
  position: relative;
`;

function Steak(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/steak.glb");

  const myMesh = React.useRef();
  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a / 4;
    myMesh.current.rotation.y = a / 6;
    myMesh.current.rotation.z = -a / 6;
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onClick={() => setActive(!active)}
      onPress={() => setActive(!active)}
    >
      <group position={[-0.3, 0.39, 0.01]}>
        <group position={[0.3, -0.39, -0.01]}>
          <animated.mesh
            geometry={nodes["node-0"].geometry}
            material={materials.map_Ka}
            position={[0, 0.37, 0]}
            rotation={[0.18, 0.07, 0.98]}
            scale={scale}
            ref={myMesh}
          />
        </group>
      </group>
      <group position={[-6.95, 0.67, -2.94]} rotation={[1.59, -0.04, 1.99]} />
    </group>
  );
}

const IndexPage = () => {
  return (
    <>
      <GlobalStyle />
      <SEO
        title="Start earning interest on your crypto"
        description="Steakwallet is the easiest and safest way to steak your crypto assets across blockchains."
        image={"http://thesteakwallet.com" + ogImg}
      />
      <SpaceSteak>
        <Canvas gl={{ alpha: false }} shadows dpr={[1, 2]}>
          <color attach="background" args={["black"]} />
          <ambientLight intensity={1.5} />
          <Suspense fallback={null}>
            <Steak />
            <fog attach="fog" args={["black", 3, 5]} />
          </Suspense>
          <OrbitControls
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            enableZoom={false}
            enablePan={false}
          />
        </Canvas>
      </SpaceSteak>
      <Main>
        <NavBar>
          <LogoImg src={logo} alt="Steakwallet" />
          <nav>
            <a href="https://discord.gg/ZtdgjSEnRy">Discord</a>
            <a href="https://twitter.com/steakwallet">Twitter</a>
          </nav>
        </NavBar>
        <HeroContent>
          <h1>Steaking Made Simple</h1>
          <p>
            Steakwallet is the easiest and safest way to steak your crypto
            assets across blockchains. Start earning interest on your crypto in
            seconds.
          </p>
          <CTA href="https://form.typeform.com/to/Qemm4FMQ">
            Sign up for early access
          </CTA>
        </HeroContent>
        <FeatureContent>
          <FeatureItem>
            <img src={multichain} alt="Multi-chain" />
            <div>
              <h3>Multi-Chain Support</h3>
              <p>
                Steakwallet is multi-chain, so you don’t need a different wallet
                for each blockchain. We’re adding support for new tokens and
                chains fast!
              </p>
            </div>
          </FeatureItem>
          <FeatureItem>
            <img src={easy} alt="Easy steaking" />
            <div>
              <h3>The Easiest Steaking Flow</h3>
              <p>
                Steakwallet makes steaking as easy as it gets. Forget complex
                workflows such as delegation, rewards claiming, or minting –
                Steakwallet automates every step possible. We only work with the
                most trusted and reliable validators, so you can relax and just
                enjoy your meaty returns.
              </p>
            </div>
          </FeatureItem>
          <FeatureItem>
            <img src={keys} alt="Keys" />
            <div>
              <h3>Your Keys Your Crypto</h3>
              <p>
                Steakwallet is non-custodial and gives you full ownership over
                your own keys. This means that only you can access your wallet
                and you are in full control of your crypto.
              </p>
            </div>
          </FeatureItem>
        </FeatureContent>
        <Footer>© Steakwallet 2021</Footer>
      </Main>
    </>
  );
};

export default IndexPage;
