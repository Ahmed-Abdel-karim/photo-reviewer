import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

* {
  font-family: 'Cairo', sans-serif ;
}

 @media screen and (min-device-width: 1601px) and (-webkit-min-device-pixel-ratio: 1) {
  html {
    font-size: 16px;
  }
}

@media screen and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
  html {
    font-size: 12.8px;
  }
}

`;
