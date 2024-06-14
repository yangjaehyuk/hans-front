import { colors } from '../../constants/colors';
import ValidateSchema from '../../utils/post/validateSchema';
import { TextBox } from '../../stores/atom/text-box';
import { useCustomNavigate } from '../../hooks';
import { Button, Layout, Input } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
const { TextArea } = Input;
const Post = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

  const [thumbnails, setThumbnails] = useState([]);
  const formik = useFormik({
    initialValues: {
      files: [],
      title: '',
      detail: '',
      product: [],
    },
    validationSchema: ValidateSchema,
    onSubmit: (values) => {
      // handle form submission
    },
  });

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <>
      <StyledLayout>
        <StyledContent>
          <FormContainer onSubmit={handleSubmit}>
            <TextBox variant="body2" fontWeight={'400'} cursor="default">
              Title
            </TextBox>
            <EmailInner>
              <EmailInput>
                {/* Input for title */}
                <StyledInput
                  size="large"
                  placeholder="제목 입력"
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // Add conditional styling based on form validation
                  style={{
                    borderColor:
                      touched.title && errors.title ? 'red' : '#d9d9d9',
                  }}
                />
                {/* Error message display */}
                {touched.title && errors.title && (
                  <TextBox typography="body4" fontWeight={'400'} color="error">
                    {errors.title}
                  </TextBox>
                )}
              </EmailInput>
            </EmailInner>
            <TextBox variant="body2" fontWeight={'400'} cursor="default">
              Detail
            </TextBox>
            <EmailInner>
              <EmailInput>
                {/* Input for detail */}
                <StyledTextArea
                  size="large"
                  placeholder="내용 입력"
                  type="text"
                  name="detail"
                  value={values.detail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // Add conditional styling based on form validation
                  style={{
                    borderColor:
                      touched.detail && errors.detail ? 'red' : '#d9d9d9',
                  }}
                />
                {/* Error message display */}
                {touched.detail && errors.detail && (
                  <TextBox typography="body4" fontWeight={'400'} color="error">
                    {errors.detail}
                  </TextBox>
                )}
              </EmailInput>
            </EmailInner>
            <ButtonContainer>
              <StyledDoneButton
                htmlType="submit"
                disabled={isDisabled}
                type="primary"
              >
                <TextBox
                  typography="h5"
                  fontWeight={'700'}
                  textAlign="center"
                  color="white"
                >
                  수정 완료
                </TextBox>
              </StyledDoneButton>
            </ButtonContainer>
          </FormContainer>
        </StyledContent>
      </StyledLayout>
    </>
  );
};

const StyledLayout = styled(Layout)`
  max-width: 100vw;
  background-color: white;
`;

const StyledContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 52px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  padding-bottom: 10vh;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 390px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledDoneButton = styled(Button)`
  width: 300px;
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

const EmailInner = styled.div`
  display: flex;
  gap: 8px;
`;

const EmailInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  gap: 8px;
`;

const StyledInput = styled(Input)`
  height: 54px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
`;

const StyledTextArea = styled(TextArea)`
  border-radius: 2px;
  border: 1px solid #d9d9d9;
`;

export default Post;
