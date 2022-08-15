import { useState } from 'react'
import { Link,Outlet } from 'react-router-dom'
import { themes, ThemeContext, setThemePref, getThemePref} from './Contexts/theme-context'
import { DataContext } from './Contexts/data-context'
//import './App.css'
import Navbar from './Components/Navbar/Navbar';
import { Announcement } from './Components/Announcement/Announcement';
import { useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState(themes.light)
  const [data, setData] = useState(null)
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark)
    setThemePref(theme !== themes.dark)
    document.body.style.backgroundColor = theme.light ? 'var(--light)' : 'var(--dark)'
  }

  useEffect(() => {
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      const pref = getThemePref()
      //override with light pref
      if (pref && pref==="light"){
        setThemePref(false)
      } else {
        setTheme(themes.dark);
        setThemePref(true)
      }
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',() => toggleTheme)

      if(theme.light){
        document.body.style = 'transition: background-color 0.35s cubic-bezier(0.445, 0.05, 0.55, 0.95); background-color: var(--light)'
      } else {
        document.body.style = 'transition: background-color 0.35s cubic-bezier(0.445, 0.05, 0.55, 0.95); background-color: var(--dark)'
      }
      return window.matchMedia('(prefers-color-scheme: dark')?.removeEventListener('change',() => toggleTheme)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://script.google.com/macros/s/AKfycbxLksJ9ZxMfOlOsUHvAcsMtnJ6vj2uHYuV_hjrfA0a0XVci8bQZZqodicYEor47-KAX/exec?type=bulk')
      const json = await data.json()
      setData(json)
    }
    fetchData()
  }, [])

  if (window.location.host.split(".")[0] === "dashboard") {
    return (
      <>
        <h1>Nothing to see here...yet</h1>
      </>
    )
  }

  return (
    <div id="app" className={(theme.light ? "" : "dark") + (((data && !data.announcement?.includes(null)) && showAnnouncement) ? "" : " no-announcement")}>
      <ThemeContext.Provider value={theme}>
        {showAnnouncement && data && data.announcement && !data.announcement.includes(null) &&
          <Announcement link={<Link to={data.announcement[1]}>Learn More</Link>} close={() => setShowAnnouncement(false)}>
            <h1>{data.announcement[0]}</h1>
          </Announcement>
        }
        <Navbar changeTheme={toggleTheme}/>
        <DataContext.Provider value={data}>
          <Outlet />
        </DataContext.Provider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
