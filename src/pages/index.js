import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useSpring, animated, config } from "@react-spring/three";
import logo from "../images/newLogo.svg";
import appleBtn from "../images/appleBtn.svg";
import androidBtn from "../images/androidBtn.svg";
import flexaReg from "../fonts/GT-Flexa-Standard-Regular.woff2";
import flexaBold from "../fonts/GT-Flexa-Standard-Bold.woff2";
import interReg from "../fonts/Inter-Regular.ttf";
import multichain from "../images/multichain.jpg";
import easy from "../images/easy.jpg";
import keys from "../images/keys.jpg";
import SEO from "../components/seo";
import ogImg from "../images/ogimage.png";
import cta from "../images/cta.svg";
import steakMobile from "../images/steakMobile.png";
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
    font-family: "Inter";
    src: url(${interReg});
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

const Main = styled.main`
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 2;
  position: relative;
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
    font-family: ${interReg};
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
    font-size: clamp(16px, 15vw, 48px);
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

const AppleBtn = styled.img`
  width: 218px;
  height: auto;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.2s ease-out;
  &:hover {
    transform: scale(1.06);
  }
`;

const AndroidBtn = styled.img`
  width: 248px;
  height: auto;
  margin: 0 1.5rem;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.2s ease-out;
  &:hover {
    transform: scale(1.06);
  }
`;

const Ape = styled.img`
  width: 218px;
  height: auto;
  margin-top: 1.5rem;
  position: relative;
  bottom: 5rem;
  @media (min-width: ${lg}) {
    width: 218px;
  }
`;

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0 4rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MobileImg = styled.img`
  width: 100%;
  max-width: 740px;
  height: auto;
  margin-left: -2.75%;
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
    padding-top:.5rem;

    font-weight:400;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
`;

const IndexPage = () => {
  return (
    <>
      <GlobalStyle />
      <SEO
        title="Start earning interest on your crypto"
        description="Steakwallet is the easiest and safest way to steak your crypto assets across blockchains."
        image={"https://thesteakwallet.com" + ogImg}
      />
      <Main>
        <NavBar>
          <LogoImg src={logo} alt="Steakwallet" />
          <nav>
            <a
              className="hide"
              href="https://steakwallet.fi/changelog"
              target="_blank"
            >
              Changelog
            </a>
            <a
              className="hide"
              href="https://steakwallet.fi/support"
              target="_blank"
            >
              Support
            </a>
            <a href="https://twitter.com/steakwallet" target="_blank">
              Twitter
            </a>
            <a href="https://discord.gg/ZtdgjSEnRy" target="_blank">
              Discord
            </a>
          </nav>
        </NavBar>
        <HeroContent>
          <h1>The easiest way to steak</h1>
          <p>
            Steakwallet is a multi-chain wallet that makes staking your crypto
            as easy as possible. Start earning interest on your coins in
            seconds!
          </p>

          <ButtonContainer>
            <a
              href="https://apps.apple.com/app/steakwallet/id1569375204?l=en"
              target="_blank"
            >
              <AppleBtn src={appleBtn} alt="Download app btn" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=fi.steakwallet.app"
              target="_blank"
            >
              <AndroidBtn
                style={{ zIndex: "100" }}
                src={androidBtn}
                alt="Android coming soon"
              />
            </a>
          </ButtonContainer>
        </HeroContent>
        <FeatureContent>
          <MobileImg src={steakMobile} alt="Steakwallet App on iOS Device" />
        </FeatureContent>
        <Footer>
          <Ape src={ape} alt="Apes together strong" />
          <div>
            <p>© 2021 Steakwallet LLC</p>
            <a href="https://steakwallet.fi/terms" target="_blank">
              Terms of use
            </a>
            <a href="https://steakwallet.fi/privacy" target="_blank">
              Privacy Policy
            </a>
          </div>
        </Footer>
      </Main>
    </>
  );
};

export default IndexPage;
