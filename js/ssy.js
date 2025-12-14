let ssyChart; // Chart instance

function calculateSSY() {
    const yearlyInvestment = parseFloat(document.getElementById('yearlyInvestment').value);
    const girlAge = parseFloat(document.getElementById('girlAge').value);
    const startingYear = parseFloat(document.getElementById('startingYear').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);

    // Input validation
    if (isNaN(yearlyInvestment) || yearlyInvestment < 250 || yearlyInvestment > 150000) {
        alert("Please enter a valid yearly investment amount (₹250 - ₹1,50,000).");
        return;
    }

    if (isNaN(girlAge) || girlAge < 0 || girlAge > 10) {
        alert("Please enter a valid age (0-10 years). SSY account can only be opened until girl turns 10.");
        return;
    }

    if (isNaN(startingYear) || startingYear < 2020 || startingYear > 2040) {
        alert("Please enter a valid starting year (2020-2040).");
        return;
    }

    if (isNaN(interestRate) || interestRate <= 0) {
        alert("Please enter a valid interest rate.");
        return;
    }

    // SSY calculation parameters
    const depositYears = 15; // Deposits for 15 years (from age to age+15 or until 21, whichever is earlier)
    const maturityAge = 21; // Account matures when girl turns 21
    const maxDepositAge = 14; // Maximum age until deposits can be made is 14

    // Calculate actual deposit years based on girl's age
    let actualDepositYears;
    if (girlAge > maxDepositAge) {
        alert("Deposits can only be made until the girl turns 15 years old.");
        return;
    } else {
        actualDepositYears = Math.min(depositYears, maxDepositAge - girlAge + 1);
    }

    // Calculate years to maturity
    const yearsToMaturity = maturityAge - girlAge;
    const maturityYear = startingYear + yearsToMaturity;

    // Calculate total investment (deposits for 15 years or until age 15)
    const totalInvestment = yearlyInvestment * actualDepositYears;

    // SSY calculation: Compound interest for each year's deposit
    const annualRate = interestRate / 100;
    let maturityAmount = 0;

    // For each year of deposit, calculate its compound growth
    for (let year = 0; year < actualDepositYears; year++) {
        const yearsOfGrowth = yearsToMaturity - year;
        maturityAmount += yearlyInvestment * Math.pow(1 + annualRate, yearsOfGrowth);
    }

    const interestEarned = maturityAmount - totalInvestment;

    // Update values in the DOM
    document.getElementById("ssyTotalInvestment").textContent = Math.round(totalInvestment).toLocaleString('en-IN');
    document.getElementById("ssyInterestEarned").textContent = Math.round(interestEarned).toLocaleString('en-IN');
    document.getElementById("ssyMaturityYear").textContent = Math.round(maturityYear);
    document.getElementById("ssyMaturityAmount").textContent = Math.round(maturityAmount).toLocaleString('en-IN');

    // Show output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.add("open");

    const chartBox = document.getElementById("ssyChart");
    chartBox.classList.add("open");

    const formContainer = document.getElementById("ssycalcform");
    formContainer.classList.remove("col-lg-12");
    formContainer.classList.add("col-lg-8");

    const chartContainer = document.getElementById("ssychart");
    chartContainer.classList.add("col-lg-4");

    // Generate detailed SSY information
    let detailResult = `<div class="purchase-summary"><h3>SSY Account Details</h3>`;
    detailResult += `<p><strong>Account Opening Age:</strong> <span>${girlAge} years (in ${startingYear})</span></p>`;
    detailResult += `<p><strong>Deposit Period:</strong> <span>${actualDepositYears} years (Age ${girlAge} to ${girlAge + actualDepositYears - 1})</span></p>`;
    detailResult += `<p><strong>Maturity Age:</strong> <span>21 years (${maturityYear})</span></p>`;
    detailResult += `<p><strong>Tax Benefits:</strong> <span>₹1.5L deduction u/s 80C + Tax-free interest & maturity</span></p>`;
    detailResult += `</div>`;

    // Add yearly breakdown for first few years
    detailResult += '<h3>Yearly Investment Growth</h3><table><tr><th>Year</th><th>Age</th><th>Investment</th><th>Accumulated Value</th></tr>';
    let accumulatedValue = 0;
    
    for (let year = 1; year <= Math.min(actualDepositYears, 10); year++) {
        const ageAtYear = girlAge + year - 1;
        const yearlyGrowth = yearlyInvestment * Math.pow(1 + annualRate, yearsToMaturity - year + 1);
        accumulatedValue += yearlyGrowth;
        
        detailResult += `<tr><td>${startingYear + year - 1}</td><td>${ageAtYear}</td><td>₹${yearlyInvestment.toLocaleString('en-IN')}</td><td>₹${Math.round(accumulatedValue).toLocaleString('en-IN')}</td></tr>`;
    }
    
    if (actualDepositYears > 10) {
        detailResult += `<tr><td colspan="4" style="text-align: center; font-style: italic;">... and ${actualDepositYears - 10} more years ...</td></tr>`;
    }
    
    detailResult += '</table>';
    document.getElementById('ssy-detail-result').innerHTML = detailResult;

    // Draw chart
    const ctx = document.getElementById("ssyChart").getContext("2d");
    if (ssyChart) ssyChart.destroy(); // Clean previous chart

    ssyChart = new Chart(ctx, {
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

function clearSSYFld() {
    // Hide output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.remove("open");

    // Hide chart
    const chartBox = document.getElementById("ssyChart");
    if (chartBox) chartBox.classList.remove("open");

    // Reset form container layout
    const formContainer = document.getElementById("ssycalcform");
    if (formContainer) {
        formContainer.classList.remove("col-lg-8");
        formContainer.classList.add("col-lg-12");
    }

    // Reset chart container layout
    const chartContainer = document.getElementById("ssychart");
    if (chartContainer) {
        chartContainer.classList.remove("col-lg-4");
    }

    // Clear input fields and set default values
    const yearlyInvestmentField = document.getElementById("yearlyInvestment");
    const girlAgeField = document.getElementById("girlAge");
    const startingYearField = document.getElementById("startingYear");
    const interestRateField = document.getElementById("interestRate");
    
    if (yearlyInvestmentField) yearlyInvestmentField.value = "10000";
    if (girlAgeField) girlAgeField.value = "5";
    if (startingYearField) startingYearField.value = "2024";
    if (interestRateField) interestRateField.value = "8.2";

    // Clear result fields
    const totalInvestmentField = document.getElementById("ssyTotalInvestment");
    const interestEarnedField = document.getElementById("ssyInterestEarned");
    const maturityYearField = document.getElementById("ssyMaturityYear");
    const maturityAmountField = document.getElementById("ssyMaturityAmount");
    
    if (totalInvestmentField) totalInvestmentField.textContent = "";
    if (interestEarnedField) interestEarnedField.textContent = "";
    if (maturityYearField) maturityYearField.textContent = "";
    if (maturityAmountField) maturityAmountField.textContent = "";

    // Clear detailed results
    document.getElementById("ssy-detail-result").innerHTML = "";

    // Destroy chart if it exists
    if (ssyChart) {
        ssyChart.destroy();
        ssyChart = null;
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set default values with current year
    const currentYear = new Date().getFullYear();
    
    const yearlyInvestmentField = document.getElementById("yearlyInvestment");
    const girlAgeField = document.getElementById("girlAge");
    const currentYearField = document.getElementById("currentYear");
    const interestRateField = document.getElementById("interestRate");
    
    if (yearlyInvestmentField && !yearlyInvestmentField.value) {
        yearlyInvestmentField.value = "10000";
    }
    
    if (girlAgeField && !girlAgeField.value) {
        girlAgeField.value = "5";
    }
    
    if (startingYearField && !startingYearField.value) {
        startingYearField.value = currentYear;
    }
    
    if (interestRateField && !interestRateField.value) {
        interestRateField.value = "8.2";
    }
});