import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { themes, ThemeContext, setThemePref, getThemePref} from './Contexts/theme-context'
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import { Announcement } from './Components/Announcement/Announcement';
import { useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState(themes.light)
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark)
    setThemePref(theme !== themes.dark)
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
      return window.matchMedia('(prefers-color-scheme: dark').removeEventListener('change',() => toggleTheme)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (window.location.host.split(".")[0] === "dashboard") {
    return (
      <>
        <h1>Nothing to see here...yet</h1>
      </>
    )
  }

  return (
    <div>
      <ThemeContext.Provider value={theme}>
        {showAnnouncement && 
          <Announcement link={<a href="https://google.com">Learn More</a>} close={() => setShowAnnouncement(false)}>
            <h1>We're looking for dedicated students to serve on our board!</h1>
          </Announcement>
        }
        <Navbar changeTheme={toggleTheme}/>
        <h1>hi</h1>
        <div id="test">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero laborum sequi alias, porro tempore debitis quibusdam temporibus corporis voluptatem adipisci ex non rem voluptates excepturi nobis, blanditiis maxime corrupti cum? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque atque natus voluptates tempora, officiis ipsa nam aliquam sint earum! Ratione veritatis eum accusantium consequuntur autem! Debitis enim magni voluptates architecto! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt ex tenetur illo nam non architecto blanditiis maxime dolorum a ab nisi dicta, magnam ut suscipit quibusdam, quidem nulla obcaecati recusandae?</div>
        <Outlet />
      </ThemeContext.Provider>
    </div>
  )
}

export default App
