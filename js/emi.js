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
    } else {
      document.getElementById('emiAmt').innerText = emi.toFixed(2);
    }

    // Calculate and display the detailed result
    let totalInterestPaid = 0;
    let detailResult = '<table><tr><th>Month</th><th>Principal Paid</th><th>Interest Paid</th><th>Remaining Balance</th></tr>';
    let remainingBalance = principal;
    for (let i = 1; i <= numberOfMonths; i++) {
      let interestPaid = remainingBalance * monthlyRate;
      let principalPaid = emi - interestPaid;
      remainingBalance -= principalPaid;
      totalInterestPaid += interestPaid;
      detailResult += `<tr><td>${i}</td><td>₹${principalPaid.toFixed(2)}</td><td>₹${interestPaid.toFixed(2)}</td><td>₹${remainingBalance.toFixed(2)}</td></tr>`;
    }
    detailResult += '</table>';
    document.getElementById('detail-result').innerHTML = detailResult;

    // Display the total interest paid
    document.getElementById('interestAmt').innerText += totalInterestPaid.toFixed(2);

    var opnbtn = document.getElementsByClassName("calout")[0];
    opnbtn.classList.add("open");
  }


  function clearFld() {
    var clsbtn = document.getElementsByClassName("calout open")[0];
    clsbtn.classList.remove("open");
    document.getElementById("detail-result").innerText = "";
    document.getElementById("interestAmt").innerHTML = "";
  }