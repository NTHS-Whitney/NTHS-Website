import React from 'react'

export const themes = {
    light: {
        foreground: '#000000',
        background: '#ffffff',
        light: true,
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
        light: false,
    }
};

export const ThemeContext = React.createContext(
    themes.light
)

export const setThemePref = (prefersDark) => {
    try {
      localStorage.setItem('theme-preference',(prefersDark?"dark":"light"))
    } catch(e) {
      console.log("Could not save theme preference")
      console.log(e)
    }
  }

export const getThemePref = () => {
    try {
      return localStorage.getItem('theme-preference')
    } catch (e) {
      console.log("Could not retrieve theme preference")
    }
    return null;
}