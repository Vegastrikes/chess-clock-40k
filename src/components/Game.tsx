function Name () {
  return (
    <div className="name absolute bottom-0 w-2/3 bg-red-300 rounded-md">Player Name</div>
  )
}

function Clock () {
  return (
    <div className="clock h-1/3 w-1/3 bg-gray-500">
      Clock
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

export default function Game() {
  return (
    <div className="game w-full h-dvh">
      <div className="players grid grid-cols-2 h-100">
        <PlayerArea testBg="bg-green-500"/>
        <PlayerArea />
      </div>
    </div>
  )
}