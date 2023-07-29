import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactUs from './ContactUs/ContactUs.jsx';
import './NavBar.css';

const NavBar = ({ user }) => {
  
  const buttons = [
    { name: 'Home', path: '/' },
    { name: 'Our Team', path: '/our-team' },
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'Jobs', path: '/jobs' },
    user ? { name: 'My Account', path: '/account' } : { name: 'Log In', path: '/log-in' }
  ];
  const baseURL = import.meta.env.BASE_URL;
  const markerRef = useRef(null);
  const navigate = useNavigate();

  function updateMarker(i) {
    markerRef.current.setAttribute('style', `transform: translate(${i * 100}%, 0)`);
  }

  useEffect(() => {
    let index = 0;
    if (location.pathname !== `${baseURL}`) {
      index = buttons.slice(1).findIndex(button => location.pathname.includes(button.path)) + 1;
    }
    updateMarker(index);
    
    document.body.classList.add('show');

    const navBar = document.querySelector('#main');
    const starsContainer = document.getElementById("starsContainer");
    const content = document.querySelector('#content');
    const menu = document.querySelector('.menu');
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      navBar.style.transform = `translateY(-90px)`;
      starsContainer.style.transform = `translateY(-90px)`;
      content.style.transform = `translateY(-90px)`;
      navBar.style.zIndex = '-1';
    }
  }, [location.pathname]);

  return (
    <>
      <nav>
        <ul id="main">
          {buttons.map(button => (
            <li key={button.name} onClick={() => navigate(button.path)}>
              {button.name}
            </li>
          ))}
          <div id="marker" ref={markerRef}></div>
        </ul>
      </nav>
      <ContactUs />
    </>
  );
};

export default NavBar;
