import { Link } from "react-router-dom";
import "./Tuto.css";

const Tuto = () => {
  return (
    <div className="tuto-page">
      <div className="container-tuto">
        <h1 className="title-tuto">Comment utiliser NutriBoom</h1>
        <div className="video">
          <iframe
            width="840"
            height="472.5"
            src="https://www.youtube.com/embed/jIkOiEaSfHI"
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
