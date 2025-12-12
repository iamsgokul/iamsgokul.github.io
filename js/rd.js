let chart; // Chart instance

function calculateMaturity() {
    const monthlyDeposit = parseFloat(document.getElementById('monthlyDeposit').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value);
    const duration = parseInt(document.getElementById('duration').value);

    // Input validation
    if (isNaN(monthlyDeposit) || isNaN(annualInterestRate) || isNaN(duration)) {
        alert('Please fill in all fields with valid numbers.');
        return;
    }

    // Calculate RD maturity using compound interest formula
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    let maturityAmount = 0;

    // Calculate maturity amount for recurring deposit
    for (let i = 0; i < duration; i++) {
        maturityAmount += monthlyDeposit * Math.pow(1 + monthlyInterestRate, duration - i);
    }

    const totalDeposited = monthlyDeposit * duration;
    const interestEarned = maturityAmount - totalDeposited;

    // Update values in the DOM
    document.getElementById("resDeposited").textContent = totalDeposited.toFixed(2);
    document.getElementById("resInterest").textContent = interestEarned.toFixed(2);
    document.getElementById("resTotal").textContent = maturityAmount.toFixed(2);

    // Show output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.add("open");

    const chartBox = document.getElementById("rdChart");
    chartBox.classList.add("open");

    const formContainer = document.getElementById("rdcalcform");
    formContainer.classList.remove("col-lg-12");
    formContainer.classList.add("col-lg-8");

    const chartContainer = document.getElementById("rdchart");
    chartContainer.classList.add("col-lg-4");

    // Draw chart
    const ctx = document.getElementById("rdChart").getContext("2d");
    if (chart) chart.destroy(); // Clean previous chart

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Total Deposited", "Interest Earned"],
            datasets: [
                {
                    data: [totalDeposited, interestEarned],
                    backgroundColor: ["#4e79a7", "#f28e2b"],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" },
                title: { display: true, text: "Deposits vs Interest" },
            },
        },
    });
}

function clearFld() {
    // Hide output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.remove("open");

    // Hide chart
    const chartBox = document.getElementById("rdChart");
    if (chartBox) chartBox.classList.remove("open");

    // Reset form container layout
    const formContainer = document.getElementById("rdcalcform");
    if (formContainer) {
        formContainer.classList.remove("col-lg-8");
        formContainer.classList.add("col-lg-12");
    }

    // Reset chart container layout
    const chartContainer = document.getElementById("rdchart");
    if (chartContainer) {
        chartContainer.classList.remove("col-lg-4");
    }

    // Clear input fields
    const monthlyDepositField = document.getElementById("monthlyDeposit");
    const interestRateField = document.getElementById("interestRate");
    const durationField = document.getElementById("duration");
    
    if (monthlyDepositField) monthlyDepositField.value = "";
    if (interestRateField) interestRateField.value = "";
    if (durationField) durationField.value = "";

    // Clear result fields
    const resDepositedField = document.getElementById("resDeposited");
    const resInterestField = document.getElementById("resInterest");
    const resTotalField = document.getElementById("resTotal");
    
    if (resDepositedField) resDepositedField.textContent = "";
    if (resInterestField) resInterestField.textContent = "";
    if (resTotalField) resTotalField.textContent = "";

    // Destroy chart if it exists
    if (chart) {
        chart.destroy();
        chart = null;
    }
}
