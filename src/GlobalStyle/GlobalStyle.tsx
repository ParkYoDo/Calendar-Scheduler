import { createGlobalStyle } from 'styled-components';
import SoftMakerTejeHandwriting from 'fonts/SoftMakerTejeHandwriting.ttf';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    @font-face {
      font-family: 'SoftMakerTejeHandwriting';
      src: local('SoftMakerTejeHandwriting'), local('SoftMakerTejeHandwriting');
      font-style: normal;
      src: url(${SoftMakerTejeHandwriting}) format('truetype')
    } 
    font-family: 'SoftMakerTejeHandwriting';
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
`;
