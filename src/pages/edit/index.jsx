import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  Button,
  Layout,
  Input,
  Tag,
  theme,
  Upload,
  Image,
  message,
  Spin,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { TweenOneGroup } from 'rc-tween-one';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import ValidateSchema from '../../utils/post/validateSchema';
import { TextBox } from '../../stores/atom/text-box';
import PostAPI from '../../api/post-api';
import { useParams } from 'react-router-dom';
import { useCustomNavigate } from '../../hooks';
const { TextArea } = Input;

const Edit = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const { postId } = useParams();
  const [detailArr, setDetailArr] = useState({
    title: '',
    detail: '',
    hashtags: [],
    files: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const formik = useFormik({
    initialValues: {
      title: '',
      detail: '',
      hashtags: [],
      files: [],
    },
    validationSchema: ValidateSchema,
    onSubmit: async (values) => {
      try {
        await PostAPI.modifyPostAPI({
          postId: postId,
          title: values.title,
          body: values.detail,
          tagList: values.hashtags,
          imgList: values.files,
        });
        // window.location.href = `http://localhost:3000/detail/${postId}`;
        handleChangeUrl('/style');
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await PostAPI.viewPostDetailAPI(postId);
        const data = response.data.data;

        setDetailArr(data);
        formik.setValues({
          title: data.title,
          detail: data.body,
          hashtags: data.tagList,
          files: data.imgList,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    if (
      detailArr.title.length > 0 &&
      detailArr.body.length > 0 &&
      detailArr.tagList.length > 0 &&
      detailArr.imgList.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [detailArr.title, detailArr.body, detailArr.tagList, detailArr.imgList]);

  // console.log(detailArr.title);
  // console.log(detailArr.body);
  // console.log(detailArr.tagList);
  // console.log(detailArr.imgList);
  const handleRemove = (file) => {
    const updatedFiles = formik.values.files.filter((f) => f.uid !== file.uid);
    formik.setFieldValue('files', updatedFiles);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (
      inputValue &&
      !formik.values.hashtags.some((tag) => tag.body === inputValue)
    ) {
      const newTag = {
        tagId: formik.values.hashtags.length + 1,
        body: inputValue,
      };
      const newTags = [...formik.values.hashtags, newTag];
      formik.setFieldValue('hashtags', newTags); // Update Formik state
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleClose = (removedTag) => {
    const newTags = formik.values.hashtags.filter((tag) => tag !== removedTag);
    formik.setFieldValue('hashtags', newTags); // Update Formik state
  };

  const forMap = (tagObject, index) => (
    <span key={`${tagObject.tagId}-${index}`}>
      <Tag closable onClose={() => handleClose(tagObject.tagId)}>
        {tagObject.body}
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
    // console.log(fileList[fileList.length - 1].type);
    if (fileList.length === 0) {
      formik.setFieldValue('files', fileList);
    } else {
      if (fileList[fileList.length - 1].type === undefined) {
        formik.setFieldValue('files', fileList);
      } else {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (
          fileList.length > 0 &&
          !validTypes.includes(fileList[fileList.length - 1].type)
        ) {
          message.error({
            content: (
              <TextBox typography="body4" fontWeight={'400'}>
                지원하는 파일 형식은 JPG, JPEG, GIF, PNG 입니다.
              </TextBox>
            ),
            duration: 2,
            style: {
              width: '346px',
              height: '41px',
            },
          });
        } else {
          // imgId, imgUrl, isThumbnail
          const imageObjects = [];
          fileList.forEach((item, index) => {
            // 이미지 객체인지 판단 (imgId 속성이 있는지 확인)
            if (item.imgId !== undefined) {
              // 이미지 객체일 경우 그대로 추가
              imageObjects.push(item);
            } else {
              // 파일 업로드 객체일 경우, 이미지 객체로 변환하여 추가
              console.log(item);
              const blobUrl = URL.createObjectURL(item.originFileObj);
              const imageObj = {
                imgId: index + 1, // 예시로 순차적으로 부여되는 이미지 ID
                imgUrl: blobUrl, // uid를 기반으로 imgUrl 생성
                isThumbnail: index === 0 ? true : false, // 예시로 첫 번째는 썸네일이 아니고, 나머지는 썸네일로 설정
                uid: `__AUTO__1718729428846_${index}__`, // 예시로 고유한 uid 생성
              };
              imageObjects.push(imageObj);
            }
            formik.setFieldValue('files', imageObjects);
          });
        }
      }
    }
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

  return (
    <StyledLayout>
      {isLoading ? (
        <LoadingContainer>
          <BlackSpin size="large" />
        </LoadingContainer>
      ) : (
        <StyledContent>
          <TextContainer style={{ cursor: 'default' }}>
            <TextBox typography="h1" fontWeight="700">
              Edit
            </TextBox>
          </TextContainer>
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
                    key={formik.values.hashtags
                      .map((tag) => tag.tagId)
                      .join(',')}
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
                  onRemove={handleRemove}
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
      )}
    </StyledLayout>
  );
};
const LoadingContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const BlackSpin = styled(Spin)`
  .ant-spin-dot {
    i {
      background: black;
    }
  }
`;
const StyledLayout = styled(Layout)`
  max-width: 100vw;
  background-color: white;
`;

const TextContainer = styled.div`
  color: black;
  font-weight: ${(props) => props.fontWeight};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
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

export default Edit;
