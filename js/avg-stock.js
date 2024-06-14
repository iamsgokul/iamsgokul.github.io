function addInput() {
  const inputsDiv = document.getElementById("inputs");
  const newInput = document.createElement("div");
  newInput.classList.add("fieldrows");
  newInput.innerHTML = `
            <input type="number" placeholder="Price" class="col-lg-3 col-sm-12 price">
            <input type="number" placeholder="Quantity" class="col-lg-3 col-sm-12 quantity">
            <button class="delete-btn ml10" onclick="deleteInput(this)">Delete</button>
            <button class="btn" onclick="addInput()">Add Another</button>
        `;
  inputsDiv.appendChild(newInput);
  updateButtons();
}

function deleteInput(button) {
  const row = button.parentElement;
  row.remove();
  updateButtons();
}

function updateButtons() {
  const inputRows = document.querySelectorAll(".fieldrows");
  inputRows.forEach((row, index) => {
    const deleteButton = row.querySelector(".delete-btn");
    const addButton = row.querySelector(".btn");
    if (deleteButton) {
      deleteButton.style.display =
        inputRows.length > 1 ? "inline-block" : "none";
    }
    if (addButton) {
      addButton.style.display =
        index === inputRows.length - 1 ? "inline-block" : "none";
    }
  });
}

function calculateAverage() {
  const prices = document.querySelectorAll(".price");
  const quantities = document.querySelectorAll(".quantity");
  let totalValue = 0;
  let totalQuantity = 0;

  for (let i = 0; i < prices.length; i++) {
    const price = parseFloat(prices[i].value);
    const quantity = parseFloat(quantities[i].value);

    if (!isNaN(price) && !isNaN(quantity)) {
      totalValue += price * quantity;
      totalQuantity += quantity;
    }
  }

  const average = totalValue / totalQuantity;
  document.getElementById("avgprice").innerText = isNaN(average)
    ? "Please enter valid values."
    : average.toFixed(2);
  document.getElementById("totalqt").innerText = totalQuantity;
  document.getElementById("totalcost").innerText = totalValue;

  var opnbtn = document.getElementsByClassName("calout")[0];
  opnbtn.classList.add("open");
}

function clearAll() {
  const inputsDiv = document.getElementById("inputs");
  const inputRows = document.querySelectorAll(".fieldrows");

  // Keep only the first row
  inputRows.forEach((row, index) => {
    if (index > 0) {
      row.remove();
    } else {
      // Clear the values of the first row
      row.querySelector(".price").value = "";
      row.querySelector(".quantity").value = "";
    }
  });
  document.getElementById("avgprice").innerText = "";
  document.getElementById("totalqt").innerText = "";
  document.getElementById("totalcost").innerText = "";
  updateButtons();

  var opnbtn = document.getElementsByClassName("calout")[0];
  opnbtn.classList.remove("open");
}

// Initial call to update buttons on page load
document.addEventListener("DOMContentLoaded", updateButtons);
