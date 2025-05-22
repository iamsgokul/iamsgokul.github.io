let chart; // Global chart variable

function calculateReturns() {
  const type = document.getElementById("investmentType").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const years = parseFloat(document.getElementById("years").value);
  const annualRate = parseFloat(document.getElementById("rate").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(amount) || isNaN(years) || isNaN(annualRate)) {
    resultDiv.textContent = "Please enter valid values.";
    return;
  }

  const rate = annualRate / 100;
  let totalInvested, futureValue;

  if (type === "sip") {
    const monthlyRate = rate / 12;
    const months = years * 12;
    futureValue = amount * (((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate)) / monthlyRate);
    totalInvested = amount * months;
  } else {
    futureValue = amount * Math.pow(1 + rate, years);
    totalInvested = amount;
  }

  const gain = futureValue - totalInvested;
  drawChart(totalInvested, gain);

  // Display results
  document.getElementById("totalInvested").textContent = totalInvested.toFixed(2);
  document.getElementById("futureValue").textContent = futureValue.toFixed(2);
  document.getElementById("gain").textContent = gain.toFixed(2);

  // Show output section
  const outputBox = document.querySelector(".calout");
  if (outputBox) outputBox.classList.add("open");

  const chartBox = document.getElementById("mutualFundChart");
  if (chartBox) chartBox.classList.add("open");

  const formContainer = document.getElementById("mfcalcform");
  formContainer.classList.remove("col-lg-12");
  formContainer.classList.add("col-lg-8");

  const chartContainer = document.getElementById("mfchart");
  chartContainer.classList.add("col-lg-4");
}

function drawChart(invested, gain) {
  const ctx = document.getElementById("mutualFundChart").getContext("2d");

  if (chart) {
    chart.destroy(); // Destroy existing chart before creating new one
  }

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Invested Amount", "Gain (Returns)"],
      datasets: [{
        data: [invested, gain],
        backgroundColor: ["#4e73df", "#1cc88a"],
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Investment vs Returns" }
      }
    }
  });
}

function clearFld() {
  const outputBox = document.querySelector(".calout.open");
  if (outputBox) outputBox.classList.remove("open");

  const chartBox = document.getElementById("mutualFundChart");
  if (chartBox) chartBox.classList.remove("open");

  const formContainer = document.getElementById("mfcalcform");
  formContainer.classList.remove("col-lg-8");
  formContainer.classList.add("col-lg-12");

  const chartContainer = document.getElementById("mfchart");
  chartContainer.classList.remove("col-lg-4");

  document.getElementById("totalInvested").textContent = "";
  document.getElementById("futureValue").textContent = "";
  document.getElementById("gain").textContent = "";

  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "";

  if (chart) {
    chart.destroy();
    chart = null;
  }

  // Optional: Clear input fields
  document.getElementById("amount").value = "";
  document.getElementById("years").value = "";
  document.getElementById("rate").value = "";
  document.getElementById("investmentType").value = "sip";
}
