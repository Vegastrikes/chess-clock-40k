import { useState, createContext, useContext } from "react"
import GameState from '../utils/gamestate';

const PlayerContext = createContext(GameState.player1)

export default function Game() {
  return (
    <div className="game w-full h-dvh">
      <div className="players grid grid-cols-2 h-100">
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
  return (
    <div className="clock h-1/3 w-1/3 flex justify-center items-center bg-gray-500">
      <div className="w-1/3 text-center">{player.clock.getTime("hour")}</div>
      <div className="w-1/3 text-center">{player.clock.getTime("minute")}</div>
      <div className="w-1/3 text-center">{player.clock.getTime("second")}</div>
    </div>
  )
}

function Name () {
  const player = useContext(PlayerContext)
  return (
    <div className="name absolute bottom-0 w-2/3 text-center bg-red-300 rounded-md">{player.username}</div>
  )
}