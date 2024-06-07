// document.querySelectorAll('input[name="durationType"]').forEach((radio) => {
//   radio.addEventListener("change", function () {
//     document.getElementById("duration").value = "";
//   });
// });

// var principalAmount;
// var interestEarned;

// function calculateFdMaturity() {
//     principalAmount  = parseFloat(
//     document.getElementById("principalAmount").value
//   );
//   const annualInterestRate = parseFloat(
//     document.getElementById("interestRate").value
//   );
//   const durationType = document.querySelector(
//     'input[name="durationType"]:checked'
//   ).value;
//   let duration = parseFloat(document.getElementById("duration").value);

//   if (isNaN(principalAmount) || isNaN(annualInterestRate) || isNaN(duration)) {
//     alert("Please enter valid inputs");
//     return;
//   }

//   let totalDurationInYears;
//   if (durationType === "years") {
//     totalDurationInYears = duration;
//   } else if (durationType === "months") {
//     totalDurationInYears = duration / 12;
//   } else {
//     totalDurationInYears = duration / 365;
//   }

//   const maturityAmount =
//     principalAmount *
//     Math.pow(1 + annualInterestRate / 100, totalDurationInYears);

//   document.getElementById("result").innerText = maturityAmount.toFixed(2);

//    interestEarned = maturityAmount - principalAmount;

//   var opnbtn = document.getElementsByClassName("calout")[0];
//   opnbtn.classList.add("open");
// }

// function clearFld() {
//   var clsbtn = document.getElementsByClassName("calout open")[0];
//   clsbtn.classList.remove("open");
// }



// google.charts.load('current', { 'packages': ['corechart'] });
// google.charts.setOnLoadCallback(drawChart);
// function drawChart() {

//   var data = google.visualization.arrayToDataTable([
//     ['Task', 'Hours per Day'],
//     ['Principle', principalAmount],
//     ['Interest', interestEarned]
//   ]);

//   var options = {
//     title: 'My Daily Activities'
//   };

//   var chart = new google.visualization.PieChart(document.getElementById('piechart'));

//   chart.draw(data, options);
// }



document.querySelectorAll('input[name="durationType"]').forEach((radio) => {
    radio.addEventListener("change", function () {
        document.getElementById("duration").value = "";
    });
});

var principalAmount;
var interestEarned;
var chartUi;

function calculateFdMaturity() {
    principalAmount = parseFloat(document.getElementById("principalAmount").value);
    const annualInterestRate = parseFloat(document.getElementById("interestRate").value);
    const durationType = document.querySelector('input[name="durationType"]:checked').value;
    let duration = parseFloat(document.getElementById("duration").value);

    if (isNaN(principalAmount) || isNaN(annualInterestRate) || isNaN(duration)) {
        alert("Please enter valid inputs");
        return;
    }

    let totalDurationInYears;
    if (durationType === "years") {
        totalDurationInYears = duration;
    } else if (durationType === "months") {
        totalDurationInYears = duration / 12;
    } else {
        totalDurationInYears = duration / 365;
    }

    const n = 4; // Quarterly compounding
    const r = annualInterestRate / 100;
    const t = totalDurationInYears;

    const maturityAmount = principalAmount * Math.pow((1 + r / n), n * t);
    interestEarned = maturityAmount - principalAmount;

    document.getElementById("principle").innerText = principalAmount.toFixed(2);
    document.getElementById("interest").innerText = interestEarned.toFixed(2);
    document.getElementById("total").innerText = maturityAmount.toFixed(2);


    var opnbtn = document.getElementsByClassName("calout")[0];
    opnbtn.classList.add("open");

    drawChart();

    chartUi = document.getElementById('piechart');
    chartUi.classList.add("open")


}

function clearFld() {
    var clsbtn = document.getElementsByClassName("calout open")[0];
    clsbtn.classList.remove("open");
    document.getElementById("result").innerText = "";
    document.getElementById("piechart").innerHTML = "";
    chartUi.classList.remove("open")
}

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    if (typeof principalAmount === 'undefined' || typeof interestEarned === 'undefined') {
        return;
    }

    var data = google.visualization.arrayToDataTable([
        ['Component', 'Amount'],
        ['Principal', principalAmount],
        ['Interest', interestEarned]
    ]);

    var options = {
        title: 'FD Breakdown',
        is3D: true
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}