document.addEventListener('DOMContentLoaded', function(event){

})


//get data for searching books
function getBooksData(searchInput){
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
  .then(resp => resp.json())
  .then(search => renderBooksToPage(search.items))
}

function renderBooksToPage(searchData) {
  for (bookData of searchData) {
    renderSingleBookToPage(bookData.volumeInfo)
  }
}

function renderSingleBookToPage(bookData){
  const searchResultsDiv = document.querySelector('#search-books')
  const bookDiv = document.createElement('div')
  bookDiv.innerHTML =
  `
  <img src=${bookData.imageLinks.thumbnail}>
  <h4> ${bookData.title} </h4>
  <button> Add Book to Bookshelf </button>
  `
  bookDiv.querySelector('button').addEventListener('click', function(event) {
      handleClick(event, bookData)
    })

  searchResultsDiv.append(bookDiv)
}

function handleClick(e, bookData) {
  const bookObj = {
    'title': bookData.title,
    'author': bookData.authors[0],
    'publisher': bookData.publisher,
    'description': bookData.description,
    'isbn_10': bookData.industryIdentifiers[1].identifier,
    'page_count': bookData.pageCount,
    'average_review': bookData.averageRating,
    'thumbnail': bookData.imageLinks.thumbnail,
    'info_link': bookData.infoLink
  }

  postNewBook(bookObj)

  //find or create by into database
  //add to our book list
  //strike through button and say added to book list
  //
}

function postNewBook(bookObj){
  fetch('http://localhost:3000/books',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(bookObj)
  })
}

function renderMyBooks(){
  fetch('https://localhost3000.com/books')
  .then(resp => resp.json())
  .then(books => addBooksToList(books))
}
