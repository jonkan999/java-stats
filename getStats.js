const coffeString = document.getElementById("coffeString");

// Function to calculate the percentage of the day passed in GMT+1
function calculatePercentageOfTheDay() {
  const now = new Date();
  const gmt1Offset = 60 * 60; // Offset in minutes for GMT+1
  const totalSecondsInDay = 24 * 60 * 60;
  const currentSeconds =
    now.getUTCHours() * 60 * 60 +
    now.getUTCMinutes() * 60 +
    now.getUTCSeconds() -
    gmt1Offset;
  const percentageOfDayPassed = (currentSeconds / totalSecondsInDay) * 100;
  return percentageOfDayPassed;
}

// Function to display the value and update it periodically
function updateAndDisplayValue() {
  let value = Math.round(calculatePercentageOfTheDay() * 3000); // Initial value

  setInterval(function () {
    value = Math.round(calculatePercentageOfTheDay() * 3000);
    console.log(`Value: ${value}`);
    coffeString.innerHTML = value.toLocaleString(); // Update the displayed value in the HTML
  }, 2000); // Update value around once every 3 seconds

  // Return the initial value
  return value.toLocaleString();
}

// Call the function to start the updates
coffeString.innerHTML = updateAndDisplayValue();
