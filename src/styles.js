import styled,{keyframes} from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const openContent = keyframes`
  0%   {transform: translate3d(0,0,0) ;}
  40%  {transform: translate3d(0,-30%,0) rotate(-5deg); }
  60%  {transform: translate3d(0,0,0) ;}
  75%  {transform: translate3d(0,-20%,0) rotate(4deg);}
  85%  {transform: translate3d(0,0,0) ;}
  92%  {transform: translate3d(0,-10%,0) rotate(-2deg);}
  100% {transform: translate3d(0,0,0);}
`

export const Content = styled.div`
  width: 100%;
  min-width:340px;
  max-width: 650px;
  margin: 30px;
  background: #fff;
  box-shadow: 0 15px 80px 10px #000;
  border-radius: 10px;
  padding: 20px 30px;

  animation: ${openContent} 0.8s forwards;
  animation-play-state:paused;
`;
