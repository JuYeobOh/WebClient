var Destination = function(name, time, description) {
  this.name = name;
  this.time = time;
  this.description = description;
};

var destination1 = new Destination("블루모스크", 2, "블루모스크 설명.");
var destination2 = new Destination("핑크모스크", 3, "핑크모스크 설명.");
var destination3 = new Destination("자스민 마사지", 1, "자스민 마사지 설명.");
var destination4 = new Destination("워터프론트", 3, "워터프론트 설명.");
var destination5 = new Destination("필라피노 야시장", 4, "야시장 설명.");
var destination6 = new Destination("반딧불 투어", 1, "반딧불 투어 설명.");
var destination7 = new Destination("스노쿨링", 2, "스노쿨링 설명.");
var destination8 = new Destination("섬투어", 6, "섬투어 설명.");
var destination9 = new Destination("호텔", 1, "호텔 설명.");
var destination10 = new Destination("액티비티", 1, "액티비티 설명.");

var destinations = [destination1, destination2, destination3, destination4, destination5, destination6, destination7, destination8, destination9, destination10];

var getRecommendationButton = document.getElementById("get-recommendation");

var recommendationButton = document.getElementById("recommendation-button");
recommendationButton.addEventListener("click", generateNewButtons);

function createButton(destination) {
  var button = document.createElement("button");
  button.innerHTML = destination.name;
  button.className = "destination-button";
  button.addEventListener("click", function() {
    if (remainingTime >= destination.time) {
      recommendedDestinations.push(destination);
      remainingTime -= destination.time;
      remainingTimeDisplay.textContent = remainingTime + " hours";
      generateNewButtons();
    }
  });
  return button;
}

function generateNewButtons() {
  var buttonsContainer = document.getElementById("buttons-container");
  buttonsContainer.innerHTML = "";

  var availableDestinations = destinations.filter(function(destination) {
    // 이미 추천 리스트에 있는 destination은 제외합니다
    return destination.time <= remainingTime && !recommendedDestinations.includes(destination);
  });

  if (availableDestinations.length === 0 || remainingTime < 0) {
    displaySelectedDestinations();
    return;
  }

  var selectedDestinations = [];

  for (var i = 0; i < 3; i++) {
    var randomIndex = Math.floor(Math.random() * availableDestinations.length);
    var selectedDestination = availableDestinations[randomIndex];
    selectedDestinations.push(selectedDestination);

    // 추천 리스트에 추가하는 것이 아니라, 일시적으로 선택된 리스트에 추가합니다.
    // 이는 중복되지 않도록 버튼을 생성할 때 사용됩니다.
    availableDestinations.splice(randomIndex, 1);
  }

  selectedDestinations.forEach(function(destination) {
    var button = createButton(destination);
    buttonsContainer.appendChild(button);
  });
}

function displaySelectedDestinations() {
  var selectedDestinations = recommendedDestinations;
  var selectedDestinationsList = document.createElement("ul");

  selectedDestinations.forEach(function(destination) {
    var listItem = document.createElement("li");
    var text = document.createTextNode(destination.name + " (" + destination.time + "시간)");
    listItem.appendChild(text);

    var reserveButton = document.createElement("button");
    reserveButton.innerHTML = "예약하기";
    reserveButton.className = "reserve-button";
    reserveButton.addEventListener("click", function() {
      // 서버부터 연결하고 구현.
    });
    listItem.appendChild(reserveButton);

    selectedDestinationsList.appendChild(listItem);
  });

  var selectedDestinationsContainer = document.getElementById("selected-destinations");
  selectedDestinationsContainer.innerHTML = "";
  selectedDestinationsContainer.appendChild(selectedDestinationsList);
}


var recommendedDestinations = [];
var remainingTime = 11;
var remainingTimeDisplay = document.getElementById("remaining-time");

generateNewButtons();
