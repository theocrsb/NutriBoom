import "./Account.css";
import { UserContext } from "../contexts/User-Context";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const Account = () => {
  // import  du context nous permettant  de recuperer les infos de l'utilisateur connecté
  const { userCo } = useContext(UserContext);
  // verification que nous recevons bien les infos attendu
  console.log("resultat de usercontext value", userCo);
  let taille = 1.19;
  let tailleOptions = [];

  for (let i = 0; i < 111; i++) {
    taille += 0.01;
    tailleOptions.push(taille.toFixed(2));
  }
  // console.log(tailleOptions);
  let poids = 29;
  let poidsOptions = [];

  for (let i = 0; i < 121; i++) {
    poids++;
    poidsOptions.push(poids);
  }
  // console.log(poidsOptions);
  let age = 6;
  let ageOptions = [];

  for (let i = 0; i < 71; i++) {
    age++;
    ageOptions.push(age);
  }
  console.log(ageOptions);

  return (
    <div>
      <ul>
        <li>{userCo?.firstname}</li>
        <li>
          {" "}
          <input type="text" />
        </li>
        <li>{userCo?.lastname}</li>
        <li>
          {" "}
          <input type="text" />
        </li>
        <li>{userCo?.age} ans</li>
        <li>
          <select
            name="age"
            id="inputAge"
            className="htmlForm-label text-center select"
            // onChange={ageFunction}
            // value={ageState}
          >
            <option key={uuidv4()} value="">
              Sélectionner votre age{" "}
            </option>
            {ageOptions.map((ageOption) => (
              <option key={uuidv4()} value={ageOption}>
                {ageOption} ans
              </option>
            ))}
          </select>
        </li>
        <li>{userCo?.gender}</li>
        <li>
          <select
            name="gender"
            id="inputGender"
            className="htmlForm-label text-center select"
            // value={sexState}
            // onChange={sexFunction}
          >
            <option key={uuidv4()} value="">
              Sélectionner votre sexe
            </option>
            <option key={uuidv4()} value="femme">
              femme
            </option>
            <option key={uuidv4()} value="homme">
              homme
            </option>
          </select>
        </li>
        <li>{userCo?.weight} Kg</li>
        <li>
          <select
            name="weight"
            id="inputWeight"
            className="htmlForm-label select"
            // value={weightState}
            // onChange={weightFunction}
          >
            <option key={uuidv4()} value="">
              Sélectionner votre poids
            </option>
            {poidsOptions.map((poidsOption) => (
              <option key={uuidv4()} value={poidsOption}>
                {poidsOption} Kg
              </option>
            ))}
          </select>
        </li>
        <li>{userCo?.height} m</li>
        <li>
          <select
            name="height"
            id="inputHeight"
            className="htmlForm-label select"
            // value={heightState}
            // onChange={heightFunction}
          >
            <option key={uuidv4()} value="">
              Sélectionner votre taille
            </option>
            {tailleOptions.map((tailleOption) => (
              <option key={uuidv4()} value={tailleOption}>
                {tailleOption} M
              </option>
            ))}
          </select>
        </li>
        <li>{userCo?.email}</li>
        <li>
          {" "}
          <input type="text" />
        </li>
        <li>Mon mot de passe</li>
      </ul>
    </div>
  );
};
export default Account;
