import React from 'react';
import styled from 'styled-components';
import { LogoutOutlined, SearchOutlined } from '@ant-design/icons';
const MainHeader = () => {
  return (
    <Navbar>
      <Logo>HANS</Logo>
      <NavLinks>
        <NavLink href="">Home</NavLink>
        <NavLink href="style">Style</NavLink>
        <NavLink href="mypage">My Page</NavLink>
      </NavLinks>
      <Profile>
        <StyledSearchIcon />
        <StyledLogoutIcon />
        <ProfileImage>
          <span role="img" aria-label="user">
          </span>
        </ProfileImage>
        <span>yangjaehyuk_</span>
      </Profile>
    </Navbar>
  );
};
const Navbar = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const Logo = styled.div`
  flex: 1;
  font-size: 4vh;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavLinks = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 3vw;
`;
const NavLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 2.2vh;
`;
const StyledSearchIcon = styled(SearchOutlined)`
  font-size: 3vh;
  margin-right: 0.5vw;
`;
const StyledLogoutIcon = styled(LogoutOutlined)`
  font-size: 3vh;
  margin-right: 1vw;
`;
const Profile = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
`;
const ProfileImage = styled.div`
  width: 4vh;
  height: 4vh;
  border-radius: 50%;
  background-color: #D8D8D8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1vw;
`;
export default MainHeader;