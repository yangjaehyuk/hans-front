import * as yup from 'yup';

const ValidateSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^.{1,}$/, '제목은 최소 한 글자 이상이어야 합니다.')
    .required('제목을 입력하세요.'),
  detail: yup
    .string()
    .trim()
    .required('내용을 입력하세요.')
    .min(1, '내용은 최소 한 글자 이상이어야 합니다'),
  hashtags: yup
    .array()
    .min(1, '최소 1개의 해시태그를 업로드 해주세요.')
    .required('해시태그를 업로드 해주세요.'),
  files: yup
    .array()
    .min(1, '최소 1개의 이미지를 업로드 해주세요.')
    .required('파일을 업로드 해주세요.'),
});

export default ValidateSchema;
