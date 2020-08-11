import { createGlobalStyle } from 'styled-components';
import { configureStyle } from 'utils/configureStyle';

const theme = configureStyle();

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Work+Sans');
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic:300,700');

  
  .react-phone-number-input__icon {
    width: 1.24em;
    height: auto !important;
    border: none !important;
    box-sizing: content-box;
  }

  .react-phone-number-input__input {
    height: auto !important;
    outline: none;
    border-radius: 0;
    padding: 0;
    appearance: none;
    border: none;
    border-bottom: 1px solid #C5D2E0;
    transition: border 0.1s;
    font-size: inherit;
  }

  #app {
    background-color: #fafafa;
    height: 100vh;
    width: 100vw;
    -webkit-overflow-scrolling: touch !important;
  }

  p,
  label {
    line-height: 1.5em;
  }

  .ui.dimmer {
    background-color: ${theme.overlayColor};
  }

  .Toastify__toast {
    position: relative;
    min-height: 84px !important;
    border-radius: 5px !important;
  }

  .Toastify__toast--default {
    background: ${theme.pointColor} !important;
    color: white !important;
  }

  .route-wrapper {
    position: relative;
  }

  .route-wrapper > div {
    position: absolute;
  }
  .ui.form .disabled.field, .ui.form .disabled.fields .field, .ui.form .field :disabled {
    pointer-events: none;
    opacity: .65 !important;
  }
  .ui.form .field.disabled>label, .ui.form .fields.disabled>label {
    opacity: 1 !important;
  }
  .Toastify__toast-container--bottom-left {
    bottom: 1em;
    left: 80px !important;
  }
  /*  회전 css */
  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to  {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  .rotating {
    -webkit-animation: rotating 2s linear infinite;
    -moz-animation: rotating 2s linear infinite;
    -ms-animation: rotating 2s linear infinite;
    -o-animation: rotating 2s linear infinite;
    animation: rotating 2s linear infinite;
  }

  #loader-7 {
    -webkit-perspective: 120px;
    -moz-perspective: 120px;
    -ms-perspective: 120px;
    perspective: 120px;
  }
  .react-sweet-progress-symbol {
    display: none !important;
  }
  .react-sweet-progress-line-inner {
    position: relative;
    min-height: 5px !important;
    border-radius: 100px;
    transition: width 0.3s ease;
  }
  #loader-7:before {
    content: "";
    position: absolute;
    left: 10px;
    top: 10px;
    width: 50px;
    height: 50px;
    background-color: ${props => props.theme.pointColor};
    animation: flip 1s infinite;
  }
  .Resizer.horizontal:hover {
    border-bottom: 3px solid ${props => props.theme.pointColor} !important;
    border-top: 3px solid ${props => props.theme.pointColor} !important;   
    opacity: 0.5 !important;
  }
  .Resizer.vertical:hover {
    border-left: 3px solid ${props => props.theme.pointColor} !important;
    border-right: 3px solid ${props => props.theme.pointColor} !important;   
    opacity: 0.5 !important;
  } 
   .customTooltip {
    color: white!important;
    background-color: ${props => props.theme.pointColor} !important;
      &.place-top {
      &:after {
        border-top-color: ${props => props.theme.pointColor} !important;
        border-top-style: solid !important;
        border-top-width: 6px !important;
      }
    }
  }
`;

export default GlobalStyle;
