import { useEffect } from "react";
import TimmySusaiRajan from '../../assets/TimmySusaiRajan.jpg';
import './OurTeam.css';

const OurTeam = () => {

  const baseURL = import.meta.env.BASE_URL;
  const team = [...Array(8)].map(() => ({
    firstname: 'Timmy', 
    lastname: 'Susai Rajan', 
    position: 'Chief Technology Officer', 
    qualifications: 'Computer Engineering, B.S.', 
    img: TimmySusaiRajan
  }));
  let trackContainer, track, images, startPercentage, calcImgPos;

  useEffect(() => {
    trackContainer = document.getElementById('track-container');
    track = document.getElementById("image-track");
    images = track.getElementsByClassName("image");

    const handleResize = () => {
      trackContainer.style.height = `${Math.max(window.innerHeight - 89.5, track.clientHeight)}px`;
    };
    window.onresize = handleResize;

    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";  
      track.dataset.prevPercentage = track.dataset.percentage;
    }

    calcImgPos = (percent, numImgs, imgIndex) => {
      return Math.max(Math.min(
        (percent > -100 / (numImgs + 2) ? 
        0 : percent < -100 + 100 / (numImgs + 2) ? 
        -100 : (percent + 100 / (numImgs + 2)) * (numImgs + 2) / numImgs)
        + imgIndex * 100 / numImgs, 0) * numImgs, -100) + 100;
    };

    startPercentage = -200 * 100 / track.clientWidth;
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

    const handleOnFocus = () => {
      track.style.transform = `translateX(${track.dataset.prevPercentage}%)`;
      for (let i = 0; i < images.length; i++) {
        images[i].style.backgroundPosition = `${calcImgPos(track.dataset.prevPercentage, images.length, i)}% center`;
      }
    };
    window.onfocus = handleOnFocus;
  }, []);

  useEffect(() => {
    if (location.pathname === `${baseURL}our-team`) {
      document.body.style.overflowX = 'hidden';
      trackContainer.style.height = `${Math.max(window.innerHeight - 89.5, track.clientHeight)}px`;
      track.dataset.prevPercentage = startPercentage;
      track.dataset.percentage = startPercentage;
      track.style.transform = `translateX(${startPercentage}%)`;
      for (let i = 0; i < images.length; i++) {
        images[i].style.backgroundPosition = `${calcImgPos(startPercentage, images.length, i)}% center`;
      }
    }
  }, [location.pathname]);

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
          {team.map((member, index) => (
            <div key={index} className="screen">
              <div className="image" style={{backgroundImage: `url(${member.img})`}}></div>
              <div className="content">
                <span className="name">{`${member.firstname} ${member.lastname}`}</span>
                <span className="position">{`${member.position}`}</span>
                <span className="qualifications">{`${member.qualifications}`}</span>
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
