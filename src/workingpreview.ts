import { GameElement } from "./main";
import { gameElement } from "./main";

export function disableButtons() {
  rotateButton.removeEventListener("click", handleRotate);
  mirrorButton.removeEventListener("click", handleMirror);
}

const rotateButton = document.querySelector("button#rotateButton")!;
rotateButton.addEventListener("click", handleRotate);

const mirrorButton = document.querySelector("button#mirrorButton")!;
mirrorButton.addEventListener("click", handleMirror);

export function renderPreview(element: GameElement) {
  const previewTable = document.querySelector("table#previewTable")!;
  let time = document.querySelector("span#elementTime")!;
  time.innerHTML = element.time.toString();
  let rows = "";

  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("td");
      cell.classList.add("previewCell");
      if (element.shape[i][j] == 1) {
        const tileImage = generateImage(element);
        cell.appendChild(tileImage);
      } else {
        cell.innerHTML = "&nbsp";
      }
      row.appendChild(cell);
    }
    rows += row.outerHTML;
  }
  previewTable.innerHTML = rows;
}

const generateImage = (element: GameElement) => {
  const image = document.createElement("img");
  image.classList.add("tileImage");
  switch (element.type) {
    case "water":
      image.src = "assets/tiles/water_tile.svg";
      break;

    case "town":
      image.src = "assets/tiles/village_tile.svg";
      break;

    case "forest":
      image.src = "assets/tiles/forest_tile.svg";
      break;

    case "farm":
      image.src = "assets/tiles/plains_tile.svg";
      break;

    default:
      break;
  }

  return image;
};

export function handleRotate() {
  const rotatedShape: number[][] = [];

  for (let i = 0; i < 3; i++) {
    rotatedShape.push([]);
    for (let j = 0; j < 3; j++) {
      rotatedShape[i].push(gameElement.shape[j][i]);
    }
  }
  for (let i = 0; i < 3; i++) {
    rotatedShape[i] = rotatedShape[i].reverse();
  }

  gameElement.shape = rotatedShape;
  renderPreview(gameElement);
}

export function handleMirror() {
  gameElement.mirrored = !gameElement.mirrored;
  gameElement.shape = gameElement.shape.map((row) => [...row].reverse());
  renderPreview(gameElement);
}
