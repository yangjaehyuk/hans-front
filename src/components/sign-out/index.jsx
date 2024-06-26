import React from 'react';
import { message } from 'antd';
import { TextBox } from '../../stores/atom/text-box';
import { deleteAllCookies } from '../../utils/cookie';
/** This is a sign out component. */
const SignOutContainer = () => {
  const showMessage = () => {
    // delete all cookie values.
    deleteAllCookies();
    message.error({
      content: (
        <TextBox typography="body3" fontWeight={'400'}>
          로그아웃 되셨습니다.
        </TextBox>
      ),
      duration: 2,
      style: {
        width: '346px',
        height: '41px',
      },
    });
  };

  return showMessage;
};

export default SignOutContainer;
