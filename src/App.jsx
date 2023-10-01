import './App.css';

import { Route, Routes } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import CourseList from './Pages/Course/CourseList';
import Contact from './Pages/Contact';
import Denied from './Pages/Denied';
import CourseDescription from './Pages/Course/CourseDescription';
import RequiredAuth from './Components/Auth/RequiredAuth';
import CreateCourse from './Pages/Course/CreateCourse';
import Profile from './Pages/User/Profile';
import EditProfile from './Pages/User/EditProfile';
import ChangePassword from './Pages/User/ChangePassword';
import ForgotPassword from './Pages/User/ForgotPassword';
import ResetPassword from './Pages/User/ResetPassword';
import VerifyEmail from './Pages/VerifyEmail';
import Checkout from './Pages/Payment/Checkout';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess';
import CheckoutFail from './Pages/Payment/CheckoutFail';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} ></Route>
      <Route path='/about' element={<AboutUs />} ></Route>
      <Route path='/courses' element={<CourseList />} ></Route>
      <Route path='/course/description/' element={<CourseDescription />} ></Route>
      <Route path='/contact' element={<Contact />} ></Route>
      <Route path='/verify-email' element={<VerifyEmail />} ></Route>
      <Route path='/denied' element={<Denied />} ></Route>
      <Route path='/forgot-password' element={<ForgotPassword />}></Route>
      <Route path='/reset-password/:resetToken' element={<ResetPassword />}></Route>

      <Route path='/signup' element={<SignUp />} ></Route>
      <Route path='/login' element={<Login />} ></Route>

      <Route element={<RequiredAuth allowedRoles={["ADMIN"]} />}>
        <Route path='/course/create' element={<CreateCourse />}></Route>
      </Route>
      <Route element={<RequiredAuth allowedRoles={["ADMIN","USER"]} />}>
      <Route path='/user/profile' element={<Profile />}></Route>
      <Route path='/user/edit-profile' element={<EditProfile />}></Route>
      <Route path='/change-password' element={<ChangePassword />}></Route>
      <Route path='/checkout' element={<Checkout />}></Route>
      <Route path='/checkout/success' element={<CheckoutSuccess />}></Route>
      <Route path='/checkout/fail' element={<CheckoutFail />}></Route>
      </Route>

      <Route path='*' element={<NotFound />} ></Route>
    </Routes>
    </>
  )
}

export default App
