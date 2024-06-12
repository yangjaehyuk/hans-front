import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import ValidateSchema from '../../utils/sign-in/validateSchema';
import { message, Layout, Input, Button } from 'antd';
import { TextBox } from '../../stores/atom/text-box';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { colors } from '../../constants/colors';
import { useCustomNavigate } from '../../hooks';
const SignInContainer = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: ValidateSchema,
    onSubmit: async (values) => {
      console.log('Form submitted:', values);
    },
  });

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    formik;

  const handleOnclick = () => {
    if (
      (errors.email && touched.email) ||
      (errors.password && errors.email) ||
      !values.email ||
      !values.password
    ) {
      message.error({
        content: (
          <TextBox typography="body3" fontWeight={'400'}>
            이메일과 비밀번호를 확인해 주세요.
          </TextBox>
        ),
        duration: 2,
        style: {
          width: '346px',
          height: '41px',
        },
      });
    }
  };

  return (
    <StyledContent>
      <Inner>
        <LoginContainer>
          <FormContainer onSubmit={handleSubmit}>
            <StyledInput
              size="large"
              placeholder="이메일 입력"
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <TextBox typography="body4" color="error">
                {errors.email}
              </TextBox>
            )}
            <StyledPassword
              size="large"
              placeholder="비밀번호 입력"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {touched.password && errors.password && (
              <TextBox typography="body4" color="error">
                {errors.password}
              </TextBox>
            )}
            <ButtonContainer>
              <LoginButton
                htmlType="submit"
                type="primary"
                onClick={handleOnclick}
              >
                <TextBox
                  typography="h5"
                  color={colors.black900}
                  fontWeight={'700'}
                  textAlign="center"
                >
                  로그인
                </TextBox>
              </LoginButton>
            </ButtonContainer>
          </FormContainer>
        </LoginContainer>
      </Inner>
      <SignUpContainer>
        <SignUpButton onClick={() => handleChangeUrl('/signup/agreement')}>
          <TextBox
            typography="h5"
            color="white"
            fontWeight={'700'}
            textAlign="center"
          >
            회원가입
          </TextBox>
        </SignUpButton>
      </SignUpContainer>
    </StyledContent>
  );
};

const StyledContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 666px;
  gap: 52px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  width: 374px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledInput = styled(Input)`
  height: 54px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
`;

const StyledPassword = styled(StyledInput.Password)`
  height: 54px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
`;

const ButtonContainer = styled.div``;

const SignUpButton = styled(Button)`
  width: 100%;
  height: 54px;
  border-radius: 2px;
  padding: 12px 32px 12px 32px;
  border: 1px solid ${colors.black900};
  background-color: ${colors.black900};
  color: white;

  &:hover {
    background-color: ${colors.black900} !important;
    border-color: ${colors.black900} !important;
    color: white !important;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  height: 54px;
  border-radius: 2px;
  padding: 12px 32px 12px 32px;
  border: 1px solid ${colors.black900};
  background-color: white;
  color: ${colors.black900};

  &:hover {
    background-color: white !important;
    border-color: ${colors.black900} !important;
    color: ${colors.black900} !important;
  }
`;

const SignUpContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default SignInContainer;
