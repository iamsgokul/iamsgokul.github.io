let carChart; // Chart instance

function calculateCarEMI() {
    const carPrice = parseFloat(document.getElementById('carPrice').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const annualRate = parseFloat(document.getElementById('carRate').value);
    const tenure = parseFloat(document.getElementById('carTenure').value);

    // Input validation
    if (isNaN(carPrice) || carPrice < 100000) {
        alert("Please enter a valid car price (minimum ₹1,00,000).");
        return;
    }

    if (isNaN(downPayment) || downPayment < 0 || downPayment >= carPrice) {
        alert("Please enter a valid down payment (less than car price).");
        return;
    }

    if (isNaN(annualRate) || annualRate <= 0 || annualRate > 30) {
        alert("Please enter a valid interest rate (0.1% - 30%).");
        return;
    }

    if (isNaN(tenure) || tenure < 1 || tenure > 7) {
        alert("Please enter a valid loan tenure (1-7 years for car loans).");
        return;
    }

    // Calculate loan amount after down payment
    const loanAmount = carPrice - downPayment;
    
    if (loanAmount <= 0) {
        alert("Down payment cannot be equal to or greater than car price.");
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
    document.getElementById("carLoanAmount").textContent = Math.round(loanAmount).toLocaleString('en-IN');
    document.getElementById("carEmiAmt").textContent = Math.round(emi).toLocaleString('en-IN');
    document.getElementById("carTotalAmount").textContent = Math.round(totalAmount).toLocaleString('en-IN');
    document.getElementById("carInterestAmt").textContent = Math.round(totalInterest).toLocaleString('en-IN');

    // Show output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.add("open");

    const chartBox = document.getElementById("carEmiChart");
    chartBox.classList.add("open");

    const formContainer = document.getElementById("caremicalcform");
    formContainer.classList.remove("col-lg-12");
    formContainer.classList.add("col-lg-8");

    const chartContainer = document.getElementById("caremichart");
    chartContainer.classList.add("col-lg-4");

    // Generate detailed payment schedule with Car Purchase Summary at top
    let detailResult = `<div class="purchase-summary"><h3>Car Purchase Summary</h3><p><strong>Car Price:</strong> <span>₹${Math.round(carPrice).toLocaleString('en-IN')}</span></p><p><strong>Down Payment:</strong> <span>₹${Math.round(downPayment).toLocaleString('en-IN')}</span></p><p><strong>Total Cost of Car:</strong> <span>₹${Math.round(carPrice + totalInterest).toLocaleString('en-IN')}</span></p></div>`;
    detailResult += '<h3>Car Loan Payment Schedule</h3><table><tr><th>Month</th><th>Principal Paid</th><th>Interest Paid</th><th>Remaining Balance</th></tr>';
    let remainingBalance = loanAmount;
    
    for (let i = 1; i <= numberOfMonths; i++) {
        let interestPaid = remainingBalance * monthlyRate;
        let principalPaid = emi - interestPaid;
        remainingBalance -= principalPaid;
        
        // Show only first 12 months, then every 12th month, and last month for better readability
        if (i <= 12 || i % 12 === 0 || i === numberOfMonths) {
            detailResult += `<tr><td>${i}</td><td>₹${Math.round(principalPaid).toLocaleString('en-IN')}</td><td>₹${Math.round(interestPaid).toLocaleString('en-IN')}</td><td>₹${Math.round(remainingBalance).toLocaleString('en-IN')}</td></tr>`;
        }
    }
    detailResult += '</table>';
    document.getElementById('car-detail-result').innerHTML = detailResult;

    // Draw chart
    const ctx = document.getElementById("carEmiChart").getContext("2d");
    if (carChart) carChart.destroy(); // Clean previous chart

    carChart = new Chart(ctx, {
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

function clearCarFld() {
    // Hide output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.remove("open");

    // Hide chart
    const chartBox = document.getElementById("carEmiChart");
    if (chartBox) chartBox.classList.remove("open");

    // Reset form container layout
    const formContainer = document.getElementById("caremicalcform");
    if (formContainer) {
        formContainer.classList.remove("col-lg-8");
        formContainer.classList.add("col-lg-12");
    }

    // Reset chart container layout
    const chartContainer = document.getElementById("caremichart");
    if (chartContainer) {
        chartContainer.classList.remove("col-lg-4");
    }

    // Clear input fields and set default values
    const carPriceField = document.getElementById("carPrice");
    const downPaymentField = document.getElementById("downPayment");
    const rateField = document.getElementById("carRate");
    const tenureField = document.getElementById("carTenure");
    
    if (carPriceField) carPriceField.value = "800000";
    if (downPaymentField) downPaymentField.value = "200000";
    if (rateField) rateField.value = "8.5";
    if (tenureField) tenureField.value = "5";

    // Clear result fields
    const loanAmountField = document.getElementById("carLoanAmount");
    const emiAmtField = document.getElementById("carEmiAmt");
    const totalAmountField = document.getElementById("carTotalAmount");
    const interestAmtField = document.getElementById("carInterestAmt");
    
    if (loanAmountField) loanAmountField.textContent = "";
    if (emiAmtField) emiAmtField.textContent = "";
    if (totalAmountField) totalAmountField.textContent = "";
    if (interestAmtField) interestAmtField.textContent = "";

    // Clear detailed results
    document.getElementById("car-detail-result").innerHTML = "";

    // Destroy chart if it exists
    if (carChart) {
        carChart.destroy();
        carChart = null;
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set default values
    const carPriceField = document.getElementById("carPrice");
    const downPaymentField = document.getElementById("downPayment");
    const rateField = document.getElementById("carRate");
    const tenureField = document.getElementById("carTenure");
    
    if (carPriceField && !carPriceField.value) {
        carPriceField.value = "800000";
    }
    
    if (downPaymentField && !downPaymentField.value) {
        downPaymentField.value = "200000";
    }
    
    if (rateField && !rateField.value) {
        rateField.value = "8.5";
    }
    
    if (tenureField && !tenureField.value) {
        tenureField.value = "5";
    }
});