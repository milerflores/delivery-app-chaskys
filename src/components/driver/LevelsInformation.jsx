import "../../styles/driver/LevelsInformation.css";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export function LevelsInformation({ level }) {
  const [levelsInfo, setLevelsInfo] = useState({});
  const [tabActive, setTabActive] = useState(level);

  const levels = ["basico", "silver", "black"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/data-levels.json");
        if (!response.ok) {
          alert("no se encontró el archivo");
        }
        const { data } = await response.json();
        setLevelsInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!levelsInfo[level]) {
    return <p>Cargando...</p>;
  }

  const getTabStatus = (tabLevel) => {
    const userLevelIndex = levels.indexOf(level);
    const tabLevelIndex = levels.indexOf(tabLevel);

    if (tabLevelIndex < userLevelIndex) return "completed";
    if (tabLevelIndex === userLevelIndex) return "now";
    if (tabLevelIndex > userLevelIndex) return "future";
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
            <span>
              <Icon icon="lets-icons:check-fill" width="24" height="24" />
            </span>
            <p>{req}</p>
          </div>
        ))}

        <span className="level-section-title">BENEFICIOS</span>

        <div className="levels-divider"></div>

        {levelsInfo[tabActive].beneficios.map((req, index) => (
          <div className="level-item" key={index}>
            <span>
              <Icon icon="lets-icons:check-fill" width="24" height="24" />
            </span>
            <p>{req}</p>
          </div>
        ))}
      </div>
      {statusButtons[getTabStatus(tabActive)]}
    </>
  );
}
