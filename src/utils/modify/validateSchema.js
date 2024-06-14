import * as yup from 'yup';

const ValidateSchema = () => {
  return yup.object().shape({
    nickname: yup
      .string()
      .matches(/^.{1,}$/, '닉네임은 최소 한 글자 이상이어야 합니다.')
      .required('닉네임을 입력하세요.'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
        '영문(대,소문자), 숫자 포함 8~20자로 입력해주세요.',
      )
      .required('영문(대,소문자), 숫자 포함 8~20자로 입력해주세요.'),
    checkPassword: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호를 다시 입력하세요.'),
    file: yup
      .mixed()
      .required('파일을 업로드해주세요.')
      .test('fileSize', '파일 크기는 최대 2MB 이하여야 합니다.', (value) =>
        value ? value.size <= 2 * 1024 * 1024 : true,
      )
      .test(
        'fileType',
        '지원하는 파일 형식은 JPG, JPEG, GIF, PNG 입니다.',
        (value) =>
          value
            ? ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
                value.type,
              )
            : true,
      ),
  });
};

export default ValidateSchema;
