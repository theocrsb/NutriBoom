import { useContext } from "react";
import { AuthContext } from "../contexts/Auth-context";
import "./SuscribeButton.css";

const SuscribeButton = () => {
  let monToken = localStorage.getItem("accesstoken");
  const { onAuthChange } = useContext(AuthContext);
  return (
    <div>
      <button
        type="submit"
        onClick={() => onAuthChange(monToken)}
        className="btn inscription"
      >
        S'inscrire
      </button>
    </div>
  );
};
export default SuscribeButton;
