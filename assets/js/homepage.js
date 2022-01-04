var mainEl = document.querySelector("#main");
var bodyEl = document.querySelector("#body");
var authorFormEl = document.querySelector("#author-form");
var authorInputEl = document.querySelector("#author");
var bookResultsEl = document.querySelector("#book-results");
var bookContainerEl = document.querySelector("#books-container");
var entries = ""
var bookInfoEl = ""
var bookPublisher = ""
var bookDate = ""
var bookStatus = ""
var bookName = ""
var bookAuthor = ""
var bookSubject = ""
var authorIndex = ""
var authorKey = ""
var entries = ""
var links = ""
var startIndex = ""
var endIndex = ""
var totalIndex = ""
var previousLink = ""
var nextLink = ""
var highestOffset = ""
var bookStringQuery = ""
var bookSubjectQuery = ""
var title = ""
var onclickArgument = ""
var breadCrumbNav = ""
var breadCrumbNavList = ""

function LT_link () {
  console.log(LT_addLibraryThinglinks());
  // console.log(book);
// for (i in booksInfo)
// 	{
// 	try {
// 		var book = booksInfo[i];
// 		if(book.link)
// 			{
//       document.getElementById(Library-Thing).innerText = "There are " + book.copies + " members of Library Thing who have " + editionName + " with " + book.reviews + " reviews. The book has a rating of " + book.rating + "." 
// 			document.getElementById('LT_'+book.id).innerHTML = '(<a href="' + book.link + '">see on LibraryThing</a>)';
// 			}
// 		}
// 	catch(e) { };
// 	}
}

var getBookInfo = function(event) {
  event.preventDefault();
  var target = $( event.target );
  if (target.is("a")) {
  bookID = event.target.getAttribute("data-OLID")
  libraryID = event.target.getAttribute("data-ISBN")
  bookEdition = event.target.innerText
  var editionStatus = {
    editionName: [],
    openLibrary: [],
    goodReads: [],
    googleBooks: []
    }
    editionStatus.editionName.push(bookEdition)
  // var apiUrl = "https://openlibrary.org/api/volumes/brief/olid/" + bookID + ".json";
  var apiUrl = "https://noahs-server-proj1.herokuapp.com/https://openlibrary.org/api/volumes/brief/olid/" + bookID + ".json"

  fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        bookPublisher = data.records["/books/" + bookID].data.publishers[0].name
        bookDate = data.records["/books/" + bookID].publishDates
        bookStatus = data.records["/books/" + bookID].details.preview;
        bookResultsEl.innerHTML = ""

        editionStatus.openLibrary.push(bookStatus)
        var bookResultsUpdate = $(bookResultsEl)
        var bodyUpdate = $(bodyEl)
        var bookTitleEl = $("<h3>")
        .text(bookEdition.replaceAll("+", " "))
        var openLibraryAvailability = $("<h4>")
        .text("Open Library")
        var openLibraryStatus = $("<p>")
        .text(bookStatus)
        openLibraryAvailability.append(openLibraryStatus)
        var goodReads = $("<h4>")
        .text("Good Reads")
        var libraryThing = $("<h4>")
        .text("Library Thing")
        var libraryThingData = $("<p>")
        .attr("id", "Library-Thing")
        var libraryThingLink = $("<span>")
        .attr("id", "LT_" + libraryID)
        var breadCrumbNavListEdition = $("<li>")
        var editionLink = $("<a>")
        .text(bookEdition.replaceAll("+", " "))
        .attr("id", "edition-name")
        .attr("href", "#")
        breadCrumbNavListEdition.append(editionLink)
        breadCrumbNavList.append(breadCrumbNavListEdition)
        localStorage.setItem("editionStatus", JSON.stringify(editionStatus));
        editionLink.on("click", breadCrumbLinkHandler);
        bookResultsUpdate.append(bookTitleEl, openLibraryAvailability, goodReads, libraryThing);
        if (libraryID) {
          libraryThing.append(libraryThingData, libraryThingLink)
          var libraryJS = $("<script>")
          // .attr("src", "http://www.librarything.com/api/json/workinfo.js?ids=" + libraryID)
          .attr("src", "http://www.librarything.com/api/json/workinfo.js?ids=" + libraryID + "&callback=LT_link")
          bodyUpdate.append(libraryJS);
          // libraryThingData.text("There are " + book.copies + " members of Library Thing who have " + editionName + " with " + book.reviews + " reviews. The book has a rating of " + book.rating + "." )
        }
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
}

var getBookAvailability = function(event) {
  event.preventDefault();
  var target = $( event.target );
  if (target.is("a")) {
  var bookEditions = {
    editionName: [],
    editionID: [],
    bookNumber: [],
    goodReadsID: [],
    editionFullText: []
    }

  bookName = event.target.getAttribute("data-book-name")
  bookAuthor = event.target.getAttribute("data-book-Author")
  bookSubject = event.target.getAttribute("data-subject-query")

  if (bookSubject = "null") {
    var apiUrl = "https://openlibrary.org/search.json?author=" + bookAuthor + "&title=" + bookName;
  } else {
  var apiUrl = "https://openlibrary.org/search.json?author=" + bookAuthor + "&title=" + bookName + "&subject=" + bookSubject;
  }
fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        bookResultsEl.innerHTML = ""
        var bookResultsUpdate = $(bookResultsEl)
        var bookTitleEl = $("<h3>")
        .text(bookName.replaceAll("+", " "))
        var bookAvailabilityEl = $("<p>")
        var bookListEl = $("<ol>")
        .attr('id', 'list-editions')
        for (let i = 0; i < data.docs.length; i++) {

          var bookID = data.docs[i].seed[0].replace("/books/", "")
          var bookInstanceEl = $("<li>")
          var bookLinkEl = $("<a>")
          var bookfullText = $("<span>")
          // if (data.docs[i].isbn) {
          //   var bookISBN = data.docs[i].isbn[0]
          //   bookLinkEl.attr("data-ISBN", bookISBN) 
          // }
          var bookPublisher = data.docs[i].publisher[0]
          if (bookPublisher.indexOf(',') > -1) 
          {bookPublisher = bookPublisher.substring(1, bookPublisher.indexOf(',')) }
          if (data.docs[i].id_goodreads) {
            var goodReadsID = data.docs[i].id_goodreads
            bookLinkEl.attr("data-goodreads", goodReadsID)
          }

          // getBookInfo(bookID)

          bookDate = data.docs[i].publish_year
          editionNumber = data.docs[i].edition_count
          if (data.docs[i].isbn) {
            bookNumberType = "ISBN: " + data.docs[i].isbn[0]
            bookNumber = data.docs[i].isbn[0]
            bookLinkEl.attr("data-ISBN", data.docs[i].isbn[0])
          } else if (data.docs[i].lccn) {
            bookNumberType = "LCCN: " + data.docs[i].lccn
            bookNumber = data.docs[i].lccn
            bookLinkEl.attr("data-ISBN", data.docs[i].lccn)
          } else {
            bookNumberType = "No Record"
          }

          if (data.docs[i].has_fulltext) {
            if (data.docs[i].has_fulltext === "true") {
              fullText = 	"✔️"
            } else {
              fullText = "❌"
            }

          } else {
            fullText = "❌"
          }
          bookfullText.text(" " + fullText)
          
          bookLinkEl.attr("data-OLID", bookID)
          bookLinkEl.attr("href", "#")
          bookLinkEl.text(bookPublisher + " (" + bookDate + ") " + editionNumber + " edition " + "(" + bookNumberType + ")")
          bookEditions.bookNumber.push(bookNumber)
          bookEditions.goodReadsID.push(goodReadsID)
          bookEditions.editionName.push(bookLinkEl.text())
          bookEditions.editionID.push(bookID)
          bookEditions.editionFullText.push(fullText)
          bookInstanceEl.append(bookLinkEl, bookfullText)
          bookListEl.append(bookInstanceEl)
          bookAvailabilityEl.append(bookListEl)
        }
        bookResultsUpdate.append(bookTitleEl, bookAvailabilityEl);
        var breadCrumbNavListBook = $("<li>")
        var bookLink = $("<a>")
        .text(bookName.replaceAll("+", " "))
        .attr("id", "book-name")
        .attr("href", "#")
        breadCrumbNavListBook.append(bookLink)
        breadCrumbNavList.append(breadCrumbNavListBook)
        localStorage.setItem("bookEditions", JSON.stringify(bookEditions));
        bookLink.on("click", breadCrumbLinkHandler);
        bookListEl.on("click", getBookInfo);
      });
    } else {
      alert("Error: " + bookID + " not found at Open Library");
    }
  })
    .catch(function(error) {
      alert("Unable to connect to Open Library API");
    });
  }
}


var formSubmitHandler = function(event) {
    event.preventDefault();
    $('#breadcrumb').remove()
    var authorname = authorInputEl.value.trim();
  
    if (authorname) {
    getAuthorBooks(authorname);
    authorInputEl.value = '';
    } else {
    alert("Please enter the name of an author");
    }
  };

  var incrementIndex = function() {
    authorIndex = (authorIndex + 10)
    displayBooks(author, authorKey, authorIndex);
  }

  var decrementIndex = function() {
    authorIndex = (authorIndex - 10)
    displayBooks(author, authorKey, authorIndex);
  }

  var getPageNumbers = function(entries, authorIndex, highestOffset) {
    var bookResultsUpdate = $(bookResultsEl)
    if (entries > 10) {
      if (authorIndex === highestOffset) {
        endIndex = entries
      } else {
        endIndex = (authorIndex + 10)
      }
      startIndex = (authorIndex + 1)
      var pageNavEl = $("<div>")
        .addClass('card-header')
        .attr('id', 'found-entries')
      var pagesEl = $("<p>")
        .text(startIndex + " to " + endIndex + " of " + entries + " results ")
        var previousLinkEl = $("<span>")
        .html('<i class="fas fa-angle-left fa-3x"></i>')
        .attr('id', 'previous-page')
        if (authorIndex > 0) {
          previousLinkEl.attr('tabindex', "0");
          previousLinkEl.attr('onclick', 'decrementIndex()')
          previousLinkEl.attr('onkeypress', 'decrementIndex()')
          }
        var nextLinkEl = $("<span>")
        .attr('id', 'next-page')
        .html('<i class="fas fa-angle-right fa-3x"></i>')
        if (authorIndex < highestOffset) {
        nextLinkEl.attr('tabindex', "0");
        nextLinkEl.attr('onclick', 'incrementIndex()')
        nextLinkEl.attr('onkeypress', 'incrementIndex()')
        }
        pagesEl.append(previousLinkEl, nextLinkEl)
        pageNavEl.append(pagesEl)
        previousLink = document.getElementById('previous-page');
        nextLink = document.getElementById('next-page');
        bookResultsUpdate.append(pageNavEl)
    } else {
      startIndex = 1
      endIndex = entries
      var pageNavEl = $("<div>")
      .addClass('card-header')
      .attr('id', 'found-entries')
      var pagesEl = $("<p>")
        .text(startIndex + " to " + endIndex + " of " + entries + " results ")
        pageNavEl.append(pagesEl)
        bookResultsUpdate.append(pageNavEl)
    }

  }

  var displayBooks = function(author, authorKey, authorIndex) {
    var authorWorks = {
    authorName: null,
    authorID: null,
    entries: null,
    works: []
    }
  authorWorks.authorName = author
  // console.log(authorWorks.authorName);
  authorWorks.authorID = authorKey
  // if (!bookAuthor) {
  bookAuthor = author.toLowerCase().replaceAll(" ", "+")
  // }
  var apiUrl = "https://openlibrary.org/authors/" + authorKey + "/works.json?limit=10&offset=" + authorIndex;
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
        entries = data.size
        authorWorks.entries = entries
        highestOffset = (Math.floor(entries/10) * 10)
        // links = data.links
        getPageNumbers(entries, authorIndex, highestOffset)
        bookResultsUpdate.append(booksContainerEl)
        for (let i = 0; i < data.entries.length; i++) {
          // var bookName = data.entries[i].title;
          bookStringQuery = encodeURIComponent(data.entries[i].title.replace(/-/g,'').trim())
          var bookString = data.entries[i].title.replace(/-/g,'').trim()
          var work = {
            title: null,
            subject: null,
          }
          var bookSubject = ""
          bookSubjectQuery = ""
          if (data.entries[i].subjects) {
            for (let z = 0; z < data.entries[i].subjects.length; z++) {
            bookSubjectQuery += encodeURIComponent(data.entries[i].subjects[z].replace(/-/g,'').trim() + ", ");
            bookSubject += data.entries[i].subjects[z].replace(/-/g,'').trim() + ", ";
          }
            work.subject =  bookSubject.replace(/,\s*$/, "")
            work.title = bookString
            authorWorks.works.push(work)
          } else {
            bookSubject = "\"\""
            work.title = bookString
            work.subject =  ""
            authorWorks.works.push(work)
          }
        }
        authorWorks.works.sort(function(a, b) {
          return ((a.title < b.title) ? -1 : ((a.title == b.title) ? 0 : 1));
        });
        var bookContainerEl = document.querySelector("#books-container");
        bookContainerEl.innerHTML = ""
        var bookTitles = $(bookContainerEl)  
        for (var i = 0; i < authorWorks.works.length; i++) {
          bookName = authorWorks.works[i].title.replaceAll(" ", "+")
          bookSubjectQuery = authorWorks.works[i].subject.toLowerCase().replaceAll(" ", "+")
          if (!bookSubjectQuery) {
            bookSubjectQuery = null
          }
          // onclickArgument = "getBookAvailability(" + bookName + ", " + bookAuthor + ", " + bookStringQuery + ", " + bookSubjectQuery + ")"
          var bookEl = $("<h3>")
          .addClass('title')
          .attr("id", "work-" + i)
          var bookLink = $("<a>")
          .attr("data-book-name", bookName)
          .attr("data-book-author", bookAuthor)
          .attr("data-subject-query", bookSubjectQuery)
          .attr("href", "#")
          .text(authorWorks.works[i].title)
          if (authorWorks.works[i].subject === "") {
            var bookSubjectEl = $("<p>")
            .addClass('subject')
            .attr("id", "subject-" + i)
            .text("No subjects listed") 
          } else {
            var bookSubjectEl = $("<p>")
            .addClass('subject')
            .attr("id", "subject-" + i)
            .text("Subjects: " + authorWorks.works[i].subject) 
          }
          bookEl.append(bookLink)
          bookLink.attr("data-subject-query", bookSubjectQuery)  
          bookTitles.append(bookEl, bookSubjectEl);
        } 
          var bottomNavEl = document.querySelector("#found-entries");
          var clone = bottomNavEl.cloneNode(true)
          clone.setAttribute("id", "bottom-nav")
          var updateResultsEl = $(bookResultsEl) 
          updateResultsEl.append(clone)
          localStorage.setItem("authorWorks", JSON.stringify(authorWorks));
          bookContainerEl.addEventListener("click", getBookAvailability);
      });
    } else {
      alert("Error: " + author + "'s books not found at Open Library");
    }
  })
    .catch(function(error) {
      alert("Unable to connect to Open Library API");
    });

  }

  var breadCrumbLinkHandler = function(event) {
    event.preventDefault();
    bookResultsEl.innerHTML = ""
    link = event.target.getAttribute("id")
    if (link === "author-name") {
      $('#book-name').parent().remove()
      $('#edition-name').parent().remove()
      authorWorks = JSON.parse(localStorage.getItem("authorWorks"));

      var bookResultsUpdate = $(bookResultsEl)
      var booksContainerEl = $("<div>")
      .attr("id", "books-container")
      .addClass("list-group")
      entries = authorWorks.entries
      highestOffset = (Math.floor(entries/10) * 10)
      getPageNumbers(entries, authorIndex, highestOffset)
      bookResultsUpdate.append(booksContainerEl)
      var bookContainerEl = document.querySelector("#books-container");
      bookContainerEl.innerHTML = ""
      var bookTitles = $(bookContainerEl)  
      for (var i = 0; i < authorWorks.works.length; i++) {
        bookName = authorWorks.works[i].title.replaceAll(" ", "+")
        bookSubjectQuery = authorWorks.works[i].subject.toLowerCase().replaceAll(" ", "+")
        if (!bookSubjectQuery) {
          bookSubjectQuery = null
        }
        var bookEl = $("<h3>")
        .addClass('title')
        .attr("id", "work-" + i)
        var bookLink = $("<a>")
        .attr("data-book-name", bookName)
        .attr("data-book-author", bookAuthor)
        .attr("data-subject-query", bookSubjectQuery)
        .attr("href", "#")
        .text(authorWorks.works[i].title)
        if (authorWorks.works[i].subject === "") {
          var bookSubjectEl = $("<p>")
          .addClass('subject')
          .attr("id", "subject-" + i)
          .text("No subjects listed") 
        } else {
          var bookSubjectEl = $("<p>")
          .addClass('subject')
          .attr("id", "subject-" + i)
          .text("Subjects: " + authorWorks.works[i].subject) 
        }
        bookEl.append(bookLink)
        bookLink.attr("data-subject-query", bookSubjectQuery)  
        bookTitles.append(bookEl, bookSubjectEl);
      } 
        var bottomNavEl = document.querySelector("#found-entries");
        var clone = bottomNavEl.cloneNode(true)
        clone.setAttribute("id", "bottom-nav")
        var updateResultsEl = $(bookResultsEl) 
        updateResultsEl.append(clone)
        bookContainerEl.addEventListener("click", getBookAvailability);
    }
    if (link === "book-name") {
      $('#edition-name').parent().remove()
      bookEditions = JSON.parse(localStorage.getItem("bookEditions"));

      var bookResultsUpdate = $(bookResultsEl)
        var bookTitleEl = $("<h3>")
        .text(bookName.replaceAll("+", " "))
        var bookAvailabilityEl = $("<p>")
        var bookListEl = $("<ol>")
        .attr('id', 'list-editions')
        for (let i = 0; i < bookEditions.editionName.length; i++) {

          var bookID = bookEditions.editionID[i]
          var bookInstanceEl = $("<li>")
          var bookLinkEl = $("<a>")
          var bookfullText = $("<span>")
          bookLinkEl.attr("data-OLID", bookID)
          bookLinkEl.attr("data-ISBN", bookEditions.bookNumber[i])
          bookLinkEl.attr("data-goodreads", bookEditions.goodReadsID[i])
          bookLinkEl.attr("href", "#")
          bookLinkEl.text(bookEditions.editionName[i])
          bookfullText.text(" " + bookEditions.editionFullText[i])
          bookInstanceEl.append(bookLinkEl, bookfullText)
          bookListEl.append(bookInstanceEl)
          bookAvailabilityEl.append(bookListEl)
        }
        bookResultsUpdate.append(bookTitleEl, bookAvailabilityEl);
        bookListEl.on("click", getBookInfo);
    }
    if (link === "edition-name") {
      editionStatus = JSON.parse(localStorage.getItem("editionStatus"));
      
    }
  }

  var getAuthorBooks = function(authorname) {
    authorFormEl.value = ''
  var apiUrl = "https://openlibrary.org/search/authors.json?q=" + authorname;

  fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        authorFormEl.value = ''
        authorKey = data.docs[0].key;
        authorIndex = 0
        author = authorname
        var bookResultsUpdate = $(bookResultsEl)
        breadCrumbNav = $("<div>")
        .attr("id", "breadcrumb")
        breadCrumbNavList = $("<ol>")
        .addClass("breadcrumb")
        var breadCrumbNavListAuthor = $("<li>")
        var authorLink = $("<a>")
        .text(author)
        .attr("id", "author-name")
        .attr("href", "#")
        breadCrumbNavListAuthor.append(authorLink)
        breadCrumbNavList.append(breadCrumbNavListAuthor)
        breadCrumbNav.append(breadCrumbNavList)
        bookResultsUpdate.before(breadCrumbNav)
        authorLink.on("click", breadCrumbLinkHandler);
        displayBooks(author, authorKey, authorIndex);
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