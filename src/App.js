import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SignIn from './pages/sign-in';
import SignInAgreement from './pages/sign-up-agreement';
import AuthLayout from './authLayout';
import { ROUTES } from './constants/routes';
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
          path={ROUTES.SIGNIN_AGREEMENT}
          element={
            <AuthLayout title="서비스 이용 동의">
              <SignInAgreement />
            </AuthLayout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
