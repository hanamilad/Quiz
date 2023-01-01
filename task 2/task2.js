let QustionCount = document.querySelector(".QustionCount span");
let spans = document.querySelector(".spans");
let quiz_area = document.querySelector(".quiz_area");
let answers = document.querySelector(".answers");
let button = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let results = document.querySelector(".results");
let countdownelement = document.querySelector(".count-down");

let curent = 0;
let rightanswer = 0;
let countdown;

function request() {
  let requst = new XMLHttpRequest();
  requst.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let req = JSON.parse(this.responseText);
      let countreq = req.length;
      createspan(countreq);
      addQuestionData(req[curent], countreq);
      //   duration
      countduration(90, countreq);
      button.onclick = () => {
        let rightanswer = req[curent].right_answer;

        curent++;

        chekanswer(rightanswer, countreq);

        quiz_area.innerHTML = "";
        answers.innerHTML = "";
        addQuestionData(req[curent], countreq);

        //   handel sapans
        handelspans();
        // showresult
        showresult(countreq);
      };
    }
  };
  requst.open("get", "task2.json", true);
  requst.send();
}
request();

function createspan(num) {
  QustionCount.innerHTML = num;
  // create spans
  for (let i = 0; i < num; i++) {
    let span = document.createElement("span");
    if (i === 0) {
      span.className = "on";
    }
    spans.append(span);
  }
}
function addQuestionData(req, count) {
  //    add text question
  if (curent < count) {
    let QuestionTitle = document.createElement("h2");
    let QuestionText = document.createTextNode(req["title"]);
    QuestionTitle.appendChild(QuestionText);
    quiz_area.append(QuestionTitle);
    // add anwsers
    for (let i = 1; i <= 4; i++) {
      let divAnwser = document.createElement("div");
      let inputAnwser = document.createElement("input");
      inputAnwser.type = "radio";
      inputAnwser.id = `anwser_${i}`;
      inputAnwser.name = "anwser";
      inputAnwser.dataset.anwsre = req[`answer_${i}`];
      divAnwser.append(inputAnwser);

      if (i === 1) {
        inputAnwser.checked = true;
      }
      let labelAnwser = document.createElement("label");
      let labeltext = document.createTextNode(req[`answer_${i}`]);
      labelAnwser.htmlFor = `anwser_${i}`;
      labelAnwser.append(labeltext);
      divAnwser.append(labelAnwser);
      answers.append(divAnwser);
    }
  }
}

function chekanswer(ranswer, count) {
  let answers = document.getElementsByName("anwser");
  let chekedanswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      chekedanswer = answers[i].dataset.anwsre;
    }
  }
  if (ranswer === chekedanswer) {
    rightanswer++;
  }
}

function handelspans() {
  let allspan = document.querySelectorAll(".spans span");
  let arrayfromspan = Array.from(allspan);
  arrayfromspan.forEach((span, index) => {
    if (curent === index) {
      span.className = "on";
    }
  });
}

function showresult(countreq) {
  let theresult;
  if (countreq === curent) {
    quiz_area.remove();
    answers.remove();
    spans.remove();
    button.remove();
    countdownelement.remove();
    if (rightanswer > countreq / 2 && rightanswer < countreq) {
      theresult = `<span class="good">good</span>, ${rightanswer}from${countreq}`;
    } else if (rightanswer === countreq) {
      theresult = `<span class="perfect">perfect</span>,${rightanswer}from${countreq}`;
    } else {
      theresult = `<span class="Bad">Bad</span>,${rightanswer}from${countreq}`;
    }
    results.innerHTML = theresult;
    results.style.padding = "10px";
    results.style.backgroundColor = "white";
    results.style.marginTop = "10px";
  }
}

function countduration(duration, count) {
  if (curent < count) {
    let minutes, secandes;
    countdown = setInterval(function () {
      minutes = parseInt(duration / 60);
      secandes = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      secandes = secandes < 10 ? `0${secandes}` : secandes;
      countdownelement.innerHTML = `${minutes}:${secandes}`;

      if (--duration < 0) {
        clearInterval(countdown);
        console.log("finsh");
      }
    }, 1000);
  }
}
