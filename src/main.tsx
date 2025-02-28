import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './components/Game'
import MainMenu from './components/MainMenu'

import GameState from './gamestate';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainMenu />
  </StrictMode>,
)
