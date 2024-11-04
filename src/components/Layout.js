// src/components/Layout.js
import React from 'react';
import NavigationBar from './NavigationBar';

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-white pb-20">
      {children}
      <NavigationBar />
    </div>
  );
};

export default Layout;