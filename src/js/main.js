(function randomNumberFacts() {
  const outputGraph = document.getElementById('output');
  const textTarget = document.getElementById('text');
  const numTarget = document.getElementById('num');
  const trigger = document.getElementById('trigger');
  const body = document.body;

  const getRandomNum = max => Math.floor(Math.random() * (max + 1));

  const updateFactDisplay = data => {
    const sliceAt = data.number.toString().length + 1;
    textTarget.textContent = data.text.slice(sliceAt);
  };

  const updateNumberDisplay = data => {
    numTarget.textContent = data.number;
    numTarget.classList.add('slide-in');
  };

  const updateHue = hue => body.style.setProperty('--hue', hue);

  const getNewFact = num => {
    const number = getRandomNum(num);

    outputGraph.classList.remove('fade-in');
    numTarget.classList.remove('slide-in');

    fetch(
      `https://cors-anywhere.herokuapp.com/http://numbersapi.com/${number}?json`
    )
      .then(response => response.json())
      .then(data => {
        outputGraph.classList.add('fade-in');
        updateFactDisplay(data);
        updateNumberDisplay(data);
        updateHue(number);
      })
      .catch(e => console.error(e));
  };

  trigger.addEventListener('click', () => getNewFact(360));

  getNewFact(360);
})();
