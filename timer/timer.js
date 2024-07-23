document.addEventListener('DOMContentLoaded', function() {
  let timer;
  const timerDisplay = document.getElementById('timer');
  const startButton = document.getElementById('start-timer');
  const stopButton = document.getElementById('stop-timer');
  const treeContainer = document.getElementById('tree');
  const totalTime = 1 * 60; // 25 minutes in seconds
  let timeLeft = totalTime;
  const leaves = 1; // Total number of leaves

  function addLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    // Randomly position the leaf on the tree
    leaf.style.top = `${Math.random() * 80 + 10}%`;
    leaf.style.left = `${Math.random() * 80 + 10}%`;
    treeContainer.appendChild(leaf);
  }

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    if (timeLeft % 60 === 0 && timeLeft !== totalTime) { // Add a leaf every minute
      addLeaf();
    }

    if (timeLeft > 0) {
      timeLeft--;
    } else {
      clearInterval(timer);
      timerDisplay.textContent = "Time's up!";
      // Reset tree
      setTimeout(() => {
        while (treeContainer.firstChild) {
          treeContainer.removeChild(treeContainer.firstChild);
        }
        timeLeft = totalTime;
        updateTimer();
      }, 5000); // Show "Time's up!" for 5 seconds
    }
  }

  startButton.addEventListener('click', function() {
    timer = setInterval(updateTimer, 1000);
  });

  stopButton.addEventListener('click', function() {
    clearInterval(timer);
    timeLeft = totalTime; // Reset timer
    while (treeContainer.firstChild) {
      treeContainer.removeChild(treeContainer.firstChild);
    }
    updateTimer();
  });

  updateTimer(); // Initialize timer display
});
