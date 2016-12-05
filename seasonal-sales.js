// Your job is to build a web page that lists all of the products,
// the name of the department it's in, and the price.
// Additionally, put a <select> element at the top of the page
// that contains all possible values of the season_discount key
// in the categories file.
// As soon as you select one of the seasons,
// all prices on the page should immediately be discounted
// by the corresponding percentage.

// For example, when Spring is chosen,
// all products in the corresponding Household category
// should have their prices updated
// with a 15% discount off the base price.

// The two JSON representations above should be in two files:
// products.json, and categories.json.
// You should load both file via XHRs and store the contents
// in two different JavaScript variables in your code.

////////////////////////////////////////////////////////////
/////////               Objectives             /////////////
////////////////////////////////////////////////////////////

// Initial stuff to play around with:
  // JSON
    // Importing json objects using XML HTTP Request
    // Parsing and storing data
  // HTML
    // Page Layout
    // Display product info in table?
  // Javascript
    // How do I immediately update info upon selection of season?
      // Event listener that listens for an input from that

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
  categoriesRequest.open("GET", "categories.json")
  categoriesRequest.send()
}

// Step 1
var productsRequest = new XMLHttpRequest()
productsRequest.addEventListener("load", parseProducts)
productsRequest.open("GET", "products.json")
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

function whatCategory(num, cat) {
  for(var i = 0; i < cat.categories.length; i++) {
    if(cat.categories[i].id === num) {
      return cat.categories[i].name
    }
  }
}

// Function to apply discount based on selected season
// Executes on change of <select> element
function applyDiscount() {
  discount = whatDiscount(categoriesJSON)
  priceElements = document.getElementsByClassName("price");
  n = priceElements.length
  for(var i = 0; i < n; i++) {
    var price = priceElements[i].innerHTML
    // Removes dollar sign
    price = Number(price.replace(/[^0-9\.]+/g,""));
    price = price - (price * discount)
    price = price.toFixed(2)
    priceElements[i].innerHTML = "$" + price
  }
}

// Function to return percent discount
// Grabs season from input element
// Takes categories JSON file as argument
function whatDiscount(cat) {
  seasEl = document.getElementById("select-season")
  seas = seasEl.value;
  for(var i = 0; i < cat.categories.length; i++) {
    if(cat.categories[i].season_discount === seas) {
      return cat.categories[i].discount
    }
  }
  return 0;
}

seasEl = document.getElementById("select-season")
seasEl.addEventListener("change", applyDiscount)














