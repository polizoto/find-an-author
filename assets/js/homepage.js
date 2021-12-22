var authorFormEl = document.querySelector("#author-form");
var authorInputEl = document.querySelector("#author");
var bookContainerEl = document.querySelector("#books-container");
var bookInfoEl = ""
var bookPublisher = ""
var bookDate = ""

var getBookInfo = function(bookID) {

  // var apiUrl = "https://openlibrary.org/api/books?bibkeys=OLID:" + bookID + "&format=json";
  var apiUrl = "https://openlibrary.org/api/volumes/brief/olid/" + bookID + ".json";

  fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        // bookPublisher = data.records./books/bookID.data.publishers.name
        // bookDate = data.records./books/bookID.publishDates
        // console.log(bookPublisher);
        // console.log(publishDates);
      });
    } else {
      alert("Error: " + bookID + " not found at Open Library");
    }
  })
    .catch(function(error) {
      console.log('error ', error)
     // alert("Unable to connect to Open Library API");
    });

}

var getBookAvailability = function(bookAuthor, bookString, bookSubject, bookInfoEl) {

var apiUrl = "https://openlibrary.org/search.json?author=" + bookAuthor + "&title=" + bookString + "&subject=" + bookSubject;

fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log('DATA ', data)

        var bookAvailabilityEl = document.createElement("p");
        var bookListEl = document.createElement("ol");
        for (let i = 0; i < data.docs.length; i++) {
          var bookID = data.docs[i].seed[0].replace("/books/", "")
          
          var bookInstanceEl = document.createElement("li");
          // if (data.docs[i].isbn) {
          //   var bookISBN = data.docs[i].isbn[0]
          //   bookInstanceEl.setAttribute("data-ISBN", bookISBN) 
          // }
          // var bookPublisher = data.docs[i].publisher[0]
          // if (bookPublisher.indexOf(',') > -1) 
          // {bookPublisher = bookPublisher.substring(1, bookPublisher.indexOf(',')) }
          // if (data.docs[i].id_goodreads) {
          //   bookInstanceEl.setAttribute("data-goodreads", data.docs[i].id_goodreads)
          // }

          getBookInfo(bookID)

          bookInstanceEl.setAttribute("data-OLID", bookID)
          // bookInstanceEl.textContent = bookPublisher + " (" + publishDates + ")"
          bookListEl.appendChild(bookInstanceEl)
          bookAvailabilityEl.appendChild(bookListEl)
        }
        bookInfoEl.appendChild(bookAvailabilityEl);
      });
    } else {
      alert("Error: " + bookID + " not found at Open Library");
    }
  })
    .catch(function(error) {
      alert("Unable to connect to Open Library API");
    });

}


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

  var displayBooks = function(author, authorKey) {

  var apiUrl = "https://openlibrary.org/authors/" + authorKey + "/works.json?limit=200";

fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        // console.log(data);
        // do something here
        for (let i = 0; i < data.entries.length; i++) {
            var bookEl = document.createElement("p");
            var bookName = data.entries[i].title;
            var bookString = encodeURIComponent(data.entries[i].title.replace(/-/g,'').trim())
            if (data.entries[i].subjects) {
            var bookSubject = encodeURIComponent(data.entries[i].subjects[0].replace(/-/g,'').trim());
            } else {
              var bookSubject = "\"\""
            }
            var bookAuthor = author.toLowerCase().replaceAll(" ", "+")
            bookEl.setAttribute("id", "work-" + i)
            bookEl.textContent = bookName;
            bookContainerEl.appendChild(bookEl);
            bookInfoEl = document.querySelector("#work-" + i);
            getBookAvailability(bookAuthor, bookString, bookSubject, bookInfoEl)
        }
        // Sort results alphabetically or by date published

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
        displayBooks(author, authorKey);
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