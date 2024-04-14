import { activeMissions, seasons } from "./seasonTrackerComponent";
import { missionPointCalculator } from "./missionPointCalculator";

type Mission = {
  title: string;
  description: string;
  mark?: string;
  point?: number;
  active?: boolean;
};

export const missions = {
  basic: [
    {
      title: "Az erdő széle",
      description:
        "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
    },
    {
      title: "Álmos-völgy",
      description:
        "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
    },
    {
      title: "Krumpliöntözés",
      description:
        "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
    },
    {
      title: "Határvidék",
      description: "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
    },
  ],
  extra: [
    {
      title: "Fasor",
      description:
        "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.",
    },
    {
      title: "Gazdag város",
      description:
        "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz.",
    },
    {
      title: "Öntözőcsatorna",
      description:
        "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
    },
    {
      title: "Mágusok völgye",
      description:
        "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
    },
    {
      title: "Üres telek",
      description:
        "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
    },
    {
      title: "Sorház",
      description:
        "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.",
    },
    {
      title: "Páratlan silók",
      description:
        "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
    },
    {
      title: "Gazdag vidék",
      description:
        "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
    },
  ],
};

const storedMissions = localStorage.getItem("chosenMissions");
export let chosenMissions: Mission[] = storedMissions
  ? JSON.parse(storedMissions)
  : [];

export let total = 0;

export function loadMissions() {
  const missionContainer = document.querySelector("div.missionsContainer")!;
  chosenMissions = generateRandomMission();

  for (const mission of chosenMissions) {
    const missionWrapper = document.createElement("div");
    missionWrapper.classList.add("missionWrapper");

    const missionImage = document.createElement("img");
    missionImage.classList.add("missionImage");
    missionImage.src = generateMissionImage(mission.title);

    const missionTextWrapper = document.createElement("div");
    missionTextWrapper.classList.add("missionTextWrapper");

    const missionPoint = document.createElement("span");
    missionPoint.classList.add("missionPoint");
    missionPoint.innerText = "(" + mission.point!.toString() + " pont)";
    missionTextWrapper.appendChild(missionPoint);

    const missionMark = document.createElement("span");
    missionMark.innerText = mission.mark!;
    missionTextWrapper.appendChild(missionMark);

    missionWrapper.appendChild(missionTextWrapper);
    missionWrapper.appendChild(missionImage);

    missionContainer.appendChild(missionWrapper);
  }
  setActiveMissions();
}

export function loadStoredMissions() {
  const missionContainer = document.querySelector("div.missionsContainer")!;

  for (const mission of chosenMissions) {
    const missionWrapper = document.createElement("div");
    missionWrapper.classList.add("missionWrapper");

    const missionImage = document.createElement("img");
    missionImage.classList.add("missionImage");
    missionImage.src = generateMissionImage(mission.title);

    const missionTextWrapper = document.createElement("div");
    missionTextWrapper.classList.add("missionTextWrapper");

    const missionPoint = document.createElement("span");
    missionPoint.classList.add("missionPoint");
    missionPoint.innerText = "(" + mission.point!.toString() + " pont)";
    missionTextWrapper.appendChild(missionPoint);

    const missionMark = document.createElement("span");
    missionMark.innerText = mission.mark!;
    missionTextWrapper.appendChild(missionMark);

    missionWrapper.appendChild(missionTextWrapper);
    missionWrapper.appendChild(missionImage);

    missionContainer.appendChild(missionWrapper);
  }
  setActiveMissions();
}

function generateRandomMission(): Mission[] {
  const allMissions: Mission[] = [...missions.basic, ...missions.extra];
  for (let i = allMissions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allMissions[i], allMissions[j]] = [allMissions[j], allMissions[i]];
  }

  let chosenMissions = allMissions.slice(0, 4);

  chosenMissions[0].mark = "A";
  chosenMissions[1].mark = "B";
  chosenMissions[2].mark = "C";
  chosenMissions[3].mark = "D";

  chosenMissions[0].point = 0;
  chosenMissions[1].point = 0;
  chosenMissions[2].point = 0;
  chosenMissions[3].point = 0;

  return chosenMissions;
}

export function setActiveMissions(finish?: boolean) {
  const missionImages = document.querySelectorAll("img.missionImage");
  if (finish) {
    for (let i = 0; i < chosenMissions.length; i++) {
      missionImages[i].classList.add("activeImage");
    }
    return;
  }

  for (let i = 0; i < chosenMissions.length; i++) {
    const actives = activeMissions.innerHTML;
    if (
      chosenMissions[i].mark == actives[0] ||
      chosenMissions[i].mark == actives[1]
    ) {
      chosenMissions[i].active = true;
      missionImages[i].classList.add("activeImage");
    } else {
      chosenMissions[i].active = false;
      missionImages[i].classList.remove("activeImage");
    }
  }
}

function generateMissionImage(missionTitle: string): string {
  switch (missionTitle) {
    case "Az erdő széle":
      return "assets/missions_hun/Group 69.png";
    case "Álmos-völgy":
      return "assets/missions_hun/Group 74.png";
    case "Krumpliöntözés":
      return "assets/missions_hun/Group 70.png";
    case "Határvidék":
      return "assets/missions_hun/Group 78.png";
    case "Fasor":
      return "assets/missions_hun/Group 68.png";
    case "Gazdag város":
      return "assets/missions_hun/Group 71.png";
    case "Öntözőcsatorna":
      return "assets/missions_hun/Group 75.png";
    case "Mágusok völgye":
      return "assets/missions_hun/Group 76.png";
    case "Üres telek":
      return "assets/missions_hun/Group 77.png";
    case "Sorház":
      return "assets/missions_hun/Group 72.png";
    case "Páratlan silók":
      return "assets/missions_hun/Group 73.png";
    case "Gazdag vidék":
      return "assets/missions_hun/Group 79.png";
    default:
      return "";
  }
}

export const totalPoints = document.querySelector("span.totalPoints")!;

export function handleMissionProgress() {
  const missionPoints = document.querySelectorAll("span.missionPoint");
  let checkedFinalMission = false;

  for (let i = 0; i < chosenMissions.length; i++) {
    if (chosenMissions[i].active) {
      chosenMissions[i].point! += missionPointCalculator(
        chosenMissions[i].title
      );
      total += missionPointCalculator(chosenMissions[i].title);
      missionPoints[i].innerHTML =
        "(" + chosenMissions[i].point!.toString() + " pont)";
      //es az aktiv évszakhoz hozzáadjuk a megszerzett pontokat:
      for (let j = 0; j < seasons.length; j++) {
        if (seasons[j].active) {
          seasons[j].point += missionPointCalculator(chosenMissions[i].title);
        }
        if (
          seasons[j].name == "Tél" &&
          seasons[j].active &&
          !checkedFinalMission
        ) {
          //ha a legutolsó pontszámítás van
          total += missionPointCalculator("Minden hegy bekeritve");
          checkedFinalMission = true;
        }
      }
    }
  }

  totalPoints.innerHTML = total.toString();
}
