import { Outlet } from 'react-router-dom';
import Header from './Header/Header.jsx';
import NavBar from './NavBar/NavBar.jsx';

const SharedLayout = () => {

  return (
    <>
      <Header />
      <NavBar />
      <div id="content">
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;
