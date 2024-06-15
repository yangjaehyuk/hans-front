import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Layout,
  Input,
  Tag,
  theme,
  Upload,
  Image,
  message,
  Select,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { TweenOneGroup } from 'rc-tween-one';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import ValidateSchema from '../../utils/post/validateSchema';
import { TextBox } from '../../stores/atom/text-box';
import { useCustomNavigate } from '../../hooks';
import * as yup from 'yup';

const { TextArea } = Input;
const { Dragger } = Upload;

const Post = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const { token } = theme.useToken();

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const formik = useFormik({
    initialValues: {
      title: '',
      detail: '',
      hashtags: [],
      files: [],
      products: [],
    },
    validationSchema: ValidateSchema,
    onSubmit: (values) => {
      // handle form submission
    },
  });

  const handleClose = (removedTag) => {
    const newTags = formik.values.hashtags.filter((tag) => tag !== removedTag);
    formik.setFieldValue('hashtags', newTags); // Update Formik state
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !formik.values.hashtags.includes(inputValue)) {
      const newTags = [...formik.values.hashtags, inputValue];
      formik.setFieldValue('hashtags', newTags); // Update Formik state
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag, index) => (
    <span key={`${tag}-${index}`}>
      <Tag closable onClose={() => handleClose(tag)}>
        {tag}
      </Tag>
    </span>
  );

  const tagChild = formik.values.hashtags.map(forMap);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList }) => {
    const validFiles = [];
    const filePromises = fileList.map((file) =>
      yup
        .object()
        .shape({
          originFileObj: yup
            .mixed()
            .required('이미지를 업로드해주세요.')
            .test(
              'fileType',
              '지원하는 파일 형식은 JPG, JPEG, GIF, PNG 입니다.',
              (value) =>
                value &&
                ['image/jpeg', 'image/png', 'image/gif'].includes(value.type),
            ),
        })
        .validate({ originFileObj: file.originFileObj }, { abortEarly: false })
        .then(() => validFiles.push(file))
        .catch((error) => {
          message.error(error.message);
        }),
    );

    Promise.all(filePromises).then(() => {
      formik.setFieldValue('files', validFiles);
    });
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    if (
      formik.values.title.length > 0 &&
      formik.values.detail.length > 0 &&
      formik.values.hashtags.length > 0 &&
      formik.values.files.length > 0 &&
      formik.values.products.length > 0
    ) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [
    formik.values.title,
    formik.values.detail,
    formik.values.hashtags,
    formik.values.files,
    formik.values.products,
  ]);
  return (
    <StyledLayout>
      <StyledContent>
        <FormContainer onSubmit={formik.handleSubmit}>
          <TextBox variant="body2" fontWeight={'400'} cursor="default">
            Title
          </TextBox>
          <EmailInner>
            <EmailInput>
              <StyledInput
                size="large"
                placeholder="제목 입력"
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  borderColor:
                    formik.touched.title && formik.errors.title
                      ? 'red'
                      : '#d9d9d9',
                }}
              />
              {formik.touched.title && formik.errors.title && (
                <TextBox typography="body4" fontWeight={'400'} color="error">
                  {formik.errors.title}
                </TextBox>
              )}
            </EmailInput>
          </EmailInner>
          <TextBox variant="body2" fontWeight={'400'} cursor="default">
            Detail
          </TextBox>
          <EmailInner>
            <EmailInput>
              <StyledTextArea
                size="large"
                placeholder="내용 입력"
                name="detail"
                value={formik.values.detail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  borderColor:
                    formik.touched.detail && formik.errors.detail
                      ? 'red'
                      : '#d9d9d9',
                }}
              />
              {formik.touched.detail && formik.errors.detail && (
                <TextBox typography="body4" fontWeight={'400'} color="error">
                  {formik.errors.detail}
                </TextBox>
              )}
            </EmailInput>
          </EmailInner>
          <TextBox variant="body2" fontWeight={'400'} cursor="default">
            HashTags
          </TextBox>
          <EmailInner>
            <EmailInput>
              <div style={{ marginBottom: 16 }}>
                <TweenOneGroup
                  name="hashtags"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    maxWidth: '100%',
                  }}
                  key={formik.values.hashtags.join(',')}
                  enter={{
                    scale: 0.8,
                    opacity: 1,
                    type: 'from',
                    duration: 100,
                  }}
                  leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                  onEnd={(e) => {
                    if (e.type === 'appear' || e.type === 'enter') {
                      e.target.style = 'display: inline-block';
                    }
                  }}
                >
                  {tagChild}
                </TweenOneGroup>
              </div>
              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              ) : (
                <Tag onClick={showInput} style={{ width: 78 }}>
                  <PlusOutlined /> New Tag
                </Tag>
              )}
            </EmailInput>
          </EmailInner>
          <TextBox variant="body2" fontWeight={'400'} cursor="default">
            Images
          </TextBox>
          <div>
            <div style={{ width: '50vw' }}>
              <Upload
                name="files"
                listType="picture-card"
                fileList={formik.values.files}
                onPreview={handlePreview}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                beforeUpload={() => false}
                style={{
                  margin: '0 auto',
                  display: 'flex',
                  flexWrap: 'wrap !important',
                }}
              >
                {uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterClose: () => setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}
            </div>
          </div>
          <TextBox variant="body2" fontWeight={'400'} cursor="default">
            Products
          </TextBox>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: '1',
                label: 'Not Identified',
              },
              {
                value: '2',
                label: 'Closed',
              },
              {
                value: '3',
                label: 'Communicated',
              },
              {
                value: '4',
                label: 'Identified',
              },
              {
                value: '5',
                label: 'Resolved',
              },
              {
                value: '6',
                label: 'Cancelled',
              },
            ]}
          />
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
                완료
              </TextBox>
            </StyledDoneButton>
          </ButtonContainer>
        </FormContainer>
      </StyledContent>
    </StyledLayout>
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
