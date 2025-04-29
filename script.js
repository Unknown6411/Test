// Initialize EmailJS with your User ID
emailjs.init('vBNicaZFJUbvoBTAk');

let stage = 1;
let noClickCount = 0;
let yesBtn = document.getElementById("yes-btn");
let noBtn = document.getElementById("no-btn");

// Start: Tap to open the letter
const startContainer = document.getElementById("start-container");
const letter = document.getElementById("letter");

startContainer.addEventListener("click", function() {
    letter.classList.add("open");
    setTimeout(() => {
        startContainer.style.display = "none";
        document.getElementById("question-container").style.display = "block";
    }, 1000);
});

function handleYes() {
  if (stage === 1) {
    sendEmailFirstQuestion("Answered YES to 'May jowa ka?'");
    showMessage("Thanks for the time");
  } else if (stage === 2) {
    sendEmailSecondQuestion("Answered YES to 'Pwedeng manligaw?'");
    showYayScreen();
  }
}

function handleNo() {
  if (stage === 1) {
    stage = 2;
    document.getElementById("question").innerText = "Pwedeng manligaw?";
    noClickCount = 0;
  } else if (stage === 2) {
    noClickCount++;
    growYesButton();
    if (noClickCount >= 5) {
      showMessage("Thank you for your time");
    }
  }
}

function showMessage(text) {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("message-container").style.display = "block";
  document.getElementById("message").innerText = text;
}

function showYayScreen() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("yay-container").style.display = "block";
  createHearts();
}

function growYesButton() {
  let currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = (currentSize + 5) + "px";
}

function createHearts() {
  const heartContainer = document.getElementById('hearts');
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
    heartContainer.appendChild(heart);
  }
}

// Send Email for First Question (only YES)
function sendEmailFirstQuestion(answer) {
  const templateParams = {
    to_email: 'kng20817@gmil.com',
    answer: answer
  };

  emailjs.send('service_oqgv8xw', 'template_ft5dtzg', templateParams)
    .then(function(response) {
      console.log('Email sent to first gmail:', response.status, response.text);
    }, function(error) {
      console.log('FAILED sending to first gmail...', error);
    });
}

// Send Email for Second Question (only YES)
function sendEmailSecondQuestion(answer) {
  const templateParams = {
    to_email: 'hello1236yy@gmail.com',
    answer: answer
  };

  emailjs.send('service_yc4ymbf', 'template_iesebzx', templateParams)
    .then(function(response) {
      console.log('Email sent to second gmail:', response.status, response.text);
    }, function(error) {
      console.log('FAILED sending to second gmail...', error);
    });
}