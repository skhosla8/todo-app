// Base Imports 
import React, { useContext } from 'react';
import './sass/App.scss';
import { ThemeContext } from './context/ThemeContext';
// Components
import Header from './components/Header';
import ToDoList from './components/ToDoList';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app body-${theme}`} data-cy='body-bg'>
      <Header />
      <ToDoList />
    </div>
  )

}

export default App;
