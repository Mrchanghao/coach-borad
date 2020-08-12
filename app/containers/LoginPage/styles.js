import styled from 'styled-components';
import { Button, Form } from 'semantic-ui-react';

export const LoginFieldWrapper = styled.div`
  margin: 50px auto;
  width: 384px;
  height: 459px;
  label {
    font-family: 'Work Sans', 'Nanum Gothic', sans-serif;
  }
`;

export const LoginFormWrapper = styled(Form)`
  margin-top: 30px;
`;

export const LoginForm = styled(Form.Input)`
  .input :focus {
    border-color: ${props => props.theme.pointColor} !important;
  }
  > label {
    color: ${props => props.theme.textColor} !important;
  }
`;

export const LoginButton = styled(Button)`
  background-color: ${props => props.theme.pointColor} !important;
  color: white !important;
`;
