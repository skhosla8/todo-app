// Base Imports
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
// Icons/Images
import backgroundImgDark from '../assets/bg-desktop-dark.jpg';
import backgroundImgLight from '../assets/bg-desktop-light.jpg';
import iconMoon from '../assets/icon-moon.svg';
import iconSun from '../assets/icon-sun.svg';

const Header = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleColorTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    return (
        <div className='header'>
            <img src={theme === 'dark' ? backgroundImgDark : backgroundImgLight} alt='background-img' />

            <div>
                TODO
                <img src={theme === 'dark' ? iconSun : iconMoon} alt='color-theme-icon' onClick={toggleColorTheme} data-cy='color-theme-switch' />
            </div>
        </div>
    )
}

export default Header;