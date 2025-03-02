import GameState from './gamestate'

function initKeybindings() {
  document.body.onkeydown = function(e) {
    if (e.key == " " || e.code == "Space"   
    ) {
      e.preventDefault();
      GameState.changeTurn();
    }
  
    if (e.key == "p" || e.code == "KeyP"   
    ) {
      e.preventDefault();
      GameState.pauseUnpause();
    }
  }
}

export default initKeybindings;