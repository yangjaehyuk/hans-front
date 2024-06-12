import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SignIn from './pages/sign-in';
import SignUpAgreement from './pages/sign-up-agreement';
import SignUp from './pages/sign-up';
import AuthLayout from './authLayout';
import { ROUTES } from './constants/routes';
import SignUpSuccess from './pages/sign-up-success';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
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
        ></Route>
        <Route
          path={ROUTES.SIGNUP}
          element={
            <AuthLayout title="회원 정보 입력">
              <SignUp />
            </AuthLayout>
          }
        ></Route>
        <Route
          path={ROUTES.SIGNUP_SUCCESS}
          element={
            <AuthLayout title="">
              <SignUpSuccess />
            </AuthLayout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
