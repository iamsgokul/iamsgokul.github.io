let chart; // Chart instance

// TDS rates and thresholds for different types of payments (FY 2024-25)
const tdsRates = {
    "194A": { 
        name: "Interest (Section 194A)",
        withPAN: 10, 
        withoutPAN: 20,
        threshold: 40000,
        description: "Interest on deposits, bonds, debentures"
    },
    "194B": { 
        name: "Lottery/Crossword (Section 194B)",
        withPAN: 30, 
        withoutPAN: 30,
        threshold: 10000,
        description: "Winnings from lottery, crossword puzzles"
    },
    "194BB": { 
        name: "Horse Race (Section 194BB)",
        withPAN: 30, 
        withoutPAN: 30,
        threshold: 10000,
        description: "Winnings from horse race"
    },
    "194C": { 
        name: "Contractor Payment (Section 194C)",
        withPAN: 1, 
        withoutPAN: 20,
        threshold: 30000,
        description: "Payments to contractors/sub-contractors"
    },
    "194D": { 
        name: "Insurance Commission (Section 194D)",
        withPAN: 5, 
        withoutPAN: 20,
        threshold: 15000,
        description: "Commission to insurance agents"
    },
    "194G": { 
        name: "Lottery Commission (Section 194G)",
        withPAN: 5, 
        withoutPAN: 20,
        threshold: 15000,
        description: "Commission on lottery ticket sales"
    },
    "194H": { 
        name: "Commission/Brokerage (Section 194H)",
        withPAN: 5, 
        withoutPAN: 20,
        threshold: 15000,
        description: "Commission, brokerage, discount"
    },
    "194I": { 
        name: "Rent (Section 194I)",
        withPAN: 10, 
        withoutPAN: 20,
        threshold: 240000,
        description: "Rent for land, building, furniture, machinery"
    },
    "194IA": { 
        name: "Property Transfer (Section 194IA)",
        withPAN: 1, 
        withoutPAN: 20,
        threshold: 5000000,
        description: "Sale of immovable property"
    },
    "194J": { 
        name: "Professional Services (Section 194J)",
        withPAN: 10, 
        withoutPAN: 20,
        threshold: 30000,
        description: "Professional/technical services, fees"
    },
    "194K": { 
        name: "Mutual Fund (Section 194K)",
        withPAN: 10, 
        withoutPAN: 20,
        threshold: 5000,
        description: "Income from mutual fund units"
    },
    "194M": { 
        name: "Individual Commission (Section 194M)",
        withPAN: 5, 
        withoutPAN: 20,
        threshold: 15000,
        description: "Commission by individuals/HUF"
    },
    "194N": { 
        name: "Cash Withdrawal (Section 194N)",
        withPAN: 2, 
        withoutPAN: 2,
        threshold: 10000000,
        description: "Cash withdrawals above ₹1 crore"
    },
    "194O": { 
        name: "E-commerce (Section 194O)",
        withPAN: 1, 
        withoutPAN: 1,
        threshold: 500000,
        description: "E-commerce transactions"
    },
    "194Q": { 
        name: "Goods Purchase (Section 194Q)",
        withPAN: 0.1, 
        withoutPAN: 0.1,
        threshold: 50000,
        description: "Purchase of goods"
    }
};

function calculateTDS() {
    const grossAmount = parseFloat(document.getElementById("grossAmount").value);
    const tdsType = document.getElementById("tdsType").value;
    const hasPAN = document.getElementById("hasPAN").checked;
    const recipientType = document.getElementById("recipientType").value;
    const customRate = parseFloat(document.getElementById("customRate").value);

    // Input validation
    if (isNaN(grossAmount) || grossAmount <= 0) {
        alert("Please enter a valid gross amount.");
        return;
    }

    if (!tdsType) {
        alert("Please select a TDS section.");
        return;
    }

    let tdsRate = 0;
    let tdsAmount = 0;
    let sectionInfo = "";
    let thresholdMessage = "";

    if (tdsType === "custom") {
        if (isNaN(customRate) || customRate < 0) {
            alert("Please enter a valid custom TDS rate.");
            return;
        }
        tdsRate = customRate;
        tdsAmount = (grossAmount * tdsRate) / 100;
        sectionInfo = "Custom Rate";
        thresholdMessage = "Custom rate applied";
    } else {
        const section = tdsRates[tdsType];
        tdsRate = hasPAN ? section.withPAN : section.withoutPAN;
        sectionInfo = section.name;

        // Check threshold limit (TDS applicable only when amount exceeds threshold)
        if (grossAmount > section.threshold) {
            tdsAmount = (grossAmount * tdsRate) / 100;
            thresholdMessage = `Amount exceeds threshold of ₹${section.threshold.toLocaleString('en-IN')}. TDS applicable.`;
        } else {
            tdsAmount = 0;
            tdsRate = 0;
            thresholdMessage = `Amount does not exceed threshold of ₹${section.threshold.toLocaleString('en-IN')}. No TDS deductible.`;
        }

        // Special cases for certain sections based on recipient type
        if (tdsType === "194C") {
            if (!hasPAN) {
                tdsRate = 20; // Without PAN always 20%
            } else {
                // With PAN: Individual/HUF = 1%, Others = 2%
                tdsRate = (recipientType === "individual") ? 1 : 2;
            }
        }
        
        // Add verification note for high amounts
        if (grossAmount > 1000000 && tdsAmount > grossAmount * 0.3) {
            thresholdMessage += " Note: High TDS amount detected. Please verify calculation with tax advisor.";
        }
    }

    const netAmount = grossAmount - tdsAmount;

    // Update values in the DOM
    document.getElementById("resGrossAmount").textContent = grossAmount.toFixed(2);
    document.getElementById("resSection").textContent = sectionInfo;
    document.getElementById("resTDSRate").textContent = tdsRate.toFixed(2);
    document.getElementById("resTDSAmount").textContent = tdsAmount.toFixed(2);
    document.getElementById("resNetAmount").textContent = netAmount.toFixed(2);
    document.getElementById("thresholdMessage").textContent = thresholdMessage;

    // Show output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.add("open");

    const chartBox = document.getElementById("tdsChart");
    chartBox.classList.add("open");

    const formContainer = document.getElementById("tdscalcform");
    formContainer.classList.remove("col-lg-12");
    formContainer.classList.add("col-lg-8");

    const chartContainer = document.getElementById("tdschart");
    chartContainer.classList.add("col-lg-4");

    // Draw chart
    const ctx = document.getElementById("tdsChart").getContext("2d");
    if (chart) chart.destroy(); // Clean previous chart

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Net Amount", "TDS Deducted"],
            datasets: [
                {
                    data: [netAmount, tdsAmount],
                    backgroundColor: ["#4e79a7", "#e15759"],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" },
                title: { display: true, text: "Amount Breakdown" },
            },
        },
    });
}



function clearFld() {
    // Hide output section
    const outputBox = document.getElementsByClassName("calout")[0];
    if (outputBox) outputBox.classList.remove("open");

    // Hide chart
    const chartBox = document.getElementById("tdsChart");
    if (chartBox) chartBox.classList.remove("open");

    // Reset form container layout
    const formContainer = document.getElementById("tdscalcform");
    if (formContainer) {
        formContainer.classList.remove("col-lg-8");
        formContainer.classList.add("col-lg-12");
    }

    // Reset chart container layout
    const chartContainer = document.getElementById("tdschart");
    if (chartContainer) {
        chartContainer.classList.remove("col-lg-4");
    }

    // Clear input fields
    const grossAmountField = document.getElementById("grossAmount");
    const tdsTypeField = document.getElementById("tdsType");
    const recipientTypeField = document.getElementById("recipientType");
    const customRateField = document.getElementById("customRate");
    const hasPANField = document.getElementById("hasPAN");
    
    if (grossAmountField) grossAmountField.value = "";
    if (tdsTypeField) tdsTypeField.value = "";
    if (recipientTypeField) recipientTypeField.value = "individual";
    if (customRateField) customRateField.value = "";
    if (hasPANField) hasPANField.checked = true;

    // Hide custom rate field and threshold info
    const customRateDiv = document.getElementById("customRateField");
    const thresholdDiv = document.getElementById("thresholdInfo");
    if (customRateDiv) customRateDiv.style.display = "none";
    if (thresholdDiv) thresholdDiv.style.display = "none";

    // Clear result fields
    const resGrossAmountField = document.getElementById("resGrossAmount");
    const resSectionField = document.getElementById("resSection");
    const resTDSRateField = document.getElementById("resTDSRate");
    const resTDSAmountField = document.getElementById("resTDSAmount");
    const resNetAmountField = document.getElementById("resNetAmount");
    const thresholdMessageField = document.getElementById("thresholdMessage");
    
    if (resGrossAmountField) resGrossAmountField.textContent = "";
    if (resSectionField) resSectionField.textContent = "";
    if (resTDSRateField) resTDSRateField.textContent = "";
    if (resTDSAmountField) resTDSAmountField.textContent = "";
    if (resNetAmountField) resNetAmountField.textContent = "";
    if (thresholdMessageField) thresholdMessageField.textContent = "";

    // Destroy chart if it exists
    if (chart) {
        chart.destroy();
        chart = null;
    }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show/hide custom rate field and threshold info based on TDS type selection
    const tdsTypeField = document.getElementById("tdsType");
    if (tdsTypeField) {
        tdsTypeField.addEventListener("change", function() {
            const customRateDiv = document.getElementById("customRateField");
            const thresholdDiv = document.getElementById("thresholdInfo");
            const thresholdAmountSpan = document.getElementById("thresholdAmount");
            const sectionDescSpan = document.getElementById("sectionDescription");
            
            if (this.value === "custom") {
                customRateDiv.style.display = "block";
                thresholdDiv.style.display = "none";
            } else if (this.value && tdsRates[this.value]) {
                customRateDiv.style.display = "none";
                document.getElementById("customRate").value = "";
                
                // Show threshold information
                const section = tdsRates[this.value];
                thresholdAmountSpan.textContent = `₹${section.threshold.toLocaleString('en-IN')}`;
                sectionDescSpan.textContent = section.description;
                thresholdDiv.style.display = "block";
            } else {
                customRateDiv.style.display = "none";
                thresholdDiv.style.display = "none";
                document.getElementById("customRate").value = "";
            }
        });
    }
});