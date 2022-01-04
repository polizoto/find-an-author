console.log("before fetch")


var getBookReview= function(bookReview) {
    var apiUrl = "https://api.nytimes.com/svc/books/v3/reviews.json?api-key=lJWY5ZnNFUIjyVV5GnzR4dp24s6HeGUQ"+author
   

 fetch(apiUrl)
 .then(async function(response) {
        if (response.ok) {
            return response.json();
        }
        const err = await response.json();
     return await Promise.resolve({
         status: response.status,
         statusText: response.statusText,
         errorMessage: err,
     });
    }
)
.then(data => {
    console.log(data,"datttta");
    })
.catch(err => {
    console.log(err);
});
}

getBookReview();


console.log("after fetch")