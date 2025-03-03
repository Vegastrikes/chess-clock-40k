import { useState, createContext, useContext } from "react"
import GameState from '../utils/gamestate';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/solid'
import { getFactions } from "../utils/factions";

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
    player.username = String(username).charAt(0).toUpperCase() + String(username).slice(1);
  }
  return (
    <div className="bg-gray-200 w-4/5 h-4/5">
      <input type="text" placeholder="username" onChange={e => inputChangeHandler(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2"></input>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Change background</button> */}
      <TimeSettings />
      <BackgroundColor />
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

function BackgroundColor() {
  const factions = getFactions();
  const [selected, setSelected] = useState(factions[0])
  const player = useContext(PlayerContext)
  player.faction = selected.id;

  return(
    <>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-2">
          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
              <span className="block truncate">{selected.name}</span>
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
          >
            {factions.map((faction) => (
              <ListboxOption
                key={faction.name}
                value={faction}
                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{faction.name}</span>
                </div>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </>
  )
}