document.querySelectorAll('input[name="durationType"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("duration").value = "";
  });
});

function calculateFdMaturity() {
  const principalAmount = parseFloat(
    document.getElementById("principalAmount").value
  );
  const annualInterestRate = parseFloat(
    document.getElementById("interestRate").value
  );
  const durationType = document.querySelector(
    'input[name="durationType"]:checked'
  ).value;
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

  const maturityAmount =
    principalAmount *
    Math.pow(1 + annualInterestRate / 100, totalDurationInYears);

  document.getElementById("result").innerText = maturityAmount.toFixed(2);

  var opnbtn = document.getElementsByClassName("calout")[0];
  opnbtn.classList.add("open");
}

function clearFld() {
  var clsbtn = document.getElementsByClassName("calout open")[0];
  clsbtn.classList.remove("open");
}
