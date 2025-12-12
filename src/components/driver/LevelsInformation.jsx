import "../../styles/driver/LevelsInformation.css";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import levelsData from "../../data/data-levels.json";

export function LevelsInformation({ level }) {
  const [levelsInfo, setLevelsInfo] = useState({});
  const [tabActive, setTabActive] = useState(level);

  const levels = ["basico", "silver", "black"];

  useEffect(() => {
    setLevelsInfo(levelsData.data);
  }, []);

  if (!levelsInfo[level]) {
    return <p>Cargando...</p>;
  }

  const getTabStatus = (tabLevel) => {
    const userLevelIndex = levels.indexOf(level);
    const tabLevelIndex = levels.indexOf(tabLevel);

    if (tabLevelIndex < userLevelIndex) return "completed";
    if (tabLevelIndex === userLevelIndex) return "now";
    return "future";
  };

  const statusButtons = {
    completed: (
      <button className="button-completed">Ya lograste este nivel</button>
    ),
    now: <button className="button-now">Tu nivel actual</button>,
    future: <button className="button-future">Aplica para este nivel</button>,
  };

  return (
    <>
      <h2 className="levels-title">Niveles de repartidor</h2>
      <div className="tab-levels">
        {levels.map((level, index) => (
          <button
            onClick={() => setTabActive(level)}
            className={level === tabActive ? "active" : ""}
            key={index}
          >
            Chaskys <br />
            {level === "basico" ? "Básico" : ""}
            {level === "silver" ? "Silver" : ""}
            {level === "black" ? "Black" : ""}
          </button>
        ))}
      </div>

      <div className={`levels-info-box ${getTabStatus(tabActive)}`}>
        <span className="level-section-title">REQUISITOS</span>
        <div className="levels-divider"></div>

        {levelsInfo[tabActive].requisitos.map((req, index) => (
          <div className="level-item" key={index}>
            <Icon icon="lets-icons:check-fill" width="24" height="24" />
            <p>{req}</p>
          </div>
        ))}

        <span className="level-section-title">BENEFICIOS</span>
        <div className="levels-divider"></div>

        {levelsInfo[tabActive].beneficios.map((req, index) => (
          <div className="level-item" key={index}>
            <Icon icon="lets-icons:check-fill" width="24" height="24" />
            <p>{req}</p>
          </div>
        ))}
      </div>

      {statusButtons[getTabStatus(tabActive)]}
    </>
  );
}
