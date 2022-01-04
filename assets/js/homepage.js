var mainEl = document.querySelector("#main");
var searchEl = document.querySelector("#search");
var bodyEl = document.querySelector("#body");
var authorFormEl = document.querySelector("#author-form");
var authorInputEl = document.querySelector("#author");
var bookResultsEl = document.querySelector("#book-results");
var bookContainerEl = document.querySelector("#books-container");
var savedItemsEl = document.querySelector("#saved-items");
var data_Copies = document.querySelector("#data-copies")
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
var newBookID = ""

var clearSearchForm = function () {
  localStorage.removeItem("savedSearches")
}

var getSavedItem = function (event) {
  event.preventDefault();
  var target = $( event.target );
  if (target.is("button")) {
    storageID = event.target.getAttribute("data-storage-item")
    savedSearches = JSON.parse(localStorage.getItem("savedSearches"));
    localStorage.removeItem("authorWorks")
    localStorage.removeItem("bookEditions")
    localStorage.removeItem("editionStatus")
    authorWorks = savedSearches[storageID].authorWorks
    localStorage.setItem("authorWorks", JSON.stringify(authorWorks));
    bookEditions = savedSearches[storageID].bookEditions
    localStorage.setItem("bookEditions", JSON.stringify(bookEditions));
    editionStatus = savedSearches[storageID].editionStatus
    localStorage.setItem("editionStatus", JSON.stringify(editionStatus));

      bookStatus = savedSearches[storageID].editionStatus.openLibrary.bookstatus;
      var mainUpdate = $(mainEl)
      bookResultsEl.innerHTML = ""
      var bookResultsUpdate = $(bookResultsEl)
      bookResultsUpdate.innerHTML = ""
        if (document.querySelector("#breadcrumb")) {
          var breadCrumbNav = document.querySelector("#breadcrumb")
          breadCrumbNav.remove()
        } 
        if (document.querySelector("#save-results")) {
          var saveResultsEl = document.querySelector("#save-results");
          saveResultsEl.remove()
        } 
        
        breadCrumbNav = $("<div>")
        .attr("id", "breadcrumb")
        breadCrumbNavList = $("<ol>")
        .addClass("breadcrumb")
        var breadCrumbNavListAuthor = $("<li>")
        var authorLink = $("<a>")
        .text(savedSearches[storageID].authorWorks.authorName)
        .attr("id", "author-name")
        .attr("href", "#")
        breadCrumbNavListAuthor.append(authorLink)
        breadCrumbNav.append(breadCrumbNavList)
        bookResultsUpdate.before(breadCrumbNav)
        var breadCrumbNavListBook = $("<li>")
        var bookLink = $("<a>")
        .text(savedSearches[storageID].bookEditions.workName)
        .attr("id", "book-name")
        .attr("href", "#")
        breadCrumbNavListBook.append(bookLink)
        var breadCrumbNavListEdition = $("<li>")
        var editionLink = $("<a>")
        .text(savedSearches[storageID].editionStatus.editionName)
        .attr("id", "edition-name")
        .attr("href", "#")
        breadCrumbNavListEdition.append(editionLink)
        breadCrumbNavList.append(breadCrumbNavListAuthor, breadCrumbNavListBook, breadCrumbNavListEdition)
        authorLink.on("click", breadCrumbLinkHandler);        
        bookLink.on("click", breadCrumbLinkHandler);
        var bookTitleEl = $("<h3>")
        .text(savedSearches[storageID].editionStatus.editionName)
        var openLibraryAvailability = $("<h4>")
        .text("Open Library")
        var openLibraryLink = $("<a>")
        openLibraryLink
        .attr("dataOL-link", savedSearches[storageID].editionStatus.openLibrary.booklink)
        .attr("href", savedSearches[storageID].editionStatus.openLibrary.booklink)
        .attr("target", "_blank")
        .text("(See on Open Library)")
        var openLibraryEl = $("<p>")
        if (bookStatus === "noview") {
          var openLibraryStatus = $("<span>")
          openLibraryStatus
          .attr("data-status", "noview")
          .text("not available")
          .addClass("open-library")
        } else if (bookStatus === "borrow") {
          var openLibraryStatus = $("<span>")
          openLibraryStatus
          .attr("data-status", "borrow")
          .text("available to borrow")
          .addClass("open-library")
        } else if (bookStatus === "full") {
          var openLibraryStatus = $("<span>")
          openLibraryStatus
          .attr("data-status", "full")
          .text("freely available")
          .addClass("open-library")
        } else if (bookStatus === "restricted") {
          var openLibraryStatus = $("<span>")
          openLibraryStatus
          .attr("data-status", "restricted")
          .text("restricted to users with a disability")
          .addClass("open-library")
        }
        openLibraryEl
        .append("This book is ", openLibraryStatus, ". ", openLibraryLink)

        var libraryThing = $("<h4>")
        .text("Library Thing")
        .attr("id", "library-thing")
        .attr("data-bookID", savedSearches[storageID].editionStatus.libraryThing.bookID)

        if (savedSearches[storageID].editionStatus.libraryThing.bookID) {
          libraryID = savedSearches[storageID].editionStatus.libraryThing.bookID
          var libraryThingData = $("<p>")
          .attr("id", "LT_" + libraryID)
          var libraryThingDataCopies = $("<span>")
          libraryThingDataCopies
          .attr("data-copies", savedSearches[storageID].editionStatus.libraryThing.bookcopies)
          .attr("id", "data-copies")
          .text(savedSearches[storageID].editionStatus.libraryThing.bookcopies)
          .addClass("library-thing")
          var libraryThingDataReviews = $("<span>")
          libraryThingDataReviews
          .attr("data-reviews", savedSearches[storageID].editionStatus.libraryThing.bookreviews)
          .text(savedSearches[storageID].editionStatus.libraryThing.bookreviews)
          .addClass("library-thing")
          var libraryThingDataRating = $("<span>")
          libraryThingDataRating
          .attr("data-rating", savedSearches[storageID].editionStatus.libraryThing.bookrating)
          .text(savedSearches[storageID].editionStatus.libraryThing.bookrating)
          .addClass("library-thing")
          var libraryThingDataLink = $("<a>")
          libraryThingDataLink
          .attr("data-link", savedSearches[storageID].editionStatus.libraryThing.booklink)
          .attr("href", savedSearches[storageID].editionStatus.libraryThing.booklink)
          .attr("target", "_blank")
          .text("(See on LibraryThing)")
          libraryThingData
          .append(libraryThingDataCopies , " members have this book with " , libraryThingDataReviews , " reviews. It has a rating of " , libraryThingDataRating , ". " , libraryThingDataLink) 
        } else {
          var libraryThingData = $("<p>")
          libraryThingData
          .append("No members have this book!")
        }
        }

        bookResultsUpdate.append(bookTitleEl, openLibraryAvailability, openLibraryEl, libraryThing);
        bookResultsUpdate.append(libraryThingData)

        if (document.querySelector("#start-over-form")) {
          var startOverForm = document.querySelector("#start-over-form")
          startOverForm.innerHTML = ''
        } 

        var startOverForm = $("<form>")
        startOverForm
        .attr("id", "start-over-form")
        .addClass("card-body")
        var startOverButton = $("<button>")
        startOverButton
        .attr("id", "start-over-button")
        .addClass("myButton")
        .text("Start Over")
        startOverForm.append(startOverButton)
        var saveResultsEl = $("<div>")
        saveResultsEl
        .attr("id", "save-results")
        .addClass("card")
        saveResultsEl.append(startOverForm)
        startOverForm.on("submit", startOver);
        mainUpdate.append(saveResultsEl)

        }

        var getSearch = function () {
  if (localStorage.getItem("savedSearches")) {
  savedSearches = JSON.parse(localStorage.getItem("savedSearches"));
  var savedItemsHeader = $("<h2>")
  savedItemsHeader
  .addClass("card-header text-uppercase")
  .text("Past Searches")
  var savedItemsForm = $("<form>")
  savedItemsForm
  .attr("id", "saved-items-form")
  for (let i = 0; i < savedSearches.length; i++) {
    var newSavedItems = $("<button>")
    newSavedItems
    .addClass("myButton")
    .attr("data-storage-item", i)
    .append(savedSearches[i].authorWorks.authorName, " - ", savedSearches[i].bookEditions.workName, " - ", savedSearches[i].editionStatus.editionName)  
    savedItemsForm.append(newSavedItems)
  }
  var clearItemsForm = $("<form>")
  clearItemsForm
  .attr("id", "clear-items-form")
  var clearSearchButton = $("<button>")
  clearSearchButton
  .addClass("myButton")
  .text("Clear Search Results")
  clearItemsForm.append(clearSearchButton)
  var savedItemsElUpdate = $(savedItemsEl)
  savedItemsElUpdate.append(savedItemsHeader, savedItemsForm, clearItemsForm)
  savedItemsForm.on("click", getSavedItem);
  clearItemsForm.on("submit", clearSearchForm);
  }
}

var saveSearch = function (event) {
  // event.preventDefault();
  authorWorks = JSON.parse(localStorage.getItem("authorWorks"));
  bookEditions = JSON.parse(localStorage.getItem("bookEditions"));
  editionStatus = JSON.parse(localStorage.getItem("editionStatus"));

  savedItem = {authorWorks, bookEditions, editionStatus}

  if (localStorage.getItem("savedSearches")) {
    savedSearches = JSON.parse(localStorage.getItem("savedSearches"));
    savedSearches.unshift(savedItem)
    if (savedSearches.length > 9) {
      savedSearches.splice(-1)
    }
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
    } else {
      savedItemStorage = []
      savedItem = {authorWorks, bookEditions, editionStatus}
      savedItemStorage.unshift(savedItem)
      localStorage.setItem("savedSearches", JSON.stringify(savedItemStorage));
    }
}

var startOver = function () {
bookResultsEl.innerHTML = ''
}

function LT_link (booksInfo) {
  var libraryThingEl = document.querySelector("#library-thing");
  var libraryID = $(libraryThingEl)
  var librarybookID = libraryID.attr("data-bookID")
  for (i in booksInfo)
	{
    try {
      var book = booksInfo[librarybookID];
      if(book.link)
			{
        var libraryThingDataCopies = $("<span>")
        libraryThingDataCopies
        .attr("data-copies", book.copies)
        .attr("id", "data-copies")
        .text(book.copies)
        .addClass("library-thing")
        var libraryThingDataReviews = $("<span>")
        libraryThingDataReviews
        .attr("data-reviews", book.reviews)
        .text(book.reviews)
        .addClass("library-thing")
        var libraryThingDataRating = $("<span>")
        libraryThingDataRating
        .attr("data-rating", book.rating)
        .text(book.rating)
        .addClass("library-thing")
        var libraryThingDataLink = $("<a>")
        libraryThingDataLink
        .attr("data-link", book.link)
        .attr("href", book.link)
        .attr("target", "_blank")
        .text("(See on LibraryThing)")
        var libraryIDEL = document.getElementById('LT_'+book.id);
        var libraryIDELUpdate = $(libraryIDEL)
        libraryIDELUpdate
        .append(libraryThingDataCopies , " members have this book with " , libraryThingDataReviews , " reviews. It has a rating of " , libraryThingDataRating , ". " , libraryThingDataLink)
			} else {
      var book = booksInfo[librarybookID];
      var libraryIDEL = document.getElementById('LT_'+librarybookID);         
      var libraryIDELUpdate = $(libraryIDEL)
      libraryIDELUpdate.append("No members have this book!")
      }
      editionStatus = JSON.parse(localStorage.getItem("editionStatus"));
      editionStatus.libraryThing.bookID = book.id
      editionStatus.libraryThing.bookcopies = book.copies
      editionStatus.libraryThing.bookreviews = book.reviews
      editionStatus.libraryThing.bookrating = book.rating
      editionStatus.libraryThing.booklink = book.link
      localStorage.setItem("editionStatus", JSON.stringify(editionStatus));
		}
	catch(e) {
    var book = booksInfo[librarybookID];
    var libraryIDEL = document.getElementById('LT_'+librarybookID);         
    var libraryIDELUpdate = $(libraryIDEL)
    libraryIDELUpdate.append("No members have this book!")
    return
  };
	}
}

var getBookInfo = function(event) {
  event.preventDefault();
  var target = $( event.target );
  if (target.is("a")) {
  bookID = event.target.getAttribute("data-OLID")
  libraryID = event.target.getAttribute("data-ISBN")
  newBookID = libraryID
  bookEdition = event.target.innerText
  var editionStatus = {
    editionName: [],
    openLibrary: {
      bookID: null,
      bookstatus: null,
      booklink: null
    },
    libraryThing: {
      bookID: null,
      bookcopies: null,
      bookreviews: null,
      bookrating: null,
      booklink: null
    },
    }
    editionStatus.editionName.push(bookEdition)
  var apiUrl = "https://noahs-server-proj1.herokuapp.com/https://openlibrary.org/api/volumes/brief/olid/" + bookID + ".json"

  fetch(apiUrl)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        bookStatus = data.records["/books/" + bookID].details.preview;
        bookResultsEl.innerHTML = ""
        var mainUpdate = $(mainEl)
        var bookResultsUpdate = $(bookResultsEl)
        var bodyUpdate = $(bodyEl)
        var bookTitleEl = $("<h3>")
        .text(bookEdition.replaceAll("+", " "))
        var openLibraryAvailability = $("<h4>")
        .text("Open Library")
        var openLibraryLink = $("<a>")
        openLibraryLink
        .attr("dataOL-link", data.records["/books/" + bookID].details.info_url)
        .attr("href", data.records["/books/" + bookID].details.info_url)
        .attr("target", "_blank")
        .text("(See on Open Library)")
        editionStatus.openLibrary.bookID = bookID
        editionStatus.openLibrary.bookstatus = bookStatus
        editionStatus.openLibrary.booklink = data.records["/books/" + bookID].details.info_url
        var openLibraryEl = $("<p>")
        if (bookStatus === "noview") {
          var openLibraryStatus = $("<span>")
          openLibraryStatus
          .attr("data-status", "noview")
          .text("not available")
          .addClass("open-library")
        } else if (bookStatus === "borrow") {
          var openLibraryStatus = $("<span>")
          openLibraryStatus
          .attr("data-status", "borrow")
          .text("available to borrow")
          .addClass("open-library")
        } else if (bookStatus === "full") {
          var openLibraryStatus = $("<span>")
          openLibraryStatus
          .attr("data-status", "full")
          .text("freely available")
          .addClass("open-library")
        } else if (bookStatus === "restricted") {
          var openLibraryStatus = $("<span>")
          openLibraryStatus
          .attr("data-status", "restricted")
          .text("restricted to users with a disability")
          .addClass("open-library")
        }
        openLibraryEl
        .append("This book is ", openLibraryStatus, ". ", openLibraryLink)
        var libraryThing = $("<h4>")
        .text("Library Thing")
        .attr("id", "library-thing")
        .attr("data-bookID", libraryID)
        var libraryThingData = $("<p>")
        .attr("id", "LT_" + libraryID)
        var breadCrumbNavListEdition = $("<li>")
        var editionLink = $("<a>")
        .text(bookEdition.replaceAll("+", " "))
        .attr("id", "edition-name")
        .attr("href", "#")
        breadCrumbNavListEdition.append(editionLink)
        breadCrumbNavList.append(breadCrumbNavListEdition)
        var saveResultsEl = $("<div>")
        saveResultsEl
        .attr("id", "save-results")
        .addClass("card")
        var saveResultsForm = $("<form>")
        saveResultsForm
        .attr("id", "save-form")
        .addClass("card-body")
        var saveResultsButton = $("<button>")
        saveResultsButton
        .attr("id", "save-results-button")
        .addClass("myButton")
        .text("Save Search Results")
        var startOverForm = $("<form>")
        startOverForm
        .attr("id", "start-over-form")
        .addClass("card-body")
        var startOverButton = $("<button>")
        startOverButton
        .attr("id", "start-over-button")
        .addClass("myButton")
        .text("Start Over")
        saveResultsForm.append(saveResultsButton)
        startOverForm.append(startOverButton)
        saveResultsEl.append(saveResultsForm, startOverForm)
        saveResultsForm.on("submit", saveSearch);
        startOverForm.on("submit", startOver);
        bookResultsUpdate.append(bookTitleEl, openLibraryAvailability, openLibraryEl, libraryThing);
        mainUpdate.append(saveResultsEl)
        localStorage.setItem("editionStatus", JSON.stringify(editionStatus));
        bookResultsUpdate.append(libraryThingData)

        if (libraryID) {
          var libraryJS = $("<script>")
          .attr("src", "https://www.librarything.com/api/json/workinfo.js?ids=" + libraryID + "&callback=LT_link")
          bodyUpdate.append(libraryJS);
        } else {
          libraryThingData.append("No members have this book!")
        }
      });
    } else {
      // alert("Error: " + bookID + " not found at Open Library");
      var modalMessage = document.querySelector("#modal-message");
      modalMessage.textContent = "Error: " + bookID + " not found at Open Library"
      modal.callOpen
      modal.opener = document.activeElement
      openModal()
    }
  })
    .catch(function(error) {
      console.log('error ', error)
     // alert("Unable to connect to Open Library API");
     var modalMessage = document.querySelector("#modal-message");
     modalMessage.textContent = "Unable to connect to Open Library API"
     modal.callOpen
     modal.opener = document.activeElement
     openModal()
    });
  }
}

var getBookAvailability = function(event) {
  event.preventDefault();
  var target = $( event.target );
  if (target.is("a")) {
  var bookEditions = {
    workName: null,
    editionName: [],
    editionID: [],
    bookNumber: [],
    goodReadsID: [],
    editionFullText: []
    }

  bookName = event.target.getAttribute("data-book-name")
  bookAuthor = event.target.getAttribute("data-book-author")
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
        // console.log(data)
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
          var bookPublisher = data.docs[i].publisher[0]
          if (bookPublisher.indexOf(',') > -1) 
          {bookPublisher = bookPublisher.substring(1, bookPublisher.indexOf(',')) }
          if (data.docs[i].id_goodreads) {
            var goodReadsID = data.docs[i].id_goodreads
            bookLinkEl.attr("data-goodreads", goodReadsID)
          }

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
            bookNumber = "none"
          }
          if (data.docs[i].has_fulltext) {
            if (data.docs[i].has_fulltext === true) {
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
          bookEditions.workName = bookName.replaceAll("+", " ")
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

        var bookResultsKey = $("<p>")
        bookResultsKey
        .attr("id", "book-results-key")
        .text("Full text available: ✔️ (yes) ❌ (no)")
        bookResultsUpdate.prepend(bookResultsKey)

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
      // alert("Error: " + bookID + " not found at Open Library");
      var modalMessage = document.querySelector("#modal-message");
      modalMessage.textContent = "Error: " + bookID + " not found at Open Library"
      modal.callOpen
      modal.opener = document.activeElement
      openModal()
    }
  })
    .catch(function(error) {
      // alert("Unable to connect to Open Library API");
      var modalMessage = document.querySelector("#modal-message");
      modalMessage.textContent = "Unable to connect to Open Library API"
      modal.callOpen
      modal.opener = document.activeElement
      openModal()
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
    var modalMessage = document.querySelector("#modal-message");
    modalMessage.textContent = "You must enter the name of an author."
    modal.callOpen
    modal.opener = document.activeElement
    openModal()
    }
  };

  var incrementIndex = function() {
    if (!authorIndex){
    var authorWorks = JSON.parse(localStorage.getItem("authorWorks"))
    author = authorWorks.authorName
    authorIndex = authorWorks.authorIndex
    bookResultsEl.innerHTML = ""
    }
    authorIndex = (authorIndex + 10)
    displayBooks(author, authorKey, authorIndex);
  }

  var decrementIndex = function() {
    if (!authorIndex){
      var authorWorks = JSON.parse(localStorage.getItem("authorWorks"))
      author = authorWorks.authorName
      authorIndex = authorWorks.authorIndex
      }
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
        .html('<i class="fas fa-angle-left fa-2x"></i>')
        .attr('id', 'previous-page')
        if (authorIndex > 0) {
          previousLinkEl.attr('tabindex', "0");
          previousLinkEl.attr('onclick', 'decrementIndex()')
          previousLinkEl.attr('onkeypress', 'decrementIndex()')
          }
        var nextLinkEl = $("<span>")
        .attr('id', 'next-page')
        .html('<i class="fas fa-angle-right fa-2x"></i>')
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
    if (!authorKey) {
      var authorWorks = JSON.parse(localStorage.getItem("authorWorks"))
      var authorKey = authorWorks.authorID
      // var authorIndex = authorWorks.authorIndex
    }
    var authorWorks = {
    authorName: null,
    authorID: null,
    entries: null,
    authorIndex: null,
    works: []
    }
  authorWorks.authorName = author
  authorWorks.authorID = authorKey
  authorWorks.authorIndex = authorIndex

    var bookAuthor = author.replaceAll(" ", "+")

  var apiUrl = "https://openlibrary.org/authors/" + authorKey + "/works.json?limit=10&offset=" + authorIndex;
fetch(apiUrl)
.then(function(response) {
  if (response.ok) {
    response.json().then(function(data) {
      var bookResultsEl = document.querySelector("#book-results");
      bookResultsEl.innerHTML = ""
      var booksContainerElUpdate = $("#books-container")
      booksContainerElUpdate.html("")
        var bookResultsUpdate = $(bookResultsEl)
        bookResultsUpdate.html("")
        var booksContainerEl = $("<div>")
        .attr("id", "books-container")
        .addClass("list-group")
        entries = data.size
        authorWorks.entries = entries
        highestOffset = (Math.floor(entries/10) * 10)
        getPageNumbers(entries, authorIndex, highestOffset)
        bookResultsUpdate.append(booksContainerEl)
        for (let i = 0; i < data.entries.length; i++) {
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
          bookAuthor = authorWorks.authorName.replaceAll(" ", "+")
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
          localStorage.setItem("authorWorks", JSON.stringify(authorWorks));
          bookContainerEl.addEventListener("click", getBookAvailability);
      });
    } else {
      // alert("Error: " + author + "'s books not found at Open Library");
      var modalMessage = document.querySelector("#modal-message");
      modalMessage.textContent = "Error: " + author + "'s books not found at Open Library"
      modal.callOpen
      modal.opener = document.activeElement
      openModal()
    }
  })
    .catch(function(error) {
      // alert("Unable to connect to Open Library API");
      var modalMessage = document.querySelector("#modal-message");
      modalMessage.textContent = "Unable to connect to Open Library API"
      modal.callOpen
      modal.opener = document.activeElement
      openModal()
    });

  }

  var breadCrumbLinkHandler = function(event) {
    event.preventDefault();
    bookResultsEl.innerHTML = ""
    link = event.target.getAttribute("id")
    if (link === "author-name") {
      $('#book-name').parent().remove()
      $('#edition-name').parent().remove()
      $('#save-results').remove()
      authorWorks = JSON.parse(localStorage.getItem("authorWorks"));

      var bookResultsUpdate = $(bookResultsEl)
      var booksContainerEl = $("<div>")
      .attr("id", "books-container")
      .addClass("list-group")
      entries = authorWorks.entries
      highestOffset = (Math.floor(entries/10) * 10)
      if (!authorIndex){
        var authorWorks = JSON.parse(localStorage.getItem("authorWorks"))
        author = authorWorks.authorName
        authorIndex = authorWorks.authorIndex
        }
      getPageNumbers(entries, authorIndex, highestOffset)
      bookResultsUpdate.append(booksContainerEl)
      var bookAuthor = authorWorks.authorName.replaceAll(" ", "+")
      var bookContainerEl = document.querySelector("#books-container");
      bookContainerEl.innerHTML = ""
      var bookTitles = $(bookContainerEl)  
      for (var i = 0; i < authorWorks.works.length; i++) {
        bookAuthor = authorWorks.authorName.replaceAll(" ", "+")
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
      $('#save-results').remove()
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

        var bookResultsKey = $("<p>")
        bookResultsKey
        .attr("id", "book-results-key")
        .text("Full text available: ✔️ (yes) ❌ (no)")
        bookResultsUpdate.prepend(bookResultsKey)

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
      // alert("Error: Author Not Found");
      var modalMessage = document.querySelector("#modal-message");
      modalMessage.textContent = "Error: Author Not Found"
      modal.callOpen
      modal.opener = document.activeElement
      openModal()
    }
  })
    .catch(function(error) {
      // alert("Unable to connect to Open Library API");
      var modalMessage = document.querySelector("#modal-message");
      modalMessage.textContent = "Unable to connect to Open Library API"
      modal.callOpen
      modal.opener = document.activeElement
      openModal()
    });
};


authorFormEl.addEventListener("submit", formSubmitHandler);
getSearch()