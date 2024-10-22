// Get references to the input fields and table
const col1 = document.getElementById("insertAsset");
const col2 = document.getElementById("insertQuanity");
const form = document.getElementById("dataForm");
const table = document.querySelector("table");
const date = document.getElementById("date");

function updateTime() {
    // Get the current date and time
    const now = new Date();
    
    // Format the date and time
    const date = now.getDate()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    const formattedHours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes()
    const seconds = now.getSeconds().toString().padStart(2,'0')
    
    // Update the inner HTML of the date element
    document.getElementById("date").innerHTML = `<strong>${date}-${month}-${year} ${formattedHours}-${minutes}-${seconds}</strong>`;
}

// Initial call to display the time immediately
updateTime();

// Set an interval to update the time every second (1000 milliseconds)
setInterval(updateTime, 1000);

function getCurrentPrice(){

}


// Function to save the data to localStorage
function saveData() {
    // Create an array to store table rows
    let tableData = [];

    // Loop through the table rows and store the data
    for (let i = 1; i < table.rows.length; i++) { // Starting from 1 to skip the header
        let row = table.rows[i];
        let rowData = {
            asset: row.cells[0].innerText,
            price: row.cells[1].innerText,
            quantity: row.cells[2].innerText
        };
        tableData.push(rowData);
    }

    // Store the data in localStorage as a JSON string
    localStorage.setItem('tableData', JSON.stringify(tableData));
}

// Function to load the data from localStorage
function loadData() {
    let tableData = localStorage.getItem('tableData');

    // Check if there is any stored data
    if (tableData) {
        tableData = JSON.parse(tableData);

        // Loop through the stored data and add it to the table
        tableData.forEach(rowData => {
            var newRow = table.insertRow();
            var assetCell = newRow.insertCell(0);
            var priceCell = newRow.insertCell(1);
            var quantityCell = newRow.insertCell(2);

            assetCell.innerHTML = rowData.asset;
            priceCell.innerHTML = rowData.price;
            quantityCell.innerHTML = rowData.quantity;
        });
    }
}

// Function to add a new entry to the table
function addNewEntry(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values from the input fields
    var assetName = insertAsset.value;
    var quantity = insertQuantity.value;

    // Create a new row in the table
    var newRow = table.insertRow();

    // Insert cells and assign values
    var assetCell = newRow.insertCell(0);
    var priceCell = newRow.insertCell(1);
    var quantityCell = newRow.insertCell(2);
    var marketValueCell = newRow.insertCell(3);
    var  costBasis = newRow.insertCell(4);
    var unrealizedGain = newRow.insertCell(5);
    var allocation = newRow.insertCell(6);

    // Set values for the new cells
    assetCell.innerHTML = assetName;
    priceCell.innerHTML = "£0.00"; // You can adjust how the price is calculated
    quantityCell.innerHTML = quantity;
    marketValueCell.innerHTML = "0";
    costBasis.innerHTML = "0";
    unrealizedGain.innerHTML= "0";
    allocation.innerHTML = "2";
    

    // Clear the input fields after adding the new row
    col1.value = '';
    col2.value = '';

    // Save the updated table data to localStorage
    saveData();
}

// Load the data from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadData);

// Attach the submit event to the form
form.addEventListener('submit', addNewEntry);
