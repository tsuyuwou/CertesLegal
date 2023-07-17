import { useEffect, useState } from "react";
import EmployeeService from '../../services/EmployeeService';
import './OurTeam.css';

const OurTeam = () => {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    EmployeeService.getEmployees().then(res => {
      setEmployees(res.data);
    }).catch(error => {
      console.error('Error fetching employees:', error);
    });
  }, []);

  useEffect(() => {
    const trackContainer = document.getElementById('track-container');
    const track = document.getElementById("image-track");
    const images = track.getElementsByClassName("image");

    const handleResize = () => {
      trackContainer.style.height = `${Math.max(window.innerHeight - 89.5, track.clientHeight)}px`;
    };
    handleResize();
    window.onresize = handleResize;

    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";  
      track.dataset.prevPercentage = track.dataset.percentage;
    }

    const calcImgPos = (percent, numImgs, imgIndex) => {
      return Math.max(Math.min(
        (percent > -100 / (numImgs + 2) ? 
        0 : percent < -100 + 100 / (numImgs + 2) ? 
        -100 : (percent + 100 / (numImgs + 2)) * (numImgs + 2) / numImgs)
        + imgIndex * 100 / numImgs, 0) * numImgs, -100) + 100;
    };

    const startPercentage = -200 * 100 / track.clientWidth;
    const endPercentage = -100 - startPercentage;

    const handleOnMove = e => {
      if(track.dataset.mouseDownAt === "0") return;
      
      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;
      
      const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
      
      let nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
      if (nextPercentage < endPercentage) {
        nextPercentage = endPercentage;
      }
      else if (nextPercentage > startPercentage) {
        nextPercentage = startPercentage;
      }
      track.dataset.percentage = nextPercentage;
      
      track.animate({
        transform: `translateX(${nextPercentage}%)`
      }, { duration: 1200, fill: "forwards" });

      for (let i = 0; i < images.length; i++) {
        images[i].animate({
          backgroundPosition: `${calcImgPos(nextPercentage, images.length, i)}% center`
        }, { duration: 1200, fill: "forwards" });
      }
    }

    trackContainer.onmousedown = e => handleOnDown(e);
    trackContainer.ontouchstart = e => handleOnDown(e.touches[0]);
    trackContainer.onmouseup = e => handleOnUp(e);
    trackContainer.ontouchend = e => handleOnUp(e.touches[0]);
    trackContainer.onmousemove = e => handleOnMove(e);
    trackContainer.ontouchmove = e => handleOnMove(e.touches[0]);

    const handleOnFocus = percent => {
      track.style.transform = `translateX(${percent}%)`;
      for (let i = 0; i < images.length; i++) {
        images[i].style.backgroundPosition = `${calcImgPos(percent, images.length, i)}% center`;
      }
    };
    handleOnFocus(startPercentage);
    window.onfocus = () => handleOnFocus(track.dataset.prevPercentage);

    track.dataset.prevPercentage = startPercentage;
  }, [employees]);

  return (
    <div id="track-container">
      <div>
        <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0" data-percentage="0">
          <div className="left-arrow">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
          </div>
          {employees.map(employee => (
            <div key={employee.id} className="screen">
              <div className="image" style={{backgroundImage: `url(/src/assets/employees/${(employee.firstName + employee.lastName).replace(/\s/g, '')}.jpg)`}}></div>
              <div className="content">
                {employee.firstName.length + employee.lastName.length + 1 <= 20 ? (
                    <span className="name">{`${employee.firstName} ${employee.lastName}`}</span>
                ) : (
                  <>
                    <span className="name">{`${employee.firstName}`}</span>
                    <span className="name">{`${employee.lastName}`}</span>
                  </>
                )}
                <span className="position">{`${employee.position}`}</span>
                {employee.qualifications ? <span className="qualifications">{`${employee.qualifications}`}</span> : null}
              </div>
            </div>
          ))}
          <div className="right-arrow">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
