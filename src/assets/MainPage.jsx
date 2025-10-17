import React from "react";
import { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

/* check if button is active or more is hovered, maybe with refs?? and if it is return */

function MainPage() {
  const [mainData, setMainData] = useState([]);
  const [showed, setShowed] = useState({});
  const isHovered = useRef(false);

 

  const random = () => {
    return Math.floor(Math.random() * 20);
  };

  useEffect(() => {
    fetch("./selected.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setMainData(data);
        console.log(random());
        setShowed(data[random()]);
      });
  }, []);

  useEffect( () => {
 const interval = setInterval(() => {
    if( !isHovered.current) {
      setShowed((prev) => {
        const newInd = random();
        if (mainData[newInd] == prev) {
          return prev;
        }
        return mainData[newInd];
      });

    }
  }, 5000);

  
  return () => clearInterval(interval);
  }, [mainData])

  const handleScroll = () => {
    console.log("scrolled")
  }


  return (
    < div onScroll = {handleScroll}>
      <div
        className="imageDiv"
        style={{ background: `url(${showed?.wallpaper_url})` }}
        >
        <div className="blurredDiv"></div>
        <div className="mainDiv">
          <div className="mainTitle">{showed?.name}</div>
          <div className="mainProducers">
            {showed?.producers?.map((prod, id) => {
              return id === showed.producers.length - 1
                ? prod + " "
                : prod + " - ";
            })}
          </div>
          <div className="mainClock">
            <FontAwesomeIcon icon={faClock} /> {showed?.time}
          </div>
          <div className="mainDesc">{showed?.description}</div>
          <button className="mainWatch" onMouseOver={() => isHovered.current = true}
        onMouseOut={() => isHovered.current = false}
      >Watch Now</button>
          <div className="mainMore" onMouseOver={() => isHovered.current = true}
        onMouseOut={() => isHovered.current = false}
      >More Details</div>
          <div className="mainStar">
            <FontAwesomeIcon icon={faStar} /> {showed?.stars}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
