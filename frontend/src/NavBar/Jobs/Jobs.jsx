import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobService from '../../services/JobService';
import UserService from '../../services/UserService';
import './Jobs.css';

const Arrow = () => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
      </svg>
    </div>
  );
};

const Jobs = ({ setJob, user }) => {

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selections, setSelections] = useState({});
  const [filters, setFilters] = useState({});
  const clearSelections = () => {
    setSelections(Object.fromEntries(Object.keys(filters).map(key => [key, '— —'])));
  };

  useEffect(() => {
    JobService.getFilters().then(({ data }) => {
      for (const value of Object.values(data)) {
        value.push('— —');
      }
      setFilters(data);
    }).catch(error => {
      console.error('Error fetching filters:', error);
    });

    JobService.getJobs({}).then(res => {
      setJobs(res.data);
    }).catch(error => {
      console.error('Error fetching jobs:', error);
    });
  }, []);

  useEffect(clearSelections, [filters]);

  useEffect(() => {
    const handleResize = () => {
      const jobsContainer = document.getElementById('jobs-container');
      const numJobCards = Math.max(2, Math.min(4, Math.floor((0.95 * window.innerWidth + 12.5) / 243.75)));
      jobsContainer.style.gridTemplateColumns = `repeat(${numJobCards}, 1fr)`;
      jobsContainer.style.width = `${numJobCards * 243.75 - 12.5}px`;
      document.getElementById('search-bar').style.width = `${jobsContainer.clientWidth}px`;
    };
    handleResize();
    window.onresize = handleResize;
    return () => window.onresize = null;
  }, [jobs]);

  return (
    <div id="job-search">
      <div id="search-bar">
        {Object.keys(filters).length === 0 ? null : (<>
          <ul id="filters" onClick={() => window.getSelection().removeAllRanges()}>
            {Object.entries(filters).map(([filter, options]) => {
              return (
                <li key={filter} onMouseEnter={e => e.currentTarget.querySelector('.drop').scrollTop = 0}>
                  {filter.replace(/\b\w/g, match => match.toUpperCase())}
                  <hr style={{ border: 'none', height: '2px', backgroundColor: 'white' }} />
                  {selections[filter]}
                  <ul className="drop">
                    <div>
                      {options.map(option => {
                        return (
                          <li key={option} onClick={
                            () => setSelections(prevState => ({...prevState, [filter]: option}))
                          }>
                            {option}
                          </li>
                        );
                      })}
                    </div>
                  </ul>
                </li>
              );
            })}
            <Arrow />
            <Arrow />
            <Arrow />
          </ul>
          <div>
            <div style={{height: '77px', borderBottom: '2px solid white'}} onClick={() => {
              JobService.getJobs({}).then(res => {
                setJobs(res.data);
              }).catch(error => {
                console.error('Error fetching jobs:', error);
              });
              clearSelections();
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg>
            </div>
            <div style={{height: '122.5px'}} onClick={() => {
              JobService.getJobs({...selections}).then(res => {
                setJobs(res.data);
              }).catch(error => {
                console.error('Error fetching jobs:', error);
              });
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </div>
          </div>
        </>)}
      </div>
      <div id="jobs-container">
        {jobs.map((job, idx) => {
          return (
            <div key={idx} className="job-card">
              <div>
                <div>{job.title}</div>
                <div onClick={() => window.getSelection().removeAllRanges()}>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                    </svg>
                    {job.type}
                  </div>
                  <br />
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                      <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                    {job.domain}
                  </div>
                  <br />
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    {job.location}
                  </div>
                  <div>
                    <button onClick={() => {
                      setJob(jobs[idx]);
                      const popUp = document.getElementById('pop-up');
                      popUp.style.zIndex = 10;
                      const jobInfo = popUp.firstChild;
                      jobInfo.style.visibility = 'visible';
                      setTimeout(() => jobInfo.style.height = `max(calc(${getComputedStyle(jobInfo.firstChild).height} + 25px), 100vh)`, 0);
                      window.getSelection().removeAllRanges();
                      document.getElementById('content').style.userSelect = 'none';
                      document.body.style.overflowY = 'hidden';
                    }}>Learn More</button>
                    <button onClick={() => {
                      if (user) {
                        UserService.applyToJob(user.id, job.id).then(res => {
                          console.log(res);
                        }).catch(error => {
                          console.error(error);
                        });
                      }
                      else {
                        navigate('/log-in');
                      }
                    }}>Apply Now</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
  
export default Jobs;
