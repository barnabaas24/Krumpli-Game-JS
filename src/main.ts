//missionComponent
import {
  chosenMissions,
  loadMissions,
  loadStoredMissions,
} from "./missionComponent";

//mapComponent:
import { generateGameMap, renderTable } from "./mapComponent";
import { placeTile } from "./mapComponent";
import { checkIfPlacable } from "./mapComponent";

//previewComponent:
import { renderPreview } from "./previewComponent";
import { disableButtons } from "./previewComponent";

//timeTrackerComponent
import { handleTimeChange } from "./timeTrackerComponent";
import { timeConsumed } from "./timeTrackerComponent";
import { totalTime } from "./timeTrackerComponent";

//seasonTrackerComponent
import {
  loadSeason,
  loadSeasonalPoints,
  seasonChange,
  seasons,
} from "./seasonTrackerComponent";
import { loadNewSeason } from "./seasonTrackerComponent";
import { currentElements } from "./seasonTrackerComponent";

export type GameElement = {
  time: number;
  type: string;
  shape: number[][];
  rotation: number;
  mirrored: boolean;
};

export const elements: GameElement[] = [
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "town",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "town",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "town",
    shape: [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "town",
    shape: [
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
];

export const gameMap: HTMLTableElement =
  document.querySelector("table#mapTable")!;

const storedMatrix = localStorage.getItem("gameMapMatrix");

export const gameMapMatrix: string[][] = storedMatrix
  ? JSON.parse(storedMatrix)
  : [];

export let gameElement: GameElement;

gameMap.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
gameMap.addEventListener("click", handleClick);
gameMap.addEventListener("mouseover", handleHover);
gameMap.addEventListener("mouseout", handleHoverLeave);

function handleHover(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.matches("img")) {
    let cell = (target as Element).closest("td")!;
    let row = cell.parentNode as HTMLTableRowElement;
    let startRowIndex = row.rowIndex;
    let startCellIndex = cell.cellIndex;

    const shape = gameElement.shape;

    let foundFirst = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameElement.shape[i][j] == 1 && foundFirst == false) {
          foundFirst = true;
          startRowIndex -= i;
          startCellIndex -= j;
          break;
        }
      }
      if (foundFirst) break;
    }

    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (
          shape[i][j] == 1 &&
          startRowIndex + i < gameMap.rows.length &&
          startCellIndex + j < gameMap.rows[startRowIndex + i].cells.length
        ) {
          if (
            gameMap.rows[startRowIndex + i]?.cells[startCellIndex + j] !==
            undefined
          ) {
            gameMap.rows[startRowIndex + i]?.cells[
              startCellIndex + j
            ].classList.add("hoverBorder");
          }
        }
      }
    }
  }
}

function handleHoverLeave(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.matches("img")) {
    let cell = (target as Element).closest("td")!;
    let row = cell.parentNode as HTMLTableRowElement;
    let startRowIndex = row.rowIndex;
    let startCellIndex = cell.cellIndex;

    const shape = gameElement.shape;

    let foundFirst = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameElement.shape[i][j] == 1 && foundFirst == false) {
          foundFirst = true;
          startRowIndex -= i;
          startCellIndex -= j;
          break;
        }
      }
      if (foundFirst) break;
    }

    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (
          shape[i][j] == 1 &&
          startRowIndex + i < gameMap.rows.length &&
          startCellIndex + j < gameMap.rows[startRowIndex + i].cells.length
        ) {
          if (
            gameMap.rows[startRowIndex + i]?.cells[startCellIndex + j] !==
            undefined
          ) {
            gameMap.rows[startRowIndex + i]?.cells[
              startCellIndex + j
            ].classList.remove("hoverBorder");
          }
        }
      }
    }
  }
}

function handleClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.matches("img")) {
    const cell = (target as Element).closest("td")!;
    const row = cell.parentNode as HTMLTableRowElement;
    const rowIndex = row.rowIndex;
    const cellIndex = cell.cellIndex;

    const placeable = checkIfPlacable(
      gameMapMatrix,
      rowIndex,
      cellIndex,
      gameElement
    );

    if (placeable) {
      placeTile(gameMapMatrix, rowIndex, cellIndex, gameElement);
      localStorage.setItem("gameMapMatrix", JSON.stringify(gameMapMatrix));
      handleTimeChange(gameElement);

      localStorage.setItem("chosenMissions", JSON.stringify(chosenMissions));

      if (seasonChange()) {
        //belul meghívjuk a pontszámítást
        localStorage.setItem("chosenMissions", JSON.stringify(chosenMissions));
        loadNewSeason();
      }

      localStorage.setItem("seasons", JSON.stringify(seasons));

      if (!gameEnded()) {
        localStorage.setItem(
          "currentElements",
          JSON.stringify(currentElements)
        );
        loadNextRound();
      } else {
        localStorage.clear();
        gameMap.removeEventListener("click", handleClick);
        gameMap.removeEventListener("mouseover", handleHover);
        gameMap.removeEventListener("mouseout", handleHoverLeave);
        disableButtons();
      }
    }
  }
}

function getNextElement(): GameElement {
  const popped = currentElements.pop()!;
  return popped;
}

function loadNextRound() {
  gameElement = getNextElement();
  renderPreview(gameElement);
}

function gameEnded(): boolean {
  return timeConsumed == totalTime;
}

function isMatrixEmpty(matrix: string[][]) {
  if (!matrix || matrix.length === 0) {
    return true;
  }

  for (let row of matrix) {
    if (row && row.length > 0) {
      return false;
    }
  }

  return true;
}

const resetButton = document.querySelector("button#resetButton");
resetButton?.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

if (isMatrixEmpty(gameMapMatrix)) {
  initializeGame();
} else {
  renderTable();
  loadStoredMissions();
  loadSeason();
  loadNextRound();
  loadSeasonalPoints();
}

function initializeGame() {
  generateGameMap();
  loadNewSeason();
  loadMissions();
  loadNextRound();
}
