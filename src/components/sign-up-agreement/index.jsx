import { Button, Checkbox, Layout } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { TextBox } from '../../stores/atom/text-box';
import { useCustomNavigate } from '../../hooks';
import { colors } from '../../constants/colors';
const SignUpAgreementContainer = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const data = [
    { id: 0, condition: '[필수]', title: '만 14세 이상입니다.' },
    {
      id: 1,
      condition: '[선택]',
      title: 'Hans 서비스 이용 약관',
    },
    {
      id: 2,
      condition: '[선택]',
      title: 'Hans 개인정보 수집 및 이용 동의',
    },
    {
      id: 3,
      condition: '[선택]',
      title: 'Hans 제 3자 정보 제공 동의',
    },
  ];

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setIsChecked((prev) => [...prev, id]);
      if (isChecked.length + 1 === 4) {
        setAllChecked(true);
      }
      if (id === 0) {
        setIsDisabled(false);
      }
    } else {
      setIsChecked(isChecked.filter((el) => el !== id));
      setAllChecked(false);
      if (id === 0) {
        setIsDisabled(true);
      }
    }
  };

  const handleAllCheck = (e) => {
    if (e.target.checked) {
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setIsChecked(idArray);
      setIsDisabled(false);
      setAllChecked(true);
    } else {
      setIsChecked([]);
      setIsDisabled(true);
      setAllChecked(false);
    }
  };

  return (
    <StyledContent>
      <Wrapper>
        <Container>
          <MainContainer>
            <CheckBoxContainer>
              <CheckBoxInner>
                <Checkbox
                  onChange={handleAllCheck}
                  id="all"
                  checked={allChecked}
                />
                <TextInner>
                  <label htmlFor="all">
                    <TextBox
                      typography="h5"
                      color="black900"
                      textAlign="center"
                      fontWeight={'700'}
                    >
                      모두 동의
                    </TextBox>
                  </label>

                  <MenuContainer>
                    <SubTextContainer>
                      <TextBox
                        typography="body5"
                        color="black900"
                        cursor="default"
                        fontWeight={'400'}
                      >
                        • 전체 동의는 필수 및 선택 항목에 대한 동의를
                        포함합니다.
                      </TextBox>
                    </SubTextContainer>
                    <SubTextContainer>
                      <TextBox
                        typography="body5"
                        color="black900"
                        cursor="default"
                        fontWeight={'400'}
                      >
                        • 선택 항목에 동의하지 않아도 서비스 이용이 가능합니다.
                      </TextBox>
                    </SubTextContainer>
                  </MenuContainer>
                </TextInner>
              </CheckBoxInner>
              {data.map((data) => (
                <React.Fragment key={data.id}>
                  <CheckBoxSelectiveInner>
                    <Checkbox
                      onChange={(e) =>
                        handleSingleCheck(e.target.checked, data.id)
                      }
                      checked={isChecked.includes(data.id)}
                      id={`${data.id}`}
                    />
                    <TextInner>
                      <label htmlFor={`${data.id}`}>
                        <TextBox
                          typography="body3"
                          color="primary"
                          textAlign="center"
                          fontWeight={'700'}
                        >
                          {data.condition}
                        </TextBox>
                        <TextBox
                          typography="body3"
                          color="black900"
                          textAlign="center"
                          fontWeight={'500'}
                        >
                          {' '}
                          {data.title}
                        </TextBox>
                      </label>
                    </TextInner>
                  </CheckBoxSelectiveInner>
                </React.Fragment>
              ))}
            </CheckBoxContainer>
            <ButtonContainer>
              <StyledPrevButton onClick={() => handleChangeUrl('/signin')}>
                <TextBox
                  typography="h5"
                  fontWeight={'700'}
                  textAlign="center"
                  color="primary"
                >
                  이전
                </TextBox>
              </StyledPrevButton>
              <StyledNextButton
                onClick={() => handleChangeUrl('/signup')}
                type="primary"
                disabled={isDisabled}
              >
                <TextBox typography="h5" fontWeight={'700'} textAlign="center">
                  다음
                </TextBox>
              </StyledNextButton>
            </ButtonContainer>
          </MainContainer>
        </Container>
      </Wrapper>
    </StyledContent>
  );
};
const StyledContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 52px;
  height: 660px;
  padding: 20px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 450px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 15px;

  margin-left: 8px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CheckBoxContainer = styled.div``;

const TextInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubTextContainer = styled.div``;

const CheckBoxInner = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 16px 24px 16px 24px;
  background-color: ${colors.midGray};
  border-bottom: 0.8px solid ${colors.black600};
`;

const CheckBoxSelectiveInner = styled(CheckBoxInner)`
  background-color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledNextButton = styled(Button)`
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

const StyledPrevButton = styled(Button)`
  width: 150px;
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

export default SignUpAgreementContainer;
