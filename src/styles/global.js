import { createGlobalStyle } from "styled-components";

import "react-circular-progressbar/dist/styles.css";

import coolveticaFontTff from "../assets/fonts/coolvetica_rg.ttf";

export default createGlobalStyle`
				@font-face {
								font-family: 'Coolvetica';
								src: url(${coolveticaFontTff});								
				}

		   *{
								margin:0;
								padding:0;
								outline:0;
								box-sizing:border-box;
				}

				body{
				  font-family:Arial, Helvetica, sans-serif;
				  font-size:20px;
				  background: #202020;
				  text-rendering:optimizeLegibility;
				  --webkit-font-smoothig:antialiased;
				}

				html, body, #root {
			
								height:100%;
				}
`;
