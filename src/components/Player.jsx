import { useState } from "react";

export default function Player({name, symbol}) {
  const [ isEditing, setIsEditing ] = useState(false);
  const [ playerName, setPlayerName ] = useState(name);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleChange(e){
    console.log(e);
    setPlayerName(e.target.value);
  }

  return (
    <li>
      <span className="player">
        {isEditing ? (
          <input type="text" value={playerName} onChange={handleChange} required />
        ) : (
          <span className="player-name">{playerName}</span>            
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}
