import * as yup from 'yup';
/** When we sign up to our web site, we use this validation schema */
/** This schema used with formik library. */
const ValidateSchema = () => {
  return yup.object({
    email: yup
      .string()
      .matches(/^[^@\s]+@[^\s]+\.[^@\s]+$/, '이메일 형식이 올바르지 않습니다.')
      .required('이메일을 입력하세요.'),
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
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
  });
};

export default ValidateSchema;
