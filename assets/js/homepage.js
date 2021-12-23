var authorFormEl = document.querySelector("#author-form");
var authorInputEl = document.querySelector("#author");
var bookResultsEl = document.querySelector("#book-results");
var bookContainerEl = document.querySelector("#books-container");
var entries = ""
var bookInfoEl = ""
var bookPublisher = ""
var bookDate = ""



var getBookInfo = function(bookID) {

  // var apiUrl = "https://openlibrary.org/api/books?bibkeys=OLID:" + bookID + "&format=json";
  var apiUrl = "https://noahs-server-proj1.herokuapp.com/https://openlibrary.org/api/volumes/brief/olid/" + bookID + ".json"

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

        var bookAvailabilityEl = document.createElement("p");
        var bookListEl = document.createElement("ol");
        for (let i = 0; i < data.docs.length; i++) {
          var bookID = data.docs[i].seed[0].replace("/books/", "")
          
          var bookInstanceEl = document.createElement("li");
          if (data.docs[i].isbn) {
            var bookISBN = data.docs[i].isbn[0]
            bookInstanceEl.setAttribute("data-ISBN", bookISBN) 
          }
          var bookPublisher = data.docs[i].publisher[0]
          if (bookPublisher.indexOf(',') > -1) 
          {bookPublisher = bookPublisher.substring(1, bookPublisher.indexOf(',')) }
          if (data.docs[i].id_goodreads) {
            bookInstanceEl.setAttribute("data-goodreads", data.docs[i].id_goodreads)
          }

          // getBookInfo(bookID)

          bookInstanceEl.setAttribute("data-OLID", bookID)
          bookInstanceEl.textContent = bookPublisher
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
    var authorWorks = {
    authorName: null,
    authorID: null,
    works: []
    }
  authorWorks.authorName = author
  authorWorks.authorID = authorKey

  var apiUrl = "https://openlibrary.org/authors/" + authorKey + "/works.json?limit=200";

fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        // console.log(data);
        bookResultsEl.innerHTML = ""
        var bookResultsUpdate = $(bookResultsEl)
        var booksContainerEl = $("<div>")
        .attr("id", "books-container")
        .addClass("list-group")
        var entries = data.size
        var foundEntriesEl = $("<h2>")
        .addClass('card-header')
        .attr('id', 'found-entries')
        .text(" works found:")
        var numberEntriesEl = $("<span>")
        .attr('id', 'number-entries')
        .addClass('number-entries')
        .text(entries)
        foundEntriesEl.prepend(numberEntriesEl)
        bookResultsUpdate.append(foundEntriesEl, booksContainerEl)
        for (let i = 0; i < data.entries.length; i++) {
          var bookName = data.entries[i].title;
          var bookStringQuery = encodeURIComponent(data.entries[i].title.replace(/-/g,'').trim())
          var bookString = data.entries[i].title.replace(/-/g,'').trim()
          var work = {
            title: null,
            subject: null,
          }
          if (data.entries[i].subjects) {
            var bookSubjectQuery = encodeURIComponent(data.entries[i].subjects[0].replace(/-/g,'').trim());
            var bookSubject = data.entries[i].subjects[0].replace(/-/g,'').trim();
            work.title = bookString
            work.subject =  bookSubject
            authorWorks.works.push(work)
          } else {
            var bookSubjectQuery = "\"\""
            work.title = bookString
            work.subject =  ""
            authorWorks.works.push(work)
          }
          var bookAuthor = author.toLowerCase().replaceAll(" ", "+")
          
          // getBookAvailability(bookAuthor, bookString, bookSubject, bookInfoEl)
        }
        authorWorks.works.sort(function(a, b) {
          return ((a.title < b.title) ? -1 : ((a.title == b.title) ? 0 : 1));
        });
        var bookContainerEl = document.querySelector("#books-container");
        bookContainerEl.innerHTML = ""
        var bookTitles = $(bookContainerEl)  
        for (var i = 0; i < authorWorks.works.length; i++) {
          var bookEl = $("<h3>")
          .addClass('title')
          .attr("id", "work-" + i)
          .text(authorWorks.works[i].title)
          var bookSubjectEl = $("<p>")
          .addClass('subject')
          .attr("id", "subject-" + i)
          .text("Subjects: " + authorWorks.works[i].subject) 
          bookTitles.append(bookEl, bookSubjectEl);
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
        var authorKey = data.docs[0].key;
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