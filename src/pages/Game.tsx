import { useState, useEffect, createContext, useContext } from "react"
import GameState from '../utils/gamestate';

const PlayerContext = createContext(GameState.player1)

export default function Game() {
  return (
    <div className="game w-full h-dvh">
      <div className="players grid grid-cols-2 h-full">
        <PlayerContext.Provider value={GameState.player1}>
          <PlayerArea testBg="bg-green-500"/>
        </PlayerContext.Provider>
        <PlayerContext.Provider value={GameState.player2}>
          <PlayerArea />
        </PlayerContext.Provider>
      </div>
    </div>
  )
}

function PlayerArea({
  testBg = "bg-purple-500"
}) {
  return (
    <div className={"playerArea relative flex items-center justify-center " + testBg}>
      <Clock />
      <Name />
    </div>
  )
}

function Clock () {
  const player = useContext(PlayerContext)

  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
        clearInterval(interval);
    };
  }, []);

  function formatTwoDigit(value: number) {
    if (value < 10 && value >= 0) {
        return `0${value}`;
    }

    return `${value}`
}

  return (
    <div className="clock h-1/3 w-2/3 flex justify-center items-center bg-gray-500">
      <div className="w-1/3 text-center">{formatTwoDigit(player.clock.getTime("hour"))}</div>
      <div className="w-1/3 text-center">{formatTwoDigit(player.clock.getTime("minute"))}</div>
      <div className="w-1/3 text-center">{formatTwoDigit(player.clock.getTime("second"))}</div>
    </div>
  )
}

function Name () {
  const player = useContext(PlayerContext)
  return (
    <div className="name absolute bottom-0 w-2/3 text-center bg-red-300 rounded-md">{player.username}</div>
  )
}