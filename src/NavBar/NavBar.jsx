import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactUs from './ContactUs/ContactUs.jsx';
import './NavBar.css';

const NavBar = () => {
  
  const buttons = [
    { name: 'Home', path: '/' },
    { name: 'Our Team', path: '/our-team' },
    { name: 'Contact Us', path: '/contact-us' },
    {
    name: 'Careers', path: '/careers',
    subMenu: [
      { name: 'Civil Law', path: '/careers/civil-law' }, 
      { name: 'Administrative Law', path: '/careers/administrative-law' }, 
      { name: 'Digital Marketing', path: '/careers/digital-marketing' }, 
      { name: 'Software Development', path: '/careers/software-development' }
      ],
    },
    { name: 'Log In', path: '/log-in' }
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
    if (location.pathname !== `${baseURL}our-team`) {
      document.body.style.overflowX = 'visible';
    }

    const navBar = document.querySelector('#main');
    const starsContainer = document.getElementById("starsContainer");
    const content = document.querySelector('#content');
    const menu = document.querySelector('.menu');
    if (menu.classList.contains('open')) {
      starsContainer.style.transition = 'transform 0.5s';
      content.style.transition = 'transform 0.5s';
      navBar.style.transition = 'transform 0.5s';
      menu.classList.remove('open');
      if (window.innerWidth > 845) {
        navBar.style.transform = `translateY(-171px)`;
        starsContainer.style.transform = `translateY(-171px)`;
        content.style.transform = `translateY(-171px)`;
      }
      else {
        navBar.style.transform = `translateY(-211px)`;
        starsContainer.style.transform = `translateY(-211px)`;
        content.style.transform = `translateY(-211px)`;
      }
      navBar.style.zIndex = '-1';
    }
  }, [location.pathname]);

  return (
    <>
      <nav>
        <ul id="main">
          {buttons.map(button => {
            const handleMouseEnter = () => {
              if (button.name === "Careers") {
                document.querySelector('.drop').scrollTop = 0;
              }
            };

            const handleClick = (event) => {
              if (event.target === event.currentTarget) {
                navigate(button.path);
              }
            };

            return (
              <li key={button.name} onClick={handleClick} onMouseEnter={handleMouseEnter}>
                {button.name}
                {button.subMenu && (
                  <ul className="drop">
                    <div>
                      {button.subMenu.map(sub => {
                        return (
                          <li key={sub.name} onClick={() => navigate(sub.path)}>
                            <div>
                              {sub.name}
                            </div>
                          </li>
                        );
                      })}
                    </div>
                  </ul>
                )}
              </li>
            );
          })}
          <div id="marker" ref={markerRef}></div>
        </ul>
      </nav>
      <ContactUs />
    </>
  );
};

export default NavBar;
