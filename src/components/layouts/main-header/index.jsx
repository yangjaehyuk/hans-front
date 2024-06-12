import React from 'react';
import styled from 'styled-components';
import { LogoutOutlined, SearchOutlined } from '@ant-design/icons';

const NavBar = () => {
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
            👤
          </span>
        </ProfileImage>
        <span>yangjaehyuk_</span>
      </Profile>
    </Navbar>
  );
};

const Navbar = styled.div`
  width: 100vw;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1vh 2vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 0 auto;
  margin-top: 2vh;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
`;

const Logo = styled.div`
  font-size: 4vh;
  font-weight: bold;
  // margin-right: 2vw;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3vw;
  justify-content: center;
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
  display: flex;
  align-items: center;
  gap: 0.5vw;
  margin-left: 2vw;
`;

const ProfileImage = styled.div`
  width: 4vh;
  height: 4vh;
  border-radius: 50%;
  background-color: #d8d8d8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1vw;
`;
export default NavBar;
