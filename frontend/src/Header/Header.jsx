import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu/Menu.jsx';
import logo from '../assets/logo.png';
import './Header.css';

const Header = ({ error = false }) => {

  useEffect(() => {
    const root = document.getElementById('root');
    root.style.height = `${window.innerHeight}px`;
    window.addEventListener('resize', function() {
      root.style.height = `${window.innerHeight}px`;
    });
    document.body.onscroll = () => {
      document.getElementById('pop-up').scrollLeft = document.documentElement.scrollLeft;
    };
  }, []);

  return (
    <div id="header">
      <Link to='/' tabIndex={-1}>
        <img id="gavel" src={logo} />
        <h1>Certes LEGAL</h1>
      </Link>
      {!error && <Menu />}
    </div>
  );
};

export default Header;
