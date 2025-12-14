let chart; // Global chart variable

// Format numbers in Indian style with commas
function formatIndianNumber(num) {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(num));
}

// Update labels based on investment type
function updateLabels() {
  const type = document.getElementById("investmentType").value;
  const amountLabel = document.getElementById("amountLabel");
  const amountInput = document.getElementById("amount");
  
  if (type === "sip") {
    amountLabel.textContent = "Monthly Investment Amount (₹):";
    amountInput.placeholder = "Enter monthly SIP amount (min ₹100)";
    amountInput.min = "100";
  } else {
    amountLabel.textContent = "Lump Sum Investment Amount (₹):";
    amountInput.placeholder = "Enter one-time investment amount";
    amountInput.min = "1000";
  }
  
  // Clear validation error when changing type
  document.getElementById("validationError").textContent = "";
}

// Validate input values
function validateInputs(amount, years, annualRate, type) {
  const errors = [];
  
  if (isNaN(amount) || amount <= 0) {
    errors.push("Please enter a valid investment amount.");
  }
  
  if (type === "sip" && amount < 100) {
    errors.push("Minimum SIP amount is ₹100.");
  }
  
  if (type === "lumpSum" && amount < 1000) {
    errors.push("Minimum lump sum amount is ₹1,000.");
  }
  
  if (amount > 10000000) {
    errors.push("Maximum investment amount is ₹1 crore.");
  }
  
  if (isNaN(years) || years < 1 || years > 50) {
    errors.push("Investment period must be between 1-50 years.");
  }
  
  if (isNaN(annualRate) || annualRate < 1 || annualRate > 30) {
    errors.push("Expected return must be between 1-30% per annum.");
  }
  
  return errors;
}

function calculateReturns() {
  const type = document.getElementById("investmentType").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const years = parseFloat(document.getElementById("years").value);
  const annualRate = parseFloat(document.getElementById("rate").value);
  const errorDiv = document.getElementById("validationError");

  // Clear previous errors
  errorDiv.textContent = "";

  // Validate inputs
  const errors = validateInputs(amount, years, annualRate, type);
  if (errors.length > 0) {
    errorDiv.innerHTML = errors.join("<br>");
    return;
  }

  const rate = annualRate / 100;
  let totalInvested, futureValue;

  if (type === "sip") {
    // SIP calculation: Future Value of Annuity Due
    const monthlyRate = rate / 12;
    const months = years * 12;
    
    if (monthlyRate === 0) {
      futureValue = amount * months;
    } else {
      futureValue = amount * (((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate)) / monthlyRate);
    }
    totalInvested = amount * months;
  } else {
    // Lump sum calculation: Compound Interest
    futureValue = amount * Math.pow(1 + rate, years);
    totalInvested = amount;
  }

  const gain = futureValue - totalInvested;
  
  // Display results with Indian number formatting
  document.getElementById("totalInvested").textContent = formatIndianNumber(totalInvested);
  document.getElementById("futureValue").textContent = formatIndianNumber(futureValue);
  document.getElementById("gain").textContent = formatIndianNumber(gain);
  
  // Display investment details
  document.getElementById("displayInvestmentType").textContent = type === "sip" ? "SIP (Monthly)" : "Lump Sum (One Time)";
  document.getElementById("displayDuration").textContent = years + " year" + (years > 1 ? "s" : "");
  document.getElementById("displayReturn").textContent = annualRate + "% per annum";
  
  if (type === "sip") {
    document.getElementById("displayMonthly").textContent = "₹" + formatIndianNumber(amount);
    document.getElementById("monthlyDetail").style.display = "block";
  } else {
    document.getElementById("monthlyDetail").style.display = "none";
  }
  
  // Show investment details
  document.getElementById("investmentDetails").style.display = "block";
  
  // Draw chart
  drawChart(totalInvested, gain);

  // Show output section and adjust layout
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

  const totalValue = invested + gain;
  const investedPercentage = ((invested / totalValue) * 100).toFixed(1);
  const gainPercentage = ((gain / totalValue) * 100).toFixed(1);

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [
        `Invested Amount (${investedPercentage}%)`, 
        `Expected Returns (${gainPercentage}%)`
      ],
      datasets: [{
        data: [invested, gain],
        backgroundColor: ["#3f51b5", "#4caf50"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
        hoverBackgroundColor: ["#303f9f", "#388e3c"],
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { 
          position: "bottom",
          labels: {
            padding: 15,
            font: { size: 12 },
            usePointStyle: true,
          }
        },
        title: { 
          display: true, 
          text: "Investment Breakdown",
          font: { size: 14, weight: 'bold' },
          padding: { top: 10, bottom: 20 }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = '₹' + formatIndianNumber(context.raw);
              return label + ': ' + value;
            }
          }
        }
      },
      cutout: '50%',
      layout: {
        padding: 10
      }
    }
  });
}

function clearFld() {
  // Clear form inputs
  document.getElementById("amount").value = "";
  document.getElementById("years").value = "";
  document.getElementById("rate").value = "";
  document.getElementById("investmentType").value = "sip";
  
  // Reset labels
  updateLabels();
  
  // Clear validation errors
  document.getElementById("validationError").textContent = "";
  
  // Clear results
  document.getElementById("totalInvested").textContent = "0";
  document.getElementById("futureValue").textContent = "0";
  document.getElementById("gain").textContent = "0";
  
  // Hide investment details
  document.getElementById("investmentDetails").style.display = "none";

  // Hide output sections
  const outputBox = document.querySelector(".calout.open");
  if (outputBox) outputBox.classList.remove("open");

  const chartBox = document.getElementById("mutualFundChart");
  if (chartBox) chartBox.classList.remove("open");

  // Reset layout
  const formContainer = document.getElementById("mfcalcform");
  formContainer.classList.remove("col-lg-8");
  formContainer.classList.add("col-lg-12");

  const chartContainer = document.getElementById("mfchart");
  chartContainer.classList.remove("col-lg-4");

  // Destroy chart
  if (chart) {
    chart.destroy();
    chart = null;
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  updateLabels();
});
