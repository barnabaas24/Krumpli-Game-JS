import { timeLeftFromSeason } from "./timeTrackerComponent";
import { GameElement } from "./main";
import { elements } from "./main";
import { setActiveMissions } from "./missionComponent";
import { handleMissionProgress } from "./missionComponent";

type Season = {
  name: string;
  point: number;
  time: number;
  active: boolean;
  missions: string;
};

const storedSeasons = localStorage.getItem("seasons");

export const seasons: Season[] = storedSeasons
  ? JSON.parse(storedSeasons)
  : [
      {
        name: "Tavasz",
        point: 0,
        time: 0,
        active: true,
        missions: "AB",
      },
      {
        name: "Nyár",
        point: 0,
        time: 0,
        active: false,
        missions: "BC",
      },
      {
        name: "Ősz",
        point: 0,
        time: 0,
        active: false,
        missions: "CD",
      },
      {
        name: "Tél",
        point: 0,
        time: 0,
        active: false,
        missions: "DA",
      },
    ];

const currentSeason = document.querySelector("span#currentSeason")!;
export const activeMissions = document.querySelector("span#currentMission")!;

export let currentElements: GameElement[] = JSON.parse(
  localStorage.getItem("currentElements") || "[]"
) as GameElement[];

export function loadNewSeason() {
  for (let i = 0; i < seasons.length; i++) {
    if (seasons[i].active) {
      currentSeason.innerHTML = seasons[i].name;
      timeLeftFromSeason.innerHTML = "7/7";
      activeMissions.innerHTML = seasons[i].missions;
      setActiveMissions();
      currentElements = shuffleTiles();
    }
  }
}

//ez csak a localStoragebol való betöltés miatt
export function loadSeason() {
  for (let i = 0; i < seasons.length; i++) {
    if (seasons[i].active) {
      currentSeason.innerHTML = seasons[i].name;
      timeLeftFromSeason.innerHTML = `${7 - seasons[i].time}/7`;
      activeMissions.innerHTML = seasons[i].missions;
      setActiveMissions();
    }
  }
}

export function seasonChange(): boolean {
  for (let i = 0; i < seasons.length; i++) {
    if (seasons[3].active && seasons[3].time == 7) {
      handleMissionProgress();
      setSeasonalPoint(seasons[3].point, seasons[3].name);
      seasons[3].active = false;
      let finish = true;
      setActiveMissions(finish);
      return false;
    }
    if (seasons[i].active && seasons[i].time == 7) {
      handleMissionProgress();
      setSeasonalPoint(seasons[i].point, seasons[i].name);
      seasons[i].active = false;
      seasons[i + 1].active = true;
      return true;
    }
  }
  return false;
}

export function loadSeasonalPoints() {
  for (let i = 0; i < seasons.length; i++) {
    if (!seasons[i].active) {
      setSeasonalPoint(seasons[i].point, seasons[i].name);
    }
  }
}

function setSeasonalPoint(newpoint: number, seasonName: string) {
  const allseasons = document.querySelectorAll("span.seasonalPoint");
  if (seasonName == "Tavasz") {
    allseasons[0].innerHTML = " " + newpoint.toString() + " pont";
  } else if (seasonName == "Nyár") {
    allseasons[1].innerHTML = " " + newpoint.toString() + " pont";
  } else if (seasonName == "Ősz") {
    allseasons[2].innerHTML = " " + newpoint.toString() + " pont";
  } else if (seasonName == "Tél") {
    allseasons[3].innerHTML = " " + newpoint.toString() + " pont";
  }
}

function shuffleTiles(): GameElement[] {
  let shuffledArray: GameElement[] = [];
  for (let i = 0; i < elements.length; i++) {
    shuffledArray.push(elements[i]);
  }

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
