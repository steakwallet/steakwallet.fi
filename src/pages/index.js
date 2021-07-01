import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useSpring, animated, config } from "@react-spring/three";
import logo from "../images/newLogo.svg";
import appleBtn from "../images/appleBtn.svg";
import androidBtn from "../images/android_coming_soon.svg";
import flexaReg from "../fonts/GT-Flexa-Standard-Regular.woff2";
import flexaBold from "../fonts/GT-Flexa-Standard-Bold.woff2";
import multichain from "../images/multichain.jpg";
import easy from "../images/easy.jpg";
import keys from "../images/keys.jpg";
import SEO from "../components/seo";
import ogImg from "../images/ogimage.png";
import cta from "../images/cta.svg";
import ape from "../images/ape.svg";

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
    background: white;
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
  color: black;
  z-index: 3;
  a {
    margin-left: 1rem;
    font-size: 0.75rem;
    color: black;
    text-decoration: none;
    pointer-events: auto;
    font-family: inter;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
    @media (min-width: ${lg}) {
      font-size: 1rem;
    }
  }
  .hide {
    @media (max-width: ${lg}) {
      display: none;
    }
  }
`;
const LogoImg = styled.img`
  width: 112px;
  height: auto;
  @media (min-width: ${lg}) {
    width: 170px;
  }
  @media (max-width: ${lg}) {
    width: 140px;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  position: relative;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  margin-bottom: -20vh;
  h1 {
    max-width: 90vw;
    font-weight: 700;
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
    font-weight: 400;
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

const AppleBtn = styled.img`
  width: 218px;
  height: auto;
  cursor: pointer;
`;

const AndroidBtn = styled.img`
  width: 218px;
  height: auto;
  margin-top: 1.5rem;
  cursor: pointer;
  @media (min-width: ${lg}) {
    width: 218px;
  }
`;

const Ape = styled.img`
  width: 218px;
  height: auto;
  margin-top: 1.5rem;
  cursor: pointer;
  position: relative;
  bottom: 5rem;
  @media (min-width: ${lg}) {
    width: 218px;
  }
`;

const MobileImg = styled.img`
  // width: 218px;
  // height: auto;
  // margin-top: 1.5rem;
  // cursor: pointer;
  // position: relative;
  // bottom: 5rem;
  // @media (min-width: ${lg}) {
  //   width: 218px;
  // }
`;

const FeatureContent = styled.div`
  // padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 1280px;
  margin: 0 auto 4rem auto;
`;

const FeatureItem = styled.div`
  border-radius: 2rem;
  color: #fff;
  overflow: hidden;
  text-align: center;
  margin-bottom: 1rem;
  max-width: 817px;
  max-height: 1188px;
  div {
    padding: 2rem;
  }
  img {
    width: 95%;
    height: auto;
  }
  @media (min-width: ${lg}) {
    width: 45%;
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
  color: black;
  padding: 3rem;
  text-align: center;
  display: block;
  margin: 0 auto;
  position: relative;
  // bottom: 4rem;

  div {
    display: flex;
    flex-direction:column;
  }

  p{
    font-weight: 700;
  }

  a {
    color: black;
    text-decoration: none;
    pointer-events: auto;
    padding-top:.5rem;

    font-weight:400;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
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
        image={"https://thesteakwallet.com" + ogImg}
      />
      {/* <SpaceSteak>
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
      </SpaceSteak> */}
      <Main>
        <NavBar>
          <LogoImg src={logo} alt="Steakwallet" />
          <nav>
            <a className="hide" href="#">
              Changelog
            </a>
            <a className="hide" href="#">
              Support
            </a>
            <a className="hide" href="#">
              LitePaper
            </a>
            <a href="https://twitter.com/steakwallet">Twitter</a>
            <a href="https://discord.gg/ZtdgjSEnRy">Discord</a>
          </nav>
        </NavBar>
        <HeroContent>
          <h1>The easiest way to steak</h1>
          <p>
            Steakwallet is a multi-chain wallet that makes staking your crypto
            as easy as possible. Start earning interest on your coins in
            seconds!
          </p>
          {/* <CTA href="https://form.typeform.com/to/Qemm4FMQ">
            Sign up for early access
          </CTA> */}
          <a href="https://form.typeform.com/to/Qemm4FMQ" target="_blank">
            <AppleBtn src={appleBtn} alt="Download app btn" />
          </a>
          <AndroidBtn src={androidBtn} alt="Android coming soon" />
        </HeroContent>
        <FeatureContent>
          <FeatureItem>
            <MobileImg src={cta} alt="Multi-chain" />
            {/* <div>
              <h3>Multi-Chain Support</h3>
              <p>
                Steakwallet is multi-chain, so you don’t need a different wallet
                for each blockchain. We’re adding support for new tokens and
                chains fast!
              </p>
            </div> */}
          </FeatureItem>
          {/* <FeatureItem>
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
          </FeatureItem> */}
          {/* <Ape src={ape} alt="Apes together strong" /> */}
        </FeatureContent>
        <Footer>
          <Ape src={ape} alt="Apes together strong" />
          <div>
            <p>© 2021 Steakwallet LLC</p>
            <a href="#">Terms of use</a>
            <a href="#">Privacy Policy</a>
          </div>
        </Footer>
      </Main>
    </>
  );
};

export default IndexPage;
