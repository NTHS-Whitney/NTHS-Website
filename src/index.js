import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route, Navigate, Outlet } from 'react-router-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './util/reportWebVitals';
import AutoRedirect from './Components/AutoRedirect/AutoRedirect';
import MarkdownArticle from './Components/MarkdownArticle/MarkdownArticle'
import Home from './Routes/Home/Home'
import Opportunities from './Routes/Opportunities/Opportunities';
import Clubs from './Routes/Clubs/Clubs';
import Contact from './Routes/Contact/Contact'
import Join from './Routes/Membership/Join';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<Outlet />}>
              <Route path="" element={<MarkdownArticle name="About/about.md"/>}/>
              <Route path="leadership" element={<MarkdownArticle name="About/leadership.md"/>}/>
            </Route>
            <Route path="membership" element={<Outlet />}>
              <Route path="" element={<Navigate to="join"/>}/>
              <Route path="join" element={<Join/>}/>
              <Route path="benefits" element={<MarkdownArticle name="Membership/benefits.md"/>}/>
              <Route path="bylaws" element={<MarkdownArticle name="Membership/bylaws.md"/>}/>
              <Route path="criteria" element={<MarkdownArticle name="Membership/criteria.md"/>}/>
            </Route>
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="clubs" element={<Outlet />}>
              <Route path="" element={<Clubs />}/>
              <Route path="join" element={<MarkdownArticle name="Clubs/join.md" />}/>
            </Route>
            <Route path="contact" element={<Contact />}/> 
            <Route path="*" element={<AutoRedirect delay={5000}/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
