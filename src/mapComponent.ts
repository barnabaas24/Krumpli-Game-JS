import { gameMapMatrix } from "./main";
import { gameMap } from "./main";
import { GameElement } from "./main";

export function generateGameMap() {
  generateDefaultMatrix();
  renderTable();
}

function generateDefaultMatrix() {
  for (let i = 0; i < 11; i++) {
    gameMapMatrix.push([]);
    for (let j = 0; j < 11; j++) {
      if (
        (i == 1 && j == 1) ||
        (i == 3 && j == 8) ||
        (i == 5 && j == 3) ||
        (i == 8 && j == 9) ||
        (i == 9 && j == 5)
      ) {
        gameMapMatrix[i].push("mountain");
      } else {
        gameMapMatrix[i].push("base");
      }
    }
  }
}

export function renderTable() {
  const newTable = document.createElement("table");

  for (let i = 0; i < 11; i++) {
    const mapRow = document.createElement("tr");
    mapRow.classList.add("mapRow");
    for (let j = 0; j < 11; j++) {
      const mapCell = document.createElement("td");
      mapCell.classList.add("mapCell");
      const image = document.createElement("img");
      image.classList.add("mapTileImage");

      if (gameMapMatrix[i][j] == "base") {
        image.src = "assets/tiles/base_tile.svg";
      } else if (gameMapMatrix[i][j] == "mountain") {
        image.src = "assets/tiles/mountain_tile.svg";
      } else if (gameMapMatrix[i][j] == "farm") {
        image.src = "assets/tiles/plains_tile.svg";
      } else if (gameMapMatrix[i][j] == "town") {
        image.src = "assets/tiles/village_tile.svg";
      } else if (gameMapMatrix[i][j] == "water") {
        image.src = "assets/tiles/water_tile.svg";
      } else if (gameMapMatrix[i][j] == "forest") {
        image.src = "assets/tiles/forest_tile.svg";
      }
      mapCell.appendChild(image);
      mapRow.appendChild(mapCell);
    }
    newTable.appendChild(mapRow);
  }

  gameMap.innerHTML = newTable.innerHTML;
}

export function placeTile(
  gameMapMatrix: string[][],
  startRowIndex: number,
  startCellIndex: number,
  gameElement: GameElement
) {
  let foundFirst = false;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameElement.shape[i][j] == 1 && !foundFirst) {
        foundFirst = true;
        startRowIndex = startRowIndex - i;
        startCellIndex = startCellIndex - j;
      }
      if (gameElement.shape[i][j] == 1) {
        gameMapMatrix[startRowIndex + i][startCellIndex + j] = gameElement.type;
      }
    }
  }
  renderTable();
}

export function checkIfPlacable(
  gameMapMatrix: string[][],
  startRowIndex: number,
  startCellIndex: number,
  gameElement: GameElement
): boolean {
  let foundFirst = false;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameElement.shape[i][j] == 1 && !foundFirst) {
        foundFirst = true;
        startRowIndex = startRowIndex - i;
        startCellIndex = startCellIndex - j;
      }
      if (gameElement.shape[i][j] == 1) {
        //ha kellene oda tenni
        if (
          gameMapMatrix[startRowIndex + i][startCellIndex + j] != "base" || //de nem tud oda tenni
          gameMapMatrix[startRowIndex + i][startCellIndex + j] == undefined
        ) {
          return false; //akkor false
        }
      } else {
      }
    }
  }

  return true; //kulonben true
}
