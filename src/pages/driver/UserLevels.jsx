import { HeaderVolver } from "../../components/shared/HeaderVolver";
import { LogoChaskys } from "../../components/shared/LogoChaskys";
import { UserLevelsBadge } from "../../components/shared/UserLevelsBadge";
import { LevelsInformation } from "../../components/driver/LevelsInformation";
import "../../styles/driver/UserLevels.css";

export function UserLevels() {
  return (
    <div className="user-levels-container">
      <div className="header-user-levels">
        <HeaderVolver />
        <LogoChaskys descripcion={"Delivery App"} conmotorizado={false} />
      </div>
      <div className="levels-container">
        <UserLevelsBadge level={"Chaskys Silver"} />
        <LevelsInformation level={"silver"} />
      </div>
    </div>
  );
}
