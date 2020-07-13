const baseTriviaURL = "https://opentdb.com/api.php";
const tokenURL = "https://opentdb.com/api_token.php?command=request";
const categoryURL = "https://opentdb.com/api_category.php";
const waypointURL = "/tq/data/waypoints.json";
let currQuestion = {};
let waypoints = {};
let currentPlayer = {};
let wayPointsShowing = false;
let inEncounter = false;
let playerMovable = true;

let token = "";

const players = [
  {
    "id":1,
    "name":"Landor",
    "waypoint": {},
    "items":[],
    "hp":5,
    "score": 0,
    "icon" :"knight",
    "marker":"p1"
  },
  {}
]

const monsters = [
  {
    "id":1,
    "name":"Ulfgar the Wise",
    "waypoint": {},
    "items":[],
    "hp":2,
    "score": 0,
    "icon" :"mage-r",
    "marker":"m1",
    "category": 17
  },
  {}
]