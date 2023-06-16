import { useEffect } from 'react';
import './Menu.css';

const Menu = () => {

  useEffect(() => {
    const menu = document.querySelector('.menu');
    const navBar = document.querySelector('#main');
    const content = document.querySelector('#content');
    const starsContainer = document.getElementById("starsContainer");
    let timeoutID;

    function transform() {
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
    transform();

    menu.addEventListener('click', function() {
      this.classList.toggle('open');
      if (this.classList.contains('open')) {
        navBar.style.transition = 'transform 0.5s';
        starsContainer.style.transition = 'transform 0.5s';
        content.style.transition = 'transform 0.5s';
        navBar.style.transform = 'translateY(0px)';
        starsContainer.style.transform = 'translateY(0px)';
        content.style.transform = 'translateY(0px)';
        timeoutID = setTimeout(function() {
          navBar.style.zIndex = '0';
        }, 500);
      }
      else {
        clearTimeout(timeoutID);
        transform();
      }
    });

    window.addEventListener('resize', function() {
      if (!menu.classList.contains('open')) {
        starsContainer.style.transition = 'none';
        content.style.transition = 'none';
        navBar.style.transition = 'none';
        transform();
      }
    });
  }, []);

  return (
    <div className="menu">
      <div className="icon"></div>
    </div>
  );
};

export default Menu;
