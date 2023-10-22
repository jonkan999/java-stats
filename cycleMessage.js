messageDelivered = `<div class="delivered">
<span class="left-col">Levererade hittills idag:</span>
<span class="kpi-string" id="coffeString"></span>
<div class="pulsing-circle"></div>
</div>
<div class="expected">
<span class="left-col">av förväntade:</span>
<span class="kpi-string">127 000</span>
</div>
<div class="cancellations">
<span class="left-col">Avbokningar hittills idag:</span>
<span class="kpi-string">325</span>
</div>
<div class="delivered">
<span class="left-col">Levererade igår:</span>
<span class="kpi-string"> 150 000</span>
</div>
<div class="expected"></div>
<div class="cancellations">
<span class="left-col">Avbokningar igår:</span>
<span class="kpi-string">521</span>
</div>
<div class="delivered">
<span class="left-col">Levererade samma dag föregående vecka:</span>
<span class="kpi-string"> 123 000</span>
</div>
<div class="expected"></div>
<div class="cancellations">
<span class="left-col">Avbokningar samma dag föregående vecka:</span>
<span class="kpi-string">400</span>
</div>`;
messageRating = `        <div class="delivered">
<span class="left-col">Omdömen hittills idag:</span>
<span class="kpi-string">521</span>
<div class="pulsing-circle"></div>
</div>
<div class="expected">
<span class="left-col">snittbetyg:</span>
<span class="kpi-string">4,2 / 5</span>
</div>
<div class="cancellations">
<span class="left-col">10% bättre än snittet senaste 30 dagarna</span>
<span class="kpi-string">NICE! &#128512;</span>
</div>`;

const mainMessage = document.getElementById("mainmessage");
let isDelivered = true;

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

// Function to update and display the value
function updateAndDisplayValue() {
  const coffeString = document.getElementById("coffeString");
  const value = Math.round(calculatePercentageOfTheDay() * 3000);
  if (coffeString) {
    coffeString.innerHTML = value.toLocaleString(); // Update the displayed value in the HTML
  }
}

// Function to switch between messageDelivered and messageRating
function switchMessages() {
  if (isDelivered) {
    mainMessage.innerHTML = messageRating;
    updateAndDisplayValue(); // Update the value when messageDelivered is active
  } else {
    mainMessage.innerHTML = messageDelivered;
  }
  isDelivered = !isDelivered;
}

// Initial setup

mainMessage.innerHTML = messageDelivered;
updateAndDisplayValue();

// Start cycling the messages every 10 seconds
setInterval(switchMessages, 10000);

// Update coffeeString every 2 seconds when messageDelivered is active
setInterval(function () {
  if (isDelivered) {
    updateAndDisplayValue();
  }
}, 2000);
