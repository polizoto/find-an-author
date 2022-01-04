var authorFormEl = document.querySelector("#author-form");
var authorInputEl = document.querySelector("#author");
var bookContainerEl = document.querySelector("#books-container");

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var authorname = authorInputEl.value.trim();
  
    if (authorname) {
    getAuthorBooks(authorname);
    authorFormEl.value = "";
    } else {
    alert("Please enter the name of an author");
    }
  };

  var displayBooks = function(author) {

    var apiUrl = "https://openlibrary.org/authors/" + author + "/works.json";

fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        // console.log(data);
        // do something here
        for (let i = 0; i < data.entries.length; i++) {
            var bookEl = document.createElement("p");
            var bookName = data.entries[i].title;
            bookEl.textContent = bookName;
            bookContainerEl.appendChild(bookEl);
        }
      });
    } else {
      alert("Error: " + author + "'s books not found at Open Library");
    }
  })
    .catch(function(error) {
      alert("Unable to connect to Open Library API");
    });

  }

  var getAuthorBooks = function(author) {

  var apiUrl = "https://openlibrary.org/search/authors.json?q=" + author;

  fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        // console.log(data);
        var authorKey = data.docs[0].key;
        // do something here
        displayBooks(authorKey);
      });
    } else {
      alert("Error: Author Not Found");
    }
  })
    .catch(function(error) {
      alert("Unable to connect to Open Library API");
    });
};


authorFormEl.addEventListener("submit", formSubmitHandler);