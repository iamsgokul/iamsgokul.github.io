let chart; // Chart instance

// Format number in Indian currency style (1,00,000.00)
function formatIndianCurrency(num) {
    const fixed = num.toFixed(2);
    const [intPart, decPart] = fixed.split('.');
    const lastThree = intPart.slice(-3);
    const otherNumbers = intPart.slice(0, -3);
    const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + (otherNumbers ? ',' : '') + lastThree;
    return formatted + '.' + decPart;
}

function calculateSimpleInterest() {
  const principalInput = parseFloat(document.getElementById("principal").value);
  const rate = parseFloat(document.getElementById("rate").value);
  const time = parseFloat(document.getElementById("time").value);

  if (isNaN(principalInput) || isNaN(rate) || isNaN(time)) {
    document.getElementById("result").textContent =
      "Please fill in all fields with valid numbers.";
    return;
  }

  const principal = principalInput;
  const interest = (principal * rate * time) / 100;
  const total = principal + interest;

  // Update values in the DOM
  document.getElementById("resPrinciple").textContent = formatIndianCurrency(principal);
  document.getElementById("resInterest").textContent = formatIndianCurrency(interest);
  document.getElementById("resTotal").textContent = formatIndianCurrency(total);

  // Show output section
  const outputBox = document.getElementsByClassName("calout")[0];
  if (outputBox) outputBox.classList.add("open");

  const chartBox = document.getElementById("interestChart");
  chartBox.classList.add("open");

  const formContainer = document.getElementById("siccalcform");
  formContainer.classList.remove("col-lg-12");
  formContainer.classList.add("col-lg-8");

  const chartContainer = document.getElementById("sicchart");
  chartContainer.classList.add("col-lg-4");

  // Draw chart
  const ctx = document.getElementById("interestChart").getContext("2d");
  if (chart) chart.destroy(); // Clean previous chart

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [
        {
          data: [principal, interest],
          backgroundColor: ["#4e79a7", "#f28e2b"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Principal vs Interest" },
      },
    },
  });
}

function clearFld() {
  // Hide output section
  const outputBox = document.getElementsByClassName("calout")[0];
  if (outputBox) outputBox.classList.remove("open");

  // Hide chart
  const chartBox = document.getElementById("interestChart");
  if (chartBox) chartBox.classList.remove("open");

  // Reset form container layout
  const formContainer = document.getElementById("siccalcform");
  if (formContainer) {
    formContainer.classList.remove("col-lg-8");
    formContainer.classList.add("col-lg-12");
  }

  // Reset chart container layout
  const chartContainer = document.getElementById("sicchart");
  if (chartContainer) {
    chartContainer.classList.remove("col-lg-4");
  }

  // Clear input fields
  const principalField = document.getElementById("principal");
  const rateField = document.getElementById("rate");
  const timeField = document.getElementById("time");
  
  if (principalField) principalField.value = "";
  if (rateField) rateField.value = "";
  if (timeField) timeField.value = "";

  // Clear result fields
  const resPrincipleField = document.getElementById("resPrinciple");
  const resInterestField = document.getElementById("resInterest");
  const resTotalField = document.getElementById("resTotal");
  
  if (resPrincipleField) resPrincipleField.textContent = "";
  if (resInterestField) resInterestField.textContent = "";
  if (resTotalField) resTotalField.textContent = "";

  // Destroy chart if it exists
  if (chart) {
    chart.destroy();
    chart = null;
  }
}
