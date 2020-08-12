import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// semantic-ui
import { Button, Form, Modal, Header, Icon } from 'semantic-ui-react';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import usePrevious from 'utils/hooks/usePrevious';
import CircularLoadingIndicator from 'components/LoadingIndicator';

import {
  makeSelectLoading,
  makeSelectSuccessful,
  makeSelectEmail,
  makeSelectError,
} from './selectors';

import { requestLoginAction } from './actions';
import saga from './saga';
import reducer from './reducers';

import {
  LoginForm,
  LoginFormWrapper,
  LoginButton,
  LoginFieldWrapper,
} from './styles';
import RememberDiv from './components/RememberDiv';
import LoginFieldHeader from './components/LoginFieldHeader';

const key = 'login';

const LoginPage = ({
  email,
  loading,
  onClickTryLoginBtn,
  errors,
  successful,
}) => {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const [dialogLoginFail, setDialogLoginFail] = useState(false);
  const [_email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const prevSuccessful = usePrevious(successful);
  const prevErrors = usePrevious(errors);

  useEffect(() => {
    if (prevSuccessful === undefined) return;
    if (successful) {
      dialogLoginFailOpen();
    }
  }, [successful]);

  useEffect(() => {
    if (prevErrors === undefined) return;
    if (errors.length !== 0) {
      dialogLoginFailOpen();
    }
  }, [errors]);

  const dialogLoginFailOpen = () => {
    setDialogLoginFail(true);
  };

  const dialogLoginFailClose = () => {
    setDialogLoginFail(false);
  };

  return (
    <div>
      {email ? (
        <Redirect to="/my-class/learning-progress/course" replace />
      ) : null}
      <Modal open={dialogLoginFail} size="small">
        <Header content="로그인 실패" />
        <Modal.Content>
          <p>
            잘못된 로그인 정보이니 아이디 패스워드 확인 후 다시 진행하세요.!
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="blue" onClick={dialogLoginFailClose}>
            <Icon name="checkmark" />
            확인
          </Button>
        </Modal.Actions>
      </Modal>
      <LoginFieldWrapper>
        <LoginFieldHeader />
        <LoginFormWrapper>
          <Form.Field
            onChange={e => {
              setEmail(e.target.value);
            }}
          >
            <LoginForm
              id="2aa1918d39bf19d1ae3beb874c8fb955"
              label="email"
              placeholder="abc@abc.com"
              autoComplete="username"
            />
          </Form.Field>
          <Form.Field
            onChange={e => setPassword(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                onClickTryLoginBtn({ email: _email, password });
              }
            }}
          >
            <LoginForm
              id="6259cb398979b0b0f12adc86cbcd37de"
              label="password"
              placeholder="비밀번호"
              type="password"
              autoComplete="current-password"
            />
          </Form.Field>
        </LoginFormWrapper>
        <RememberDiv />
        {loading ? (
          <CircularLoadingIndicator size={10} inverted />
        ) : (
          <LoginButton
            fluid
            content="LOG IN"
            id="2424e22a739bbcbf094711ef20855e80"
            onClick={() => {
              onClickTryLoginBtn({ email: _email, password });
            }}
          />
        )}
      </LoginFieldWrapper>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onClickTryLoginBtn: ({ email, password }) =>
    dispatch(requestLoginAction({ email, password })),
});

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  successful: makeSelectSuccessful(),
  email: makeSelectEmail(),
  errors: makeSelectError(),
});

LoginPage.propTypes = {
  email: PropTypes.string,
  onClickTryLoginBtn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  successful: PropTypes.bool.isRequired,
  errors: PropTypes.array,
};

const connectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  connectedLogin,
)(LoginPage);
