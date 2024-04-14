import { gameMapMatrix } from "./main";

export function missionPointCalculator(title: string): number {
  switch (title) {
    case "Az erdő széle":
      return erdoszele();
    case "Álmos-völgy":
      return almosvolgy();
    case "Krumpliöntözés":
      return krumpliontozes();
    case "Határvidék":
      return hatarvidek();
    case "Fasor":
      return fasor();
    case "Gazdag város":
      return gazdagvaros();
    case "Öntözőcsatorna":
      return ontozocsatorna();
    case "Mágusok völgye":
      return magusokvolgye();
    case "Üres telek":
      return urestelek();
    case "Sorház":
      return sorhaz();
    case "Páratlan silók":
      return paratlansilok();
    case "Gazdag vidék":
      return gazdagvidek();
    case "Minden hegy bekeritve":
      return mindenhegybekeritve();
    default:
      return 0;
  }
}

function erdoszele(): number {
  let gainedPoints = 0;
  for (let i = 0; i < gameMapMatrix.length; i++) {
    for (let j = 0; j < gameMapMatrix[i].length; j++) {
      if (i == 0 && gameMapMatrix[i][j] == "forest") {
        gainedPoints++;
      }
      if (i == gameMapMatrix.length - 1 && gameMapMatrix[i][j] == "forest") {
        gainedPoints++;
      }
      if (
        j == 0 &&
        i != 0 &&
        i != gameMapMatrix.length - 1 &&
        gameMapMatrix[i][j] == "forest"
      ) {
        gainedPoints++;
      }

      if (
        j == gameMapMatrix.length - 1 &&
        i != 0 &&
        i != gameMapMatrix.length - 1 &&
        gameMapMatrix[i][j] == "forest"
      ) {
        gainedPoints++;
      }
    }
  }
  return gainedPoints;
}

function almosvolgy(): number {
  let gainedPoints = 0;
  for (let i = 0; i < gameMapMatrix.length; i++) {
    let forestCounter = 0;
    for (let j = 0; j < gameMapMatrix[i].length; j++) {
      if (gameMapMatrix[i][j] == "forest") {
        forestCounter++;
      }
      if (forestCounter == 3) {
        gainedPoints += 4;
        break;
      }
    }
  }

  return gainedPoints;
}

function krumpliontozes(): number {
  let gainedPoints = 0;
  for (let i = 0; i < gameMapMatrix.length; i++) {
    for (let j = 0; j < gameMapMatrix[i].length; j++) {
      if (gameMapMatrix[i][j] == "farm") {
        if (gameMapMatrix[i - 1]?.[j] === "water") {
          gainedPoints += 2;
        }
        if (gameMapMatrix[i + 1]?.[j] === "water") {
          gainedPoints += 2;
        }
        if (
          gameMapMatrix[i][j + 1] !== undefined &&
          gameMapMatrix[i][j + 1] === "water"
        ) {
          gainedPoints += 2;
        }
        if (
          gameMapMatrix[i][j - 1] !== undefined &&
          gameMapMatrix[i][j - 1] === "water"
        ) {
          gainedPoints += 2;
        }
      }
    }
  }

  return gainedPoints;
}

function hatarvidek(): number {
  let gainedPoints = 0;
  for (let i = 0; i < gameMapMatrix.length; i++) {
    if (gameMapMatrix[i].every((cell) => cell != "base")) {
      gainedPoints += 6;
    }
  }

  for (let j = 0; j < gameMapMatrix.length; j++) {
    let good = true;
    for (let i = 0; i < gameMapMatrix.length; i++) {
      if (gameMapMatrix[i][j] == "base") {
        good = false;
      }
    }
    if (good) {
      gainedPoints += 6;
    }
  }

  return gainedPoints;
}

function fasor(): number {
  let longestLength = 0;
  let currentLength = 0;

  for (let j = 0; j < gameMapMatrix.length; j++) {
    for (let i = 0; i < gameMapMatrix.length; i++) {
      if (gameMapMatrix[i][j] == "forest") {
        currentLength++;
        if (currentLength > longestLength) {
          longestLength = currentLength;
        }
      } else {
        currentLength = 0;
      }
    }
  }

  return longestLength * 2;
}

function ontozocsatorna(): number {
  let gainedPoints = 0;

  for (let j = 0; j < gameMapMatrix.length; j++) {
    let farmLength = 0;
    let waterLength = 0;
    for (let i = 0; i < gameMapMatrix.length; i++) {
      if (gameMapMatrix[i][j] == "farm") {
        farmLength++;
      }
      if (gameMapMatrix[i][j] == "water") {
        waterLength++;
      }
    }

    if (waterLength == farmLength && waterLength >= 1) {
      gainedPoints += 4;
    }
  }

  return gainedPoints;
}

function gazdagvaros(): number {
  let gainedPoints = 0;

  for (let i = 0; i < gameMapMatrix.length; i++) {
    for (let j = 0; j < gameMapMatrix[i].length; j++) {
      if (gameMapMatrix[i][j] == "town") {
        let usedTiles: string[] = [];

        if (
          gameMapMatrix[i - 1]?.[j] !== "base" &&
          gameMapMatrix[i - 1]?.[j] !== undefined
        ) {
          usedTiles.push(gameMapMatrix[i - 1][j]);
        }
        if (
          gameMapMatrix[i + 1]?.[j] !== "base" &&
          gameMapMatrix[i + 1]?.[j] !== undefined
        ) {
          usedTiles.push(gameMapMatrix[i + 1][j]);
        }
        if (
          gameMapMatrix[i][j + 1] !== undefined &&
          gameMapMatrix[i][j + 1] !== "base"
        ) {
          usedTiles.push(gameMapMatrix[i][j + 1]);
        }
        if (
          gameMapMatrix[i][j - 1] !== undefined &&
          gameMapMatrix[i][j - 1] !== "base"
        ) {
          usedTiles.push(gameMapMatrix[i][j - 1]);
        }

        const uniqueElements = new Set(usedTiles);
        if (uniqueElements.size >= 3) {
          gainedPoints += 3;
        }
      }
    }
  }

  return gainedPoints;
}

function magusokvolgye(): number {
  let gainedPoints = 0;
  for (let i = 0; i < gameMapMatrix.length; i++) {
    for (let j = 0; j < gameMapMatrix[i].length; j++) {
      if (gameMapMatrix[i][j] == "mountain") {
        if (gameMapMatrix[i - 1]?.[j] === "water") {
          gainedPoints += 3;
        }
        if (gameMapMatrix[i + 1]?.[j] === "water") {
          gainedPoints += 3;
        }
        if (
          gameMapMatrix[i][j + 1] !== undefined &&
          gameMapMatrix[i][j + 1] === "water"
        ) {
          gainedPoints += 3;
        }
        if (
          gameMapMatrix[i][j - 1] !== undefined &&
          gameMapMatrix[i][j - 1] === "water"
        ) {
          gainedPoints += 3;
        }
      }
    }
  }
  return gainedPoints;
}

function urestelek(): number {
  let gainedPoints = 0;
  for (let i = 0; i < gameMapMatrix.length; i++) {
    for (let j = 0; j < gameMapMatrix[i].length; j++) {
      if (gameMapMatrix[i][j] == "town") {
        if (gameMapMatrix[i - 1]?.[j] === "base") {
          gainedPoints += 2;
        }
        if (gameMapMatrix[i + 1]?.[j] === "base") {
          gainedPoints += 2;
        }
        if (
          gameMapMatrix[i][j + 1] !== undefined &&
          gameMapMatrix[i][j + 1] === "base"
        ) {
          gainedPoints += 2;
        }
        if (
          gameMapMatrix[i][j - 1] !== undefined &&
          gameMapMatrix[i][j - 1] === "base"
        ) {
          gainedPoints += 2;
        }
      }
    }
  }
  return gainedPoints;
}

function sorhaz(): number {
  let longestLength = 0;
  let currentLength = 0;

  for (let i = 0; i < gameMapMatrix.length; i++) {
    currentLength = 0;
    for (let j = 0; j < gameMapMatrix.length; j++) {
      if (gameMapMatrix[i][j] == "town") {
        currentLength++;
        if (currentLength > longestLength) {
          longestLength = currentLength;
        }
      } else {
        currentLength = 0;
      }
    }
  }

  if (longestLength <= 1) return 0;

  let gainedPoints = 0;
  for (let i = 0; i < gameMapMatrix.length; i++) {
    currentLength = 0;
    for (let j = 0; j < gameMapMatrix.length; j++) {
      if (gameMapMatrix[i][j] == "town") {
        currentLength++;
        if (currentLength == longestLength) {
          if (
            gameMapMatrix[i][j + 1] !== undefined &&
            gameMapMatrix[i][j + 1] !== "town"
          ) {
            gainedPoints += longestLength * 2;
          } else if (gameMapMatrix[i][j + 1] === undefined) {
            gainedPoints += longestLength * 2;
          }
        }
      } else {
        currentLength = 0;
      }
    }
  }

  return gainedPoints;
}

function paratlansilok(): number {
  let gainedPoints = 0;

  for (let i = 0; i < gameMapMatrix.length; i++) {
    if (i % 2 == 0) {
      let isFull = true;
      for (let j = 0; j < gameMapMatrix[i].length; j++) {
        if (gameMapMatrix[j][i] == "base") isFull = false;
      }

      if (isFull) gainedPoints += 10;
    }
  }
  return gainedPoints;
}

function gazdagvidek(): number {
  let gainedPoints = 0;

  for (let i = 0; i < gameMapMatrix.length; i++) {
    let usedTiles: string[] = [];
    for (let j = 0; j < gameMapMatrix[i].length; j++) {
      if (gameMapMatrix[i][j] != "base") {
        usedTiles.push(gameMapMatrix[i][j]);
      }

      const uniqueElements = new Set(usedTiles);
      if (uniqueElements.size >= 5) {
        gainedPoints += 4;
        break;
      }
    }
  }
  return gainedPoints;
}

function mindenhegybekeritve(): number {
  let bekeritett = 0;
  for (let i = 0; i < gameMapMatrix.length; i++) {
    for (let j = 0; j < gameMapMatrix.length; j++) {
      if (gameMapMatrix[i][j] == "mountain") {
        if (
          gameMapMatrix[i - 1][j] != "base" &&
          gameMapMatrix[i + 1][j] != "base" &&
          gameMapMatrix[i][j - 1] != "base" &&
          gameMapMatrix[i][j + 1] != "base"
        ) {
          bekeritett++;
        }
      }
    }
  }

  return bekeritett;
}
