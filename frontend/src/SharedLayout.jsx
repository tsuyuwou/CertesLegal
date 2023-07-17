import { Outlet } from 'react-router-dom';
import Header from './Header/Header.jsx';
import NavBar from './NavBar/NavBar.jsx';
import JobInfo from './NavBar/Jobs/JobInfo.jsx';

const SharedLayout = ({ job }) => {

  return (
    <>
      <Header />
      <NavBar />
      <div id="content">
        <Outlet />
      </div>
      <JobInfo job={job} />
    </>
  );
};

export default SharedLayout;
