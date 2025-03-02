import { useState, createContext, useContext } from "react"
import GameState from '../utils/gamestate';

const PlayerContext = createContext(GameState.player1)

export default function MainMenu({
  setGameStepHandler = (v:string) => {}
}) {
  function onStartHandler() {
    GameState.start();
    setGameStepHandler("game");
  }

  return (
    <div className="mainmenu w-full h-dvh">
      <div className="grid grid-cols-3 h-dvh place-items-center">
        <PlayerContext.Provider value={GameState.player1}>
          <Settings />
        </PlayerContext.Provider>
        <button onClick={onStartHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start</button>
        <PlayerContext.Provider value={GameState.player2}>
          <Settings />
        </PlayerContext.Provider>
      </div>
    </div>
  )
}

function Settings() {
  const player = useContext(PlayerContext)
  function inputChangeHandler(username: string) {
    player.username = username;
  }
  return (
    <div className="bg-gray-200 w-4/5 h-4/5">
      <input type="text" placeholder="username" onChange={e => inputChangeHandler(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2"></input>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Change background</button> */}
      <TimeSettings />
    </div>
  )
}

function TimeSettings() {
  return (
    <div className="flex m-4">
      <TimeSlot type="hour" />
      <TimeSlot type="minute" />
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Change style</button> */}
    </div>
  )
}

function TimeSlot({
  type = "",
}) {
  const player = useContext(PlayerContext)
  const [value, setValue] = useState(player.clock.getTime(type));

  player.clock.setTime(type, value);
  
  function onChangeHandler(v: string) {
    let r: number = parseInt(v);
    
    if (r > 59) {
      r = 0
    }
    
    if (r < 0) {
      r = 59
    }
    
    setValue(r);
  }

  return (
    <>
      <input type="number" value={value} onChange={e => onChangeHandler(e.target.value)} step={1} className="hour bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2"></input>
    </>
  )
}