let chart; // Chart instance

function calculateEMI() {
    // Get the input values
    let principal = parseFloat(document.getElementById('principal').value);
    let annualRate = parseFloat(document.getElementById('rate').value);
    let tenure = parseFloat(document.getElementById('tenure').value);

    // Convert annual interest rate to monthly and tenure to months
    let monthlyRate = annualRate / (12 * 100);
    let numberOfMonths = tenure * 12;

    // EMI calculation formula
    let emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    // Display the monthly EMI result
    if (isNaN(emi) || !isFinite(emi)) {
      alert("Please enter valid inputs");
      document.getElementById('detail-result').innerHTML = '';
      return;
    }

    // Calculate total amounts
    let totalAmount = emi * numberOfMonths;
    let totalInterestPaid = totalAmount - principal;

    // Update values in the DOM
    document.getElementById('principalAmt').innerText = principal.toLocaleString('en-IN');
    document.getElementById('emiAmt').innerText = Math.round(emi).toLocaleString('en-IN');
    document.getElementById('totalAmount').innerText = Math.round(totalAmount).toLocaleString('en-IN');
    document.getElementById('interestAmt').innerText = Math.round(totalInterestPaid).toLocaleString('en-IN');

    // Show output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.add("open");

    const chartBox = document.getElementById("emiChart");
    chartBox.classList.add("open");

    const formContainer = document.getElementById("emicalcform");
    formContainer.classList.remove("col-lg-12");
    formContainer.classList.add("col-lg-8");

    const chartContainer = document.getElementById("emichart");
    chartContainer.classList.add("col-lg-4");

    // Calculate and display the detailed result
    let detailResult = '<table><tr><th>Month</th><th>Principal Paid</th><th>Interest Paid</th><th>Remaining Balance</th></tr>';
    let remainingBalance = principal;
    for (let i = 1; i <= numberOfMonths; i++) {
      let interestPaid = remainingBalance * monthlyRate;
      let principalPaid = emi - interestPaid;
      remainingBalance -= principalPaid;
      detailResult += `<tr><td>${i}</td><td>₹${principalPaid.toFixed(2)}</td><td>₹${interestPaid.toFixed(2)}</td><td>₹${remainingBalance.toFixed(2)}</td></tr>`;
    }
    detailResult += '</table>';
    document.getElementById('detail-result').innerHTML = detailResult;

    // Draw chart
    const ctx = document.getElementById("emiChart").getContext("2d");
    if (chart) chart.destroy(); // Clean previous chart

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Principal Amount", "Interest Amount"],
            datasets: [
                {
                    data: [principal, totalInterestPaid],
                    backgroundColor: ["#4e79a7", "#f28e2b"],
                }
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
    const chartBox = document.getElementById("emiChart");
    if (chartBox) chartBox.classList.remove("open");

    // Reset form container layout
    const formContainer = document.getElementById("emicalcform");
    if (formContainer) {
        formContainer.classList.remove("col-lg-8");
        formContainer.classList.add("col-lg-12");
    }

    // Reset chart container layout
    const chartContainer = document.getElementById("emichart");
    if (chartContainer) {
        chartContainer.classList.remove("col-lg-4");
    }

    // Reset input fields to default values
    document.getElementById("principal").value = "100000";
    document.getElementById("rate").value = "8";
    document.getElementById("tenure").value = "5";

    // Clear result fields
    document.getElementById("principalAmt").innerText = "";
    document.getElementById("emiAmt").innerText = "";
    document.getElementById("totalAmount").innerText = "";
    document.getElementById("interestAmt").innerText = "";
    document.getElementById("detail-result").innerHTML = "";

    // Destroy chart if it exists
    if (chart) {
        chart.destroy();
        chart = null;
    }
}