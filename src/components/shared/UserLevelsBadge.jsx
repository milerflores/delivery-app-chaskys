import "../../styles/shared/UserLevelsBadge.css";

export function UserLevelsBadge({ level }) {
  return (
    <div className="user-levels-container">
      <div className="user-levels-badge">{`Tu nivel: ${level}`}</div>
    </div>
  );
}
