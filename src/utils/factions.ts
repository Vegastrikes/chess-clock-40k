const factions = [
  {
    id: 0,
    name: "Blood Angels",
    color: {
      main: "#991115",
      secondary: "#E7BD42",
      third: "#000000"
    }
  },
  {
    id: 1,
    name: "Dark Angels",
    color: {
      main: "#005221"
    }
  },
  {
    id: 2,
    name: "Chaos",
    color: {
      main: "#000000",
      secondary: "#E7BD42",
      third: "#E7BD42"
    }
  }
]

function getFactions() {
  return factions
}

function getFaction(v: number) {
  return factions.find((faction) => faction.id === v);
}

export {getFactions, getFaction}