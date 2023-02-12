import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import Loading from './Components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import { useEffect } from 'react';
import { CheckLogin } from './redux/actions/auth';
import Signin from './Components/SignIn';
import Signup from './Components/SignUp';
import ForgotPasswordForm from './Components/Forget';
import VerifyEmail from './Components/Verify';
import CheckLink from './Components/CheckLink';
import ResetPassword from "./Components/NewPassword"
import Home from "./Components/Home"
import Profile from './Components/Profile';
import SinglePost from './Components/SinglePost';

function App() {
  const { loggedIn, username, loading} = useSelector(state => state.auth)
  const postsLoading= useSelector(state => state.posts.loading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(CheckLogin())
  }, [])
  return (
    <ChakraProvider>
      {
        loading ? (
          <Loading />
        ) : (
          <Routes>
            {loggedIn ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Signin />} />}
            {loggedIn ? <Route path="/signup" element={<Navigate to="/" />} /> : <Route path="/signUp" element={<Signup />} />}
            {loggedIn ? <Route path="/forgot" element={<Navigate to="/" />} /> : <Route path="/forgot" element={<ForgotPasswordForm />} />}
            {loggedIn ? <Route path="/verify/:email" element={<Navigate to="/" />}  /> : <Route path="/verify/:email" element={<VerifyEmail />}  />}
            {loggedIn ? <Route path="/changepassword/:email/:code" element={<Navigate to="/" />} /> : <Route path="/changepassword/:email/:code" element={<ResetPassword />} />}
            {loggedIn ? <Route path="/recover/:email/:code" element={<Navigate to="/" />} /> :<Route path="/recover/:email/:code" element={<CheckLink />} />}
            {loggedIn ? <Route path="/profile" element={<Profile />} /> : <Route path="/profile" element={<Navigate to="/" />} />}
            {loggedIn ? <Route path="/posts/:id" element={<SinglePost /> } /> : <Route path="/posts/:id" element={<Navigate to="/" /> } />}
           
          </Routes>
        )
      }
    </ChakraProvider>
  );
}

export default App;
