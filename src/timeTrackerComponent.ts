import { GameElement } from "./main";
import { seasons } from "./seasonTrackerComponent";

const seasonalTime = 7;
const storedTime = localStorage.getItem("timeConsumed");
export let timeConsumed = storedTime ? JSON.parse(storedTime) : 0;
export const totalTime = 28;
export const timeLeftFromSeason = document.querySelector(
  "span#timeLeftFromSeason"
)!;

export function handleTimeChange(gameElement: GameElement) {
  raiseTimeSpent(gameElement);
  deductFromTimeCounter();
}

export function raiseTimeSpent(gameElement: GameElement) {
  for (const season in seasons) {
    if (seasons[season].active) {
      seasons[season].time += gameElement.time;
      if (seasons[season].time >= 7) {
        seasons[season].time = 7;
        timeConsumed += 7;
        localStorage.setItem("timeConsumed", JSON.stringify(timeConsumed));
      }
      break;
    }
  }
  //itt at kell allitani a seasons arrayt
}

export function deductFromTimeCounter() {
  for (const season in seasons) {
    if (seasons[season].active) {
      timeLeftFromSeason.innerHTML = `${seasonalTime - seasons[season].time}/7`;
    }
  }
}
