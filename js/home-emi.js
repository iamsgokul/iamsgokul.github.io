let homeChart; // Chart instance

function calculateHomeEMI() {
    const homePrice = parseFloat(document.getElementById('homePrice').value);
    const downPayment = parseFloat(document.getElementById('homeDownPayment').value);
    const annualRate = parseFloat(document.getElementById('homeRate').value);
    const tenure = parseFloat(document.getElementById('homeTenure').value);

    // Input validation
    if (isNaN(homePrice) || homePrice < 500000) {
        alert("Please enter a valid home price (minimum ₹5,00,000).");
        return;
    }

    if (isNaN(downPayment) || downPayment < 0 || downPayment >= homePrice) {
        alert("Please enter a valid down payment (less than home price).");
        return;
    }

    if (isNaN(annualRate) || annualRate <= 0 || annualRate > 20) {
        alert("Please enter a valid interest rate (0.1% - 20%).");
        return;
    }

    if (isNaN(tenure) || tenure < 5 || tenure > 30) {
        alert("Please enter a valid loan tenure (5-30 years for home loans).");
        return;
    }

    // Calculate loan amount after down payment
    const loanAmount = homePrice - downPayment;
    
    if (loanAmount <= 0) {
        alert("Down payment cannot be equal to or greater than home price.");
        return;
    }

    // Convert annual interest rate to monthly and tenure to months
    const monthlyRate = annualRate / (12 * 100);
    const numberOfMonths = tenure * 12;

    // EMI calculation formula: EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    // Calculate total amounts
    const totalAmount = emi * numberOfMonths;
    const totalInterest = totalAmount - loanAmount;

    // Update values in the DOM
    document.getElementById("homeLoanAmount").textContent = Math.round(loanAmount).toLocaleString('en-IN');
    document.getElementById("homeEmiAmt").textContent = Math.round(emi).toLocaleString('en-IN');
    document.getElementById("homeTotalAmount").textContent = Math.round(totalAmount).toLocaleString('en-IN');
    document.getElementById("homeInterestAmt").textContent = Math.round(totalInterest).toLocaleString('en-IN');

    // Show output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.add("open");

    const chartBox = document.getElementById("homeEmiChart");
    chartBox.classList.add("open");

    const formContainer = document.getElementById("homeemicalcform");
    formContainer.classList.remove("col-lg-12");
    formContainer.classList.add("col-lg-8");

    const chartContainer = document.getElementById("homeemichart");
    chartContainer.classList.add("col-lg-4");

    // Generate detailed payment schedule with Home Purchase Summary at top
    let detailResult = `<div class="purchase-summary"><h3>Home Purchase Summary</h3><p><strong>Home Price:</strong> <span>₹${Math.round(homePrice).toLocaleString('en-IN')}</span></p><p><strong>Down Payment:</strong> <span>₹${Math.round(downPayment).toLocaleString('en-IN')}</span></p><p><strong>Total Cost of Home:</strong> <span>₹${Math.round(homePrice + totalInterest).toLocaleString('en-IN')}</span></p><p><strong>Interest as % of Home Price:</strong> <span>${((totalInterest / homePrice) * 100).toFixed(1)}%</span></p></div>`;
    detailResult += '<h3>Home Loan Amortization Schedule (Yearly Summary)</h3><table><tr><th>Year</th><th>Principal Paid</th><th>Interest Paid</th><th>Remaining Balance</th></tr>';
    let remainingBalance = loanAmount;
    
    for (let year = 1; year <= tenure; year++) {
        let yearlyPrincipal = 0;
        let yearlyInterest = 0;
        
        // Calculate 12 months for this year
        for (let month = 1; month <= 12; month++) {
            let interestPaid = remainingBalance * monthlyRate;
            let principalPaid = emi - interestPaid;
            remainingBalance -= principalPaid;
            yearlyPrincipal += principalPaid;
            yearlyInterest += interestPaid;
        }
        
        detailResult += `<tr><td>${year}</td><td>₹${Math.round(yearlyPrincipal).toLocaleString('en-IN')}</td><td>₹${Math.round(yearlyInterest).toLocaleString('en-IN')}</td><td>₹${Math.round(remainingBalance).toLocaleString('en-IN')}</td></tr>`;
    }
    detailResult += '</table>';
    document.getElementById('home-detail-result').innerHTML = detailResult;

    // Draw chart
    const ctx = document.getElementById("homeEmiChart").getContext("2d");
    if (homeChart) homeChart.destroy(); // Clean previous chart

    homeChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Principal Amount", "Interest Amount"],
            datasets: [
                {
                    data: [loanAmount, totalInterest],
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

function clearHomeFld() {
    // Hide output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.remove("open");

    // Hide chart
    const chartBox = document.getElementById("homeEmiChart");
    if (chartBox) chartBox.classList.remove("open");

    // Reset form container layout
    const formContainer = document.getElementById("homeemicalcform");
    if (formContainer) {
        formContainer.classList.remove("col-lg-8");
        formContainer.classList.add("col-lg-12");
    }

    // Reset chart container layout
    const chartContainer = document.getElementById("homeemichart");
    if (chartContainer) {
        chartContainer.classList.remove("col-lg-4");
    }

    // Clear input fields and set default values
    const homePriceField = document.getElementById("homePrice");
    const downPaymentField = document.getElementById("homeDownPayment");
    const rateField = document.getElementById("homeRate");
    const tenureField = document.getElementById("homeTenure");
    
    if (homePriceField) homePriceField.value = "5000000";
    if (downPaymentField) downPaymentField.value = "1000000";
    if (rateField) rateField.value = "7.5";
    if (tenureField) tenureField.value = "20";

    // Clear result fields
    const loanAmountField = document.getElementById("homeLoanAmount");
    const emiAmtField = document.getElementById("homeEmiAmt");
    const totalAmountField = document.getElementById("homeTotalAmount");
    const interestAmtField = document.getElementById("homeInterestAmt");
    
    if (loanAmountField) loanAmountField.textContent = "";
    if (emiAmtField) emiAmtField.textContent = "";
    if (totalAmountField) totalAmountField.textContent = "";
    if (interestAmtField) interestAmtField.textContent = "";

    // Clear detailed results
    document.getElementById("home-detail-result").innerHTML = "";

    // Destroy chart if it exists
    if (homeChart) {
        homeChart.destroy();
        homeChart = null;
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set default values
    const homePriceField = document.getElementById("homePrice");
    const downPaymentField = document.getElementById("homeDownPayment");
    const rateField = document.getElementById("homeRate");
    const tenureField = document.getElementById("homeTenure");
    
    if (homePriceField && !homePriceField.value) {
        homePriceField.value = "5000000";
    }
    
    if (downPaymentField && !downPaymentField.value) {
        downPaymentField.value = "1000000";
    }
    
    if (rateField && !rateField.value) {
        rateField.value = "7.5";
    }
    
    if (tenureField && !tenureField.value) {
        tenureField.value = "20";
    }
});