import React from "react";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";



function MainPage() {
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    fetch("./src/selected.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setMainData(data);
      });
  }, []);

  return (
    <>
      <div className="imageDiv" style={{background: `url(${mainData[0]?.wallpaper_url})`}}>
        <div className="blurredDiv"></div>
        <div className="mainDiv">
            <div className="mainTitle">
                {mainData[0]?.name}
            </div>
            <div className="mainProducers">
                {
                    mainData[0]?.producers.map(prod => {
                        return prod  + " ";
                    })
                }
            </div>
            <div className="mainClock">
               <FontAwesomeIcon icon={faClock}/> {mainData[0]?.time}
            </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
