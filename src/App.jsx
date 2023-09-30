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

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} ></Route>
      <Route path='/about' element={<AboutUs />} ></Route>
      <Route path='/courses' element={<CourseList />} ></Route>
      <Route path='/course/description/' element={<CourseDescription />} ></Route>
      <Route path='/contact' element={<Contact />} ></Route>
      <Route path='/denied' element={<Denied />} ></Route>

      <Route path='/signup' element={<SignUp />} ></Route>
      <Route path='/login' element={<Login />} ></Route>

      <Route element={<RequiredAuth allowedRoles={["ADMIN"]} />}>
        <Route path='/course/create' element={<CreateCourse />}></Route>
      </Route>
      <Route element={<RequiredAuth allowedRoles={["ADMIN","USER"]} />}>
      <Route path='/user/profile' element={<Profile />}></Route>
      </Route>

      <Route path='*' element={<NotFound />} ></Route>
    </Routes>
    </>
  )
}

export default App
