import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import './JobInfo.css';

const JobInfo = ({ job, user, appliedJobs, setAppliedJobs }) => {

  const navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = () => {
      const popUp = document.getElementById('pop-up');
      if (window.getComputedStyle(popUp).zIndex == 10) {
        popUp.style.zIndex = -1;
        popUp.firstChild.style.visibility = 'hidden';
        document.getElementById('content').style.userSelect = 'auto';
        document.body.style.overflowY = 'scroll';
      }
    };
  }, []);

  useEffect(() => {
    document.getElementById('description').innerText = job.description?.replace(/\t/g, '\u00A0'.repeat(4));
  }, [job]);

  return (
    <div id="pop-up" onScroll={(e) => document.documentElement.scrollLeft = e.target.scrollLeft}>
      <div id="job-info">
        <div id="job-info-card">
          <div>
            <div>
              <div>
                <div>
                  <div>
                    {job.title}
                  </div>
                </div>
                <div>
                  <div onClick={e => {
                    window.getSelection().removeAllRanges()
                    e.currentTarget.firstChild.blur();
                    setTimeout(() => {
                      const popUp = document.getElementById('pop-up');
                      popUp.style.zIndex = -1;
                      popUp.firstChild.style.visibility = 'hidden';
                      const content = document.getElementById('content');
                      content.querySelectorAll('button').forEach(button => {
                        button.tabIndex = 1;
                      });
                      content.style.userSelect = 'auto';
                      document.body.style.overflowY = 'scroll';
                    }, 200);
                  }}>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="23.5" height="23.5" fill="currentColor" className="bi bi-x" viewBox="1.5 1.5 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div onClick={() => window.getSelection().removeAllRanges()}>
                <div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                    </svg>
                    {job.type}
                  </div>
                </div>
                <div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                      <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                    {job.domain}
                  </div>
                </div>
                <div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    {job.location}
                  </div>
                </div>
              </div>
            </div>
            <div id='description'></div>
            <div onClick={e => {
              e.currentTarget.firstChild.blur();
              window.getSelection().removeAllRanges();
              if (user) {
                const promise = appliedJobs.includes(job.id) ?
                  UserService.withdrawApplication(user.id, job.id) : 
                  UserService.applyToJob(user.id, job.id);
                promise.then(res => {
                  setAppliedJobs(res.data);
                  console.log(res);
                })
                .catch(error => {
                  console.error(error);
                });
              }
              else {
                setTimeout(() => navigate('/log-in'), 150);
              }
            }}>
              <button>
                {appliedJobs.includes(job.id) ? "Withdraw Application" : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
