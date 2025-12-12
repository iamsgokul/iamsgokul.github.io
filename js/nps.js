let chart; // Chart instance

function calculateNPS() {
    const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
    const currentAge = parseFloat(document.getElementById("currentAge").value);
    const expectedReturn = parseFloat(document.getElementById("expectedReturn").value);

    // Input validation
    if (isNaN(monthlyInvestment) || monthlyInvestment < 500) {
        alert("Please enter a valid monthly investment amount (minimum ₹500).");
        return;
    }

    if (isNaN(currentAge) || currentAge < 18 || currentAge > 60) {
        alert("Please enter a valid current age (18-60 years).");
        return;
    }

    if (isNaN(expectedReturn) || expectedReturn <= 0) {
        alert("Please enter a valid expected return rate.");
        return;
    }

    // Calculate investment tenure (assuming retirement at 60)
    const retirementAge = 60;
    const investmentTenure = retirementAge - currentAge;
    const totalMonths = investmentTenure * 12;

    // NPS calculation to match Groww's methodology
    // Using Groww's SIP calculation formula: A = P × [((1 + r)^n - 1) / r] × (1 + r)
    const monthlyRate = expectedReturn / (12 * 100);
    const totalInvestment = monthlyInvestment * totalMonths;
    
    // Calculate maturity amount using SIP formula similar to Groww
    // A = P × [((1 + r)^n - 1) / r] × (1 + r)
    const maturityAmount = monthlyInvestment * 
        (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * 
        (1 + monthlyRate));
    
    const interestEarned = maturityAmount - totalInvestment;

    // NPS withdrawal rules: 40% must be used for annuity (minimum)
    const annuityAmount = maturityAmount * 0.4;

    // Update values in the DOM (rounded to match Groww format)
    document.getElementById("resTotalInvestment").textContent = Math.round(totalInvestment).toLocaleString('en-IN');
    document.getElementById("resInterestEarned").textContent = Math.round(interestEarned).toLocaleString('en-IN');
    document.getElementById("resMaturityAmount").textContent = Math.round(maturityAmount).toLocaleString('en-IN');
    document.getElementById("resAnnuityAmount").textContent = Math.round(annuityAmount).toLocaleString('en-IN');

    // Show output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.add("open");

    const chartBox = document.getElementById("npsChart");
    chartBox.classList.add("open");

    const formContainer = document.getElementById("npscalcform");
    formContainer.classList.remove("col-lg-12");
    formContainer.classList.add("col-lg-8");

    const chartContainer = document.getElementById("npschart");
    chartContainer.classList.add("col-lg-4");

    // Draw chart
    const ctx = document.getElementById("npsChart").getContext("2d");
    if (chart) chart.destroy(); // Clean previous chart

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Total Investment", "Interest Earned"],
            datasets: [
                {
                    data: [totalInvestment, interestEarned],
                    backgroundColor: ["#4e79a7", "#f28e2b"],
                }
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
    const chartBox = document.getElementById("npsChart");
    if (chartBox) chartBox.classList.remove("open");

    // Reset form container layout
    const formContainer = document.getElementById("npscalcform");
    if (formContainer) {
        formContainer.classList.remove("col-lg-8");
        formContainer.classList.add("col-lg-12");
    }

    // Reset chart container layout
    const chartContainer = document.getElementById("npschart");
    if (chartContainer) {
        chartContainer.classList.remove("col-lg-4");
    }

    // Clear input fields
    const monthlyInvestmentField = document.getElementById("monthlyInvestment");
    const currentAgeField = document.getElementById("currentAge");
    const expectedReturnField = document.getElementById("expectedReturn");
    
    if (monthlyInvestmentField) monthlyInvestmentField.value = "10000";
    if (currentAgeField) currentAgeField.value = "20";
    if (expectedReturnField) expectedReturnField.value = "9";

    // Clear result fields
    const resTotalInvestmentField = document.getElementById("resTotalInvestment");
    const resInterestEarnedField = document.getElementById("resInterestEarned");
    const resMaturityAmountField = document.getElementById("resMaturityAmount");
    const resAnnuityAmountField = document.getElementById("resAnnuityAmount");
    
    if (resTotalInvestmentField) resTotalInvestmentField.textContent = "";
    if (resInterestEarnedField) resInterestEarnedField.textContent = "";
    if (resMaturityAmountField) resMaturityAmountField.textContent = "";
    if (resAnnuityAmountField) resAnnuityAmountField.textContent = "";

    // Destroy chart if it exists
    if (chart) {
        chart.destroy();
        chart = null;
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set default values
    const monthlyInvestmentField = document.getElementById("monthlyInvestment");
    const currentAgeField = document.getElementById("currentAge");
    const expectedReturnField = document.getElementById("expectedReturn");
    
    if (monthlyInvestmentField && !monthlyInvestmentField.value) {
        monthlyInvestmentField.value = "10000";
    }
    
    if (currentAgeField && !currentAgeField.value) {
        currentAgeField.value = "20";
    }
    
    if (expectedReturnField && !expectedReturnField.value) {
        expectedReturnField.value = "9";
    }
});