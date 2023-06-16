import { Routes, Route } from 'react-router-dom';
import SharedLayout from './SharedLayout.jsx'
import Home from './NavBar/Home/Home.jsx';
import OurTeam from './NavBar/OurTeam/OurTeam.jsx';
import Careers from './NavBar/Careers/Careers.jsx';
import CivilLaw from './NavBar/Careers/CivilLaw/CivilLaw.jsx';
import AdministrativeLaw from './NavBar/Careers/AdministrativeLaw/AdministrativeLaw.jsx';
import DigitalMarketing from './NavBar/Careers/DigitalMarketing/DigitalMarketing.jsx';
import SoftwareDevelopment from './NavBar/Careers/SoftwareDevelopment/SoftwareDevelopment.jsx';
import LogIn from './NavBar/LogIn/LogIn.jsx';
import Error from './Error.jsx';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path='our-team' element={<OurTeam />} />
        <Route path='contact-us' />
        <Route path='careers'>
          <Route index element={<Careers />} />
          <Route path='civil-law' element={<CivilLaw />} />
          <Route path='administrative-law' element={<AdministrativeLaw />} />
          <Route path='digital-marketing' element={<DigitalMarketing />} />
          <Route path='software-development' element={<SoftwareDevelopment />} />
        </Route>
        <Route path='log-in' element={<LogIn />} />
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default App;
