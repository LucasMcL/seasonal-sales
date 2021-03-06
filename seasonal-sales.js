////////////////////////////////////////////////////////////
/////////               Structure              /////////////
////////////////////////////////////////////////////////////

// Open connection to products JSON
// Upon load, run parseProducts
  // Parse the JSON object and trigger load of categories
// Upon load, run generateHTML
  // Parse categories JSON object and generate table

// Event Listener
// Listen for change of select element
  // First, reset prices
  // Then, use data from productsJSON and categoriesJSON to
  // apply discounts

// variables for JSON objects
var productsJSON;
var categoriesJSON;

// My XML requests and function calls create a chain reaction
// that ensures both json files are loaded before HTML is generated

// Step 3
function generateHTML(loadEvt) {
  categoriesJSON = JSON.parse(loadEvt.target.responseText)
  var tableEl = document.getElementById('products-table')
  tableEl.innerHTML = generateTable(productsJSON, categoriesJSON)
}

// Step 2
function parseProducts(loadEvt) {
  productsJSON = JSON.parse(loadEvt.target.responseText)
  var categoriesRequest = new XMLHttpRequest()
  categoriesRequest.addEventListener("load", generateHTML)
  categoriesRequest.open("GET", "https://seasonal-sales-lucasmcl.firebaseio.com/categories.json")
  categoriesRequest.send()
}

// Step 1
var productsRequest = new XMLHttpRequest()
productsRequest.addEventListener("load", parseProducts)
productsRequest.open("GET", "https://seasonal-sales-lucasmcl.firebaseio.com/products.json")
productsRequest.send()


function generateTable(prod, cat) {
  // Accepts productsJSON and categoriesJSON
  // Generates HTML for table rows
  var htmlString = ""

  for(var i = 0; i < prod.products.length; i++) {
    htmlString += `<tr>
                    <td class="prod-name">${prod.products[i].name}</td>
                    <td class="department">${whatCategory(prod.products[i].category_id, cat)}</td>
                    <td class="price">$${prod.products[i].price}</td>
                  </tr>`
  }
  return htmlString
}

// Gets Department info from ID in products JSON object
function whatCategory(num, cat) {
  for(var i = 0; i < cat.categories.length; i++) {
    if(cat.categories[i].id === num) {
      return cat.categories[i].name
    }
  }
}

// Function to apply discount based on selected season
// Executes on change of <select> element
// Resets all prices to their original values first
function applyDiscount() {
  resetPrices();
  discount = getDiscountInfo().discount
  dept = getDiscountInfo().dept_name
  priceElements = document.getElementsByClassName("price")
  deptElements = document.getElementsByClassName("department")
  n = priceElements.length
  for(var i = 0; i < n; i++) {
    if(dept === deptElements[i].innerHTML) {
      var price = priceElements[i].innerHTML
      // Removes dollar sign
      price = Number(price.replace(/[^0-9\.]+/g,""));
      price = price - (price * discount)
      price = price.toFixed(2) // Round to 2 places
      priceElements[i].innerHTML = "$" + price
    }
  }
}

// Function to return percent discount and dept name to apply to
// Returns object with keys:
  // dept_name
  // discount
function getDiscountInfo() {
  cat = categoriesJSON
  seasEl = document.getElementById("select-season")
  seas = seasEl.value;
  for(var i = 0; i < cat.categories.length; i++) {
    if(cat.categories[i].season_discount === seas) {
      return {dept_name: cat.categories[i].name,
              discount: cat.categories[i].discount}
    }
  }
  return 0;
}

// Function to reset price values on table
function resetPrices() {
  var priceElements = document.getElementsByClassName("price")
  var n = priceElements.length
  for (var i = 0; i < n; i++) {
    priceElements[i].innerHTML = "$" + productsJSON.products[i].price
  }
}

seasEl = document.getElementById("select-season")
seasEl.addEventListener("change", applyDiscount)















