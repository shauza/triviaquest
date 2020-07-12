$(function () {

  const baseTriviaURL = "https://opentdb.com/api.php";
  const tokenURL = "https://opentdb.com/api_token.php?command=request";
  const categoryURL = "https://opentdb.com/api_category.php";
  const waypointURL = "/tq/data/waypoints.json";
  let currQuestion = {};
  let waypoints = {};
  let currentPlayer = {};
  let wayPointsShowing = false;

  let token = "";

  const players = [
    {
      "id":1,
      "name":"Landor",
      "waypoint": {},
      "items":[],
      "score": 0,
      "icon" :"knight",
      "marker":"p1"
    },
    {}
  ]

  // get token to keep and use to keep from getting same question twice
  axios.get(tokenURL).then(resp => {
    token = resp.data.token;
  });

  // load waypoints
function loadWaypoints(){
  $.ajax({
    url: waypointURL,
    dataType: 'json',
    async: false,
    success: function(data) {
      waypoints = data;
    }
  });
}

$(document).keydown(function(e) {
 
  // TAB key pressed

  switch (e.keyCode) {
    case 9:
      e.preventDefault();
      toggleNextWaypoints();
      break;
    case 65,66,67,68:
      e.preventDefault();
       moveCurrentPlayer();
       break;
    default:
      break;
  }
});


function toggleNextWaypoints(set){

  if (set) {  // force a visibility
 
  }else{
    if (wayPointsShowing) {
      $(".waypoint").hide();
      wayPointsShowing = false;
    }else{
      $(".waypoint").show();
      wayPointsShowing = true;
    }
  }

}



  $('.map').on('click', function (event) {

    $('#info').append(event.pageX + "," + event.pageY + "<br>")
  });

 

  $('#get-question').on('click', async function (){
    const q = await getQuestion(9, "multiple");
    currQuestion = q;
    let allAnswers = [];
    debug(JSON.stringify(currQuestion));
    $('#monster-bubble .question').html(q.question);
    allAnswers.push(...q.incorrect_answers, q.correct_answer);

    //console.log('unshuffled', allAnswers);
    const shuffledAnswers = shuffle(allAnswers);
    //console.log('shuffled', shuffledAnswers);
    for (let index = 0; index < shuffledAnswers.length; index++) {
      let c = '#a' + (index + 1)

      $(c).html(shuffledAnswers[index]);
    }
  });



  async function getQuestion(cat, type) {

    try {
      let response = await axios.get(baseTriviaURL, {
        params: {
          amount: 1,
          type: type,
          token: token
        }
      });

      return response.data.results[0];
    } catch (error) {
      console.error(error);
    }
  }




  function placeHighlightMaker(markerID, waypoint){
    const markerDiameter = 50;
    const left = waypoint.location[0] - (markerDiameter/2);
    const top= waypoint.location[1]- (markerDiameter/2);
      $('#'+markerID).css({"left":left,"top":top})
  }

  function getWaypoint(waypointID){
    const wo = findObjectInArrayByProperty(waypoints,"id",waypointID);
    return wo;
  }

  function SetNextWaypoints(player){
    $(".waypoint").removeClass("showable");
    currentWaypointLinks = player.waypoint.links;
    const result = waypoints.filter(w => currentWaypointLinks.includes(w.id));
    for (let i = 0; i < result.length; i++) {
      const wp = 'w'+i;
      placeHighlightMaker(wp, result[i]);
      $(wp).addClass('showable');
    }
    
  }

  // move player maker in the UI - waypoint for player must be set first
  function placePlayer(player){
    const markerSize = 35;
    if (!jQuery.isEmptyObject(player.waypoint)){
      const x = player.waypoint.location[0] - (markerSize/2);
      const y = player.waypoint.location[1] - (markerSize/2);
      $('#'+player.marker).css({'left':x,'top':y});
    }else{
      console.log('Player is lost!');
    }
  }

  function moveCurrentPlayer(){

  }

  function getPlayer(id){
    const player = findObjectInArrayByProperty(players,"id",id);
    return player;
  }

  function SetUpPlayer(player){
    startPoint = getWaypoint(2);
    player.waypoint = startPoint;
    placePlayer(player);
    SetNextWaypoints(player);
  }


  function initGame(){
    loadWaypoints();
    $('.waypoint').hide(); //hide all waypoint markers
    if (waypoints.length >0) {
      
    }else{
      console.log("No Waypoints yet");
    }
    currentPlayer = getPlayer(1);
    SetUpPlayer(currentPlayer);
 
  } // end init


  initGame();
}); // end on ready