(function() {
  'use strict';

  const outputGraph = document.getElementById('output');
  const textTarget = document.getElementById('text');
  const numTarget = document.getElementById('num');
  const trigger = document.getElementById('trigger');
  const body = document.body;

  const getRandomNum = max => Math.floor(Math.random() * (max + 1));

  const getNewFact = num => {
    const number = getRandomNum(num);

    outputGraph.classList.remove('fade-in');
    numTarget.classList.remove('slide-in');

    fetch(`http://numbersapi.com/${number}?json`)
      .then(blob => blob.json())
      .then(data => {
        outputGraph.classList.add('fade-in');

        updateFactDisplay(data);
        updateNumberDisplay(data);
        updateHue(number);
      })
      .catch(e => console.error(e));
  };

  const updateFactDisplay = data => {
    const sliceAt = data.number.toString().length + 1;
    textTarget.textContent = data.text.slice(sliceAt);
  };

  const updateNumberDisplay = data => {
    numTarget.textContent = data.number;
    numTarget.classList.add('slide-in');
  };

  const updateHue = hue => body.style.setProperty('--hue', hue);

  trigger.addEventListener('click', () => getNewFact(360));

  getNewFact(360);
})();
