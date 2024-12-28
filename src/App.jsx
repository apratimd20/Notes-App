import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
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
