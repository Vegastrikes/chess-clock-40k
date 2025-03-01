import { useState } from "react"

import Game from './pages/Game'
import MainMenu from './pages/MainMenu'

import GameState from './gamestate';

export default function App() {
  const [gameStep, setGameStep] = useState('settings')
  function setGameStepHandler(value: string) {
    setGameStep(value);
  }
  return(
    <>
      { gameStep === 'settings' && <MainMenu setGameStepHandler={setGameStepHandler}/>}
      { gameStep === 'game' && <Game />}
    </>
  )
}