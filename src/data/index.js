import moment from "moment/moment";


//* get the value in group number format
export const groupNumber = (number) => {
  return parseFloat(number.toFixed(2)).toLocaleString("en", {
    useGrouping: true,
  });
};


//* calendar Events
let eventGuid = 0
let todayStr = moment().format("YYYY-MM-DD")  // YYYY-MM-DD of today
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
  }
]

export function createEventId() {
  return String(eventGuid++)
}


// * tasks
export const boardData = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
      ]
    },
    {
      id: 2,
      title: "Pendiente",
      cards: [
      ]
    },
    {
      id: 3,
      title: "En proceso",
      cards: [
      ]
    },
    {
      id: 4,
      title: "Completeda",
      cards: [
      ]
    }
  ]
}
