import { useEffect } from 'react';
import Header from './Header/Header.jsx';

const Error = () => {

  useEffect(() => {
    document.body.classList.add('show');
  }, []);

  return (
    <>
      <Header error={true}/>
      <div style={{width: '95%', margin: 'auto'}}>
        <p style={{textAlign: 'left'}}>
          <span style={{color: 'lightblue', backgroundColor: 'black', padding: '0 4px', borderRadius: '4px'}}>
            404.
          </span> That's an error.
        </p>
        <p style={{textAlign: 'left'}}>
          The requested URL {location.pathname} was not found on this server. <br /> That's all we know.
        </p>
      </div>
    </>
  );
};

export default Error;
