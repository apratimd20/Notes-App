import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    {children}
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/home',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/login',
    element: <AuthLayout><Login /></AuthLayout>,
  },
  {
    path: '/register',
    element: <AuthLayout><Register /></AuthLayout>,
  },
  {
    path: '/pastes',
    element: <Layout><Paste /></Layout>,
  },
  {
    path: '/pastes/:id',
    element: <Layout><ViewPaste /></Layout>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;