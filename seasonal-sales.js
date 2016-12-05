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

  // Other
    // What should execute right when documents load?
    // Do I have to wait until both documents have loaded before I execute?
      // Have a boolean that becomes true when both objects are loaded
      // While loop that runs and listens for that boolean

    // Other option: wait for one document to load
    // THEN load the other document and run your function that needs both documents


function parseProducts(loadEvt) {
  jsonObject = loadEvt.target.responseText
  data = JSON.parse(jsonObject)
  console.log(data.products)
  // console.log(data.products[0])
  // console.log(data.products[0].name)
}

function parseCategories(loadEvt) {
  jsonObject = loadEvt.target.responseText
  data = JSON.parse(jsonObject)
  console.log(data.categories)
}

var productsRequest = new XMLHttpRequest()
productsRequest.addEventListener("load", parseProducts)
productsRequest.open("GET", "products.json")
productsRequest.send()

var categoriesRequest = new XMLHttpRequest()
categoriesRequest.addEventListener("load", parseCategories)
categoriesRequest.open("GET", "categories.json")
categoriesRequest.send()














