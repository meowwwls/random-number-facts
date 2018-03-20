'use strict';

(function randomNumberFacts() {
  var outputGraph = document.getElementById('output');
  var textTarget = document.getElementById('text');
  var numTarget = document.getElementById('num');
  var trigger = document.getElementById('trigger');
  var body = document.body;

  var getRandomNum = function getRandomNum(max) {
    return Math.floor(Math.random() * (max + 1));
  };

  var updateFactDisplay = function updateFactDisplay(data) {
    var sliceAt = data.number.toString().length + 1;
    textTarget.textContent = data.text.slice(sliceAt);
  };

  var updateNumberDisplay = function updateNumberDisplay(data) {
    numTarget.textContent = data.number;
    numTarget.classList.add('slide-in');
  };

  var updateHue = function updateHue(hue) {
    return body.style.setProperty('--hue', hue);
  };

  var getNewFact = function getNewFact(num) {
    var number = getRandomNum(num);

    outputGraph.classList.remove('fade-in');
    numTarget.classList.remove('slide-in');

    $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/http://numbersapi.com/' + number,
      type: 'GET',
      success: function success(response, textStatus, xhr) {
        console.log('Response code: ', xhr.status);
        if (xhr.status === 200) {
          console.log(response);
        }
      }
    });
    // fetch(
    //   `https://cors-anywhere.herokuapp.com/https://css-tricks.com/react-state-from-the-ground-up/`
    // )
    // .then(blob => blob)
    // .then(response => {
    // console.log(response.body.json());
    // outputGraph.classList.add('fade-in');
    // console.log(data.body);
    // updateFactDisplay(data);
    // updateNumberDisplay(data);
    // updateHue(number);
    // })
    // .catch(e => console.error(e));
  };

  trigger.addEventListener('click', function () {
    return getNewFact(360);
  });

  getNewFact(360);
})();