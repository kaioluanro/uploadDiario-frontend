import styled, { keyframes, createGlobalStyle } from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const colorAnimetedFont = (props) => props.color;

const flashesFont = keyframes`
				0%, 100%{color:${colorAnimetedFont}; opacity:1;}
				50%{color: ${colorAnimetedFont}; opacity:0.5;}
`;

export const BgAnimated = styled.h1`
  position: absolute;
  font-size: 47em;
  font-family: "Coolvetica";
  color: #ebebeb;

  @media (max-width: 2650px) {
    font-size: 80em;
  }

  @media (max-width: 1920px) {
    font-size: 47em;
  }

  @media (max-width: 1440px) {
    font-size: 38em;
  }

  @media (max-width: 1024px) {
    font-size: 28em;
  }

  @media (max-width: 768px) {
    top: 22%;
    font-size: 10em;
  }

  @media (max-width: 414px) {
    top: 22%;
    font-size: 8em;
  }

  @media (max-width: 320px) {
    top: 22%;
    font-size: 5em;
  }

  animation-name: ${flashesFont};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-play-state: paused;
`;

const openContent = keyframes`
  0%   {transform: translate3d(0,0,0) ;}
  40%  {transform: translate3d(0,-30%,0) rotate(-5deg); }
  60%  {transform: translate3d(0,0,0) ;}
  75%  {transform: translate3d(0,-20%,0) rotate(4deg);}
  85%  {transform: translate3d(0,0,0) ;}
  92%  {transform: translate3d(0,-10%,0) rotate(-2deg);}
  100% {transform: translate3d(0,0,0);}
`;

export const Content = styled.div`
  width: 100%;
  min-width: 340px;
  max-width: 650px;
  margin: 30px;
  background: #fff;
  box-shadow: 0 15px 80px 10px #000;
  border-radius: 10px;
  padding: 20px 30px;
  position: absolute;
  z-index: 100;

  animation: ${openContent} 0.8s forwards;
  animation-play-state: paused;
`;
