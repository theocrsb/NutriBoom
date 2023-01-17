import { Link } from "react-router-dom";
import "./Tuto.css";

const Tuto = () => {
  return (
    <div className="tuto-page">
      <div className="container-tuto">
        <h1 className="title-tuto">Comment utiliser NutriBoom</h1>
        <div className="video">
          <iframe
            width="1008"
            height="567"
            src="https://www.youtube.com/embed/vxiaHWhHMjU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Tuto;
