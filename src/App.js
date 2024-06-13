import React from 'react';
import { ROUTES } from './constants/routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SignIn from './pages/sign-in';
import SignUpAgreement from './pages/sign-up-agreement';
import SignUp from './pages/sign-up';
import SignUpSuccess from './pages/sign-up-success';
import Detail from './pages/detail';
import AuthLayout from './authLayout';
import MainLayout from './mainLayout';
import Search from './pages/search';
import Style from './pages/style';
import Post from './pages/post';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.POST}
          element={
            <MainLayout>
              <Post />
            </MainLayout>
          }
        ></Route>
        <Route
          path={ROUTES.HOME}
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path={`${ROUTES.SEARCH}/:query`}
          element={
            <MainLayout>
              <Search />
            </MainLayout>
          }
        ></Route>
        <Route
          path={ROUTES.SIGNIN}
          element={
            <AuthLayout title="">
              <SignIn />
            </AuthLayout>
          }
        />
        <Route
          path={ROUTES.SIGNUP_AGREEMENT}
          element={
            <AuthLayout title="서비스 이용 동의">
              <SignUpAgreement />
            </AuthLayout>
          }
        />
        <Route
          path={ROUTES.SIGNUP}
          element={
            <AuthLayout title="회원 정보 입력">
              <SignUp />
            </AuthLayout>
          }
        />
        <Route
          path={ROUTES.SIGNUP_SUCCESS}
          element={
            <AuthLayout title="">
              <SignUpSuccess />
            </AuthLayout>
          }
        />
        <Route
          path={ROUTES.DETAIL.replace(':postId', ':postId')} // ':postId'를 사용하는 동적 경로 설정
          element={
            <MainLayout>
              <Detail />
            </MainLayout>
          }
        />
        <Route
          path={ROUTES.STYLE}
          element={
            <MainLayout>
              <Style />
            </MainLayout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
