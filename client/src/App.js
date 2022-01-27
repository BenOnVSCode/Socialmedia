import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import Login from './Components/Login';
import Register from './Components/Register';
import Loading from './Components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import { useEffect } from 'react';
import { AuthCheck } from './actions/auth';
import Home from './Components/Home';
import SinglePost from './Components/SinglePost';
import Profile from './Components/Profile';

function App() {
  const loggedIn = useSelector(state => state.auth.loggedIn)
  const loading = useSelector(state => state.auth.loading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(AuthCheck())
  }, [])
  return (
    <ChakraProvider>
      {
        loading ? (
          <Loading />
        ) : (
          <Routes>
            {
              loggedIn ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/posts/:id" element={<SinglePost />} />
                  <Route path="/profile" element={<Profile />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<Login />} />
                </>
              )
            }
          </Routes>
        )
      }
    </ChakraProvider>
  );
}

export default App;
