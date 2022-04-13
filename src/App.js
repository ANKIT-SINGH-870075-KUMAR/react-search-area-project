import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Table from './components/Table';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Table heading="Post Office"/>
      </div>    
    </>
  );
}

export default App;
