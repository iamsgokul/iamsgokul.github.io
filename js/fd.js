let chart; // Chart instance

function calculateFdMaturity() {
    const principalAmount = parseFloat(document.getElementById("principalAmount").value);
    const annualInterestRate = parseFloat(document.getElementById("interestRate").value);
    const durationType = document.querySelector('input[name="durationType"]:checked').value;
    const duration = parseFloat(document.getElementById("duration").value);

    // Input validation
    if (isNaN(principalAmount) || isNaN(annualInterestRate) || isNaN(duration)) {
        alert("Please fill in all fields with valid numbers.");
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

    // Quarterly compounding formula: A = P(1 + r/n)^(nt)
    const n = 4; // Quarterly compounding
    const r = annualInterestRate / 100;
    const t = totalDurationInYears;

    const maturityAmount = principalAmount * Math.pow((1 + r / n), n * t);
    const interestEarned = maturityAmount - principalAmount;

    // Update values in the DOM
    document.getElementById("resPrincipal").textContent = principalAmount.toFixed(2);
    document.getElementById("resInterest").textContent = interestEarned.toFixed(2);
    document.getElementById("resTotal").textContent = maturityAmount.toFixed(2);

    // Show output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.add("open");

    const chartBox = document.getElementById("fdChart");
    chartBox.classList.add("open");

    const formContainer = document.getElementById("fdcalcform");
    formContainer.classList.remove("col-lg-12");
    formContainer.classList.add("col-lg-8");

    const chartContainer = document.getElementById("fdchart");
    chartContainer.classList.add("col-lg-4");

    // Draw chart
    const ctx = document.getElementById("fdChart").getContext("2d");
    if (chart) chart.destroy(); // Clean previous chart

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Principal", "Interest"],
            datasets: [
                {
                    data: [principalAmount, interestEarned],
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
    const chartBox = document.getElementById("fdChart");
    if (chartBox) chartBox.classList.remove("open");

    // Reset form container layout
    const formContainer = document.getElementById("fdcalcform");
    if (formContainer) {
        formContainer.classList.remove("col-lg-8");
        formContainer.classList.add("col-lg-12");
    }

    // Reset chart container layout
    const chartContainer = document.getElementById("fdchart");
    if (chartContainer) {
        chartContainer.classList.remove("col-lg-4");
    }

    // Clear input fields
    const principalField = document.getElementById("principalAmount");
    const rateField = document.getElementById("interestRate");
    const durationField = document.getElementById("duration");
    
    if (principalField) principalField.value = "";
    if (rateField) rateField.value = "";
    if (durationField) durationField.value = "";

    // Reset radio button to default (years)
    const yearsRadio = document.getElementById("yearsRadio");
    if (yearsRadio) yearsRadio.checked = true;

    // Clear result fields
    const resPrincipalField = document.getElementById("resPrincipal");
    const resInterestField = document.getElementById("resInterest");
    const resTotalField = document.getElementById("resTotal");
    
    if (resPrincipalField) resPrincipalField.textContent = "";
    if (resInterestField) resInterestField.textContent = "";
    if (resTotalField) resTotalField.textContent = "";

    // Destroy chart if it exists
    if (chart) {
        chart.destroy();
        chart = null;
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Clear duration when radio button changes
    document.querySelectorAll('input[name="durationType"]').forEach((radio) => {
        radio.addEventListener("change", function () {
            const durationField = document.getElementById("duration");
            if (durationField) durationField.value = "";
        });
    });
});