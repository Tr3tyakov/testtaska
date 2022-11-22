import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import StartPage from './Components/StartPage/StartPage';
import Todo from './Components/Todo/Todo';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
