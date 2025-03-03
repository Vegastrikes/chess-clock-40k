import { useState, useEffect, createContext, useContext } from "react"
import GameState from '../utils/gamestate';
import { getFaction } from "../utils/factions";

const PlayerContext = createContext(GameState.player1)

export default function Game() {
  const [render, setRender] = useState(1);
  useEffect(() => {
    const handleEvent = () => {
      setRender(render + 1)
    };

    document.addEventListener('pauseUnpause', handleEvent);
    return () => {
      document.removeEventListener('pauseUnpause', handleEvent);
    }
  }, )
  return (
    <div className="game w-full h-dvh">
      { GameState.isPaused && <Pause />}
      <div className="players grid grid-cols-2 h-full">
        <PlayerContext.Provider value={GameState.player1}>
          <PlayerArea />
        </PlayerContext.Provider>
        <PlayerContext.Provider value={GameState.player2}>
          <PlayerArea />
        </PlayerContext.Provider>
      </div>
    </div>
  )
}

function PlayerArea() {
  const player = useContext(PlayerContext)
  const faction = getFaction(player.faction);
  const [opacity, setOpacity] = useState(player.getTurn() ? 1 : 0.5);

  const style = {
    backgroundColor: faction?.color.main,
    opacity: opacity
  }

  useEffect(() => {
    const handleEvent = () => {
      if (player.getTurn()) {
        setOpacity(1)
      } else {
        setOpacity(0.5)
      }
    };

    document.addEventListener('changeTurn', handleEvent);
    return () => {
      document.removeEventListener('changeTurn', handleEvent);
    }
  }, )
  return (
    <div className={"playerArea relative flex items-center justify-center"} style={style}>
      <Clock />
      <Name />
    </div>
  )
}

function Clock () {
  const player = useContext(PlayerContext)
  const faction = getFaction(player.faction);

  const style = {
    fontFamily: "Digital-7",
    color: faction?.color.secondary,
    borderColor: faction?.color.third,
    backgroundColor: faction?.color.main,
    fontSize: "12rem"
  }

  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
        clearInterval(interval);
    };
  }, []);

  function formatTens(value: number) {
    return Math.floor(value / 10);
  }
  
  function formatOnes(value: number) {
    return value % 10;
  }

  return (
    <div className="clock flex w-full border-8 border-solid rounded-md text-center text-8xl grid grid-cols-20 m-4"  style={style}>
      <div className="col-span-3">{formatTens(player.clock.getTime("hour"))}</div>
      <div className="col-span-3">{formatOnes(player.clock.getTime("hour"))}</div>
      <div className="col-span-1">:</div>
      <div className="col-span-3">{formatTens(player.clock.getTime("minute"))}</div>
      <div className="col-span-3">{formatOnes(player.clock.getTime("minute"))}</div>
      <div className="col-span-1">:</div>
      <div className="col-span-3">{formatTens(player.clock.getTime("second"))}</div>
      <div className="col-span-3">{formatOnes(player.clock.getTime("second"))}</div>
    </div>
  )
}

function Name () {
  const player = useContext(PlayerContext)
  const faction = getFaction(player.faction);
  const [textSize, setTextSize] = useState(player.getTurn() ? "text-6xl" : "text-2xl");

  const style = {
    color: faction?.color.secondary,
    borderColor: faction?.color.third,
    backgroundColor: faction?.color.main
  }

  useEffect(() => {
    const handleEvent = () => {
      if (player.getTurn()) {
        setTextSize("text-6xl")
      } else {
        setTextSize("text-2xl")
      }
    };

    document.addEventListener('changeTurn', handleEvent);
    return () => {
      document.removeEventListener('changeTurn', handleEvent);
    }
  }, )
  return (
    <div className={`name absolute bottom-10 w-1/2 text-center border-8 border-solid rounded-md p-6 ${textSize}`} style={style}>{player.username}</div>
  )
}

function Pause () {
  return (
    <div className={"absolute top-10 w-full z-99 text-center border-8 border-solid rounded-md p-6 text-8xl bg-gray-400"}>Paused</div>
  )
}