import { useState, useEffect } from 'react';
import { useMediaQuery } from '@material-ui/core';

function useDarkMode() {
  const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' ? true : preferDarkMode ? true : false
  );

  const handleDarkMode = () => {
    setDarkMode(darkMode => {
      const newDarkMode = !darkMode;
      localStorage.setItem('darkMode', newDarkMode);
      return newDarkMode;
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('darkMode')) {
    setDarkMode(preferDarkMode);
    }
  }, [preferDarkMode]);
  
  return [darkMode, handleDarkMode];
}

export default useDarkMode;
