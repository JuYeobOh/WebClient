#REACT 연결 성공

# WebClient
웹클라이언트컴퓨팅 중간 과제

##추천 여행지 버튼 생성
```
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
```

##조건을 만족할 때까지 반복적으로 3개씩 제시
```
function generateNewButtons() {
  var buttonsContainer = document.getElementById("buttons-container");
  buttonsContainer.innerHTML = "";

  var availableDestinations = destinations.filter(function(destination) {
    // 이미 추천 리스트에 있는 destination은 제외
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

    //중복되지 않도록 버튼을 생성할 때 사용
    availableDestinations.splice(randomIndex, 1);
  }

  selectedDestinations.forEach(function(destination) {
    var button = createButton(destination);
    buttonsContainer.appendChild(button);
  });
}
```
같은 목적지가 한번에 추천되지 않아야 하고, 이미 추천된 목적지는 다시 추천되면 안된다 .

#지금까지 선택된 객체들을 나열하고, 예약하기 버튼과 연결
```
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
```

