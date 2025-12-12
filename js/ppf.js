let chart; // Chart instance

function calculatePPF() {
    const yearlyInvestment = parseFloat(document.getElementById("yearlyInvestment").value);
    const timePeriod = parseFloat(document.getElementById("timePeriod").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value);

    // Input validation
    if (isNaN(yearlyInvestment) || yearlyInvestment < 500 || yearlyInvestment > 150000) {
        alert("Please enter a valid yearly investment amount between ₹500 and ₹1,50,000.");
        return;
    }

    if (isNaN(timePeriod) || timePeriod < 15) {
        alert("Please enter a valid time period (minimum 15 years).");
        return;
    }

    if (isNaN(interestRate) || interestRate <= 0) {
        alert("Please enter a valid interest rate.");
        return;
    }

    // PPF calculation using the correct compound interest formula for annual contributions
    // Each year's contribution compounds for the remaining years
    const annualRate = interestRate / 100;
    let maturityAmount = 0;
    
    // Calculate maturity amount by considering each year's contribution separately
    for (let year = 1; year <= timePeriod; year++) {
        const yearsOfCompounding = timePeriod - year + 1;
        const contributionMaturity = yearlyInvestment * Math.pow(1 + annualRate, yearsOfCompounding);
        maturityAmount += contributionMaturity;
    }
    
    const totalInvestment = yearlyInvestment * timePeriod;
    const interestEarned = maturityAmount - totalInvestment;

    // Update values in the DOM
    document.getElementById("resTotalInvestment").textContent = totalInvestment.toFixed(0);
    document.getElementById("resInterestEarned").textContent = interestEarned.toFixed(0);
    document.getElementById("resMaturityAmount").textContent = maturityAmount.toFixed(0);
    document.getElementById("resTimePeriod").textContent = timePeriod;

    // Show output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.add("open");

    const chartBox = document.getElementById("ppfChart");
    chartBox.classList.add("open");

    const formContainer = document.getElementById("ppfcalcform");
    formContainer.classList.remove("col-lg-12");
    formContainer.classList.add("col-lg-8");

    const chartContainer = document.getElementById("ppfchart");
    chartContainer.classList.add("col-lg-4");

    // Draw chart
    const ctx = document.getElementById("ppfChart").getContext("2d");
    if (chart) chart.destroy(); // Clean previous chart

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Total Investment", "Interest Earned"],
            datasets: [
                {
                    data: [totalInvestment, interestEarned],
                    backgroundColor: ["#4e79a7", "#f28e2b"],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" },
                title: { display: true, text: "Investment vs Interest" },
            },
        },
    });
}

function clearFld() {
    // Hide output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.remove("open");

    // Hide chart
    const chartBox = document.getElementById("ppfChart");
    if (chartBox) chartBox.classList.remove("open");

    // Reset form container layout
    const formContainer = document.getElementById("ppfcalcform");
    if (formContainer) {
        formContainer.classList.remove("col-lg-8");
        formContainer.classList.add("col-lg-12");
    }

    // Reset chart container layout
    const chartContainer = document.getElementById("ppfchart");
    if (chartContainer) {
        chartContainer.classList.remove("col-lg-4");
    }

    // Clear input fields
    const yearlyInvestmentField = document.getElementById("yearlyInvestment");
    const timePeriodField = document.getElementById("timePeriod");
    const interestRateField = document.getElementById("interestRate");
    
    if (yearlyInvestmentField) yearlyInvestmentField.value = "";
    if (timePeriodField) timePeriodField.value = "15";
    if (interestRateField) interestRateField.value = "7.1";

    // Clear result fields
    const resTotalInvestmentField = document.getElementById("resTotalInvestment");
    const resInterestEarnedField = document.getElementById("resInterestEarned");
    const resMaturityAmountField = document.getElementById("resMaturityAmount");
    const resTimePeriodField = document.getElementById("resTimePeriod");
    
    if (resTotalInvestmentField) resTotalInvestmentField.textContent = "";
    if (resInterestEarnedField) resInterestEarnedField.textContent = "";
    if (resMaturityAmountField) resMaturityAmountField.textContent = "";
    if (resTimePeriodField) resTimePeriodField.textContent = "";

    // Destroy chart if it exists
    if (chart) {
        chart.destroy();
        chart = null;
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set default values
    const timePeriodField = document.getElementById("timePeriod");
    const interestRateField = document.getElementById("interestRate");
    
    if (timePeriodField && !timePeriodField.value) {
        timePeriodField.value = "15";
    }
    
    if (interestRateField && !interestRateField.value) {
        interestRateField.value = "7.1";
    }
});