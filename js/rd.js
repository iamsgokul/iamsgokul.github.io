/*-- RD Start--*/
function calculateMaturity() {
    const monthlyDeposit = parseFloat(document.getElementById('monthlyDeposit').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value);
    const duration = parseInt(document.getElementById('duration').value);
  
    if (isNaN(monthlyDeposit) || isNaN(annualInterestRate) || isNaN(duration)) {
      alert('Please enter valid inputs');
      return;
    }
  
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    let maturityAmount = 0;
  
    for (let i = 0; i < duration; i++) {
      maturityAmount += monthlyDeposit * Math.pow(1 + monthlyInterestRate, duration - i);
    }
  
    document.getElementById('result').innerText = maturityAmount.toFixed(2);
  
    var opnbtn = document.getElementsByClassName("calout")[0];
    opnbtn.classList.add("open");
  }
  function clearFld() {
    var clsbtn = document.getElementsByClassName("calout open")[0];
    clsbtn.classList.remove("open");
  }
  /*-- RD End Start--*/