document.addEventListener('DOMContentLoaded', function(event){
  console.log("we in this shit")

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
  bookDiv.querySelector('button').addEventListener('click', handleClick)
  searchResultsDiv.append(bookDiv)
}


//
