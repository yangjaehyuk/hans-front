import * as yup from 'yup';

const ValidateSchema = yup.object().shape({
  title: yup
    .string()
    .matches(/^.{1,}$/, '제목은 최소 한 글자 이상이어야 합니다.')
    .required('제목을 입력하세요.'),
  detail: yup
    .string()
    .matches(/^.{1,}$/, '내용은 최소 한 글자 이상이어야 합니다.')
    .required('내용을 입력하세요.'),
  hashtags: yup
    .array()
    .of(
      yup
        .string()
        .required('해시태그를 등록하세요.')
        .matches(/^.{1,}$/, '해시태그는 최소 한 글자 이상이어야 합니다.'),
    )
    .min(1, '최소 한 개 이상의 해시태그를 등록하세요.')
    .required('해시태그를 등록하세요.'),
  products: yup
    .array()
    .of(
      yup
        .string()
        .required('제품을 검색 하세요.')
        .matches(/^.{1,}$/, '제품은 최소 한 글자 이상이어야 합니다.'),
    )
    .min(1, '최소 한 개 이상의 제품을 등록하세요.')
    .required('제품을 검색 하세요.'),
  files: yup
    .array()
    .min(1, '최소 1개의 이미지를 업로드해주세요.')
    .required('파일을 업로드해주세요.')
    .test('fileSize', '파일 크기는 최대 2MB 이하여야 합니다.', (files) =>
      files.every((file) => file.size <= 2 * 1024 * 1024),
    )
    .test(
      'fileType',
      '지원하는 파일 형식은 JPG, JPEG, GIF, PNG 입니다.',
      (files) =>
        files.every((file) =>
          ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
            file.type,
          ),
        ),
    ),
});

export default ValidateSchema;
