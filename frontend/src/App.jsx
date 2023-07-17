import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './SharedLayout.jsx'
import Home from './NavBar/Home/Home.jsx';
import OurTeam from './NavBar/OurTeam/OurTeam.jsx';
import Jobs from './NavBar/Jobs/Jobs.jsx';
import LogIn from './NavBar/LogIn/LogIn.jsx';
import Error from './Error.jsx';

const App = () => {

  const [job, setJob] = useState({});

  return (
    <Routes>
      <Route path='/' element={<SharedLayout job={job} />}>
        <Route index element={<Home />} />
        <Route path='our-team' element={<OurTeam />} />
        <Route path='contact-us' />
        <Route path='jobs' element={<Jobs setJob={setJob} />} />
        <Route path='log-in' element={<LogIn />} />
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default App;
