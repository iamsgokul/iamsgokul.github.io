let chart; // Chart instance

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
  document.getElementById("principle").textContent = principal.toFixed(2);
  document.getElementById("interest").textContent = interest.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);

  // Show output section
  const outputBox = document.getElementsByClassName("calout")[0];
  if (outputBox) outputBox.classList.add("open");

  const chartBox = document.getElementById("interestChart");
  chartBox.classList.add("open");

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
  var clsbtn = document.getElementsByClassName("calout open")[0];
  clsbtn.classList.remove("open");
  var chartClose = document.getElementById("simpleInterestChart");
  chartClose.classList.remove("open");
  document.getElementById("principle").innerText = "";
  document.getElementById("interest").innerHTML = "";
  document.getElementById("total").innerText = "";
}
