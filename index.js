//TODO: When user logs in, find or create user, assign user id to my book list container
const myBookList = document.querySelector("#my-books-container")

document.addEventListener('DOMContentLoaded', function(event){

})

//Render User's Books On Log In
Adapter.getUserBooks(myBookList.dataset.userId).then(books => {
    booksObjArr = books.map(book => new Book(book))
    for (bookObj of booksObjArr) {
      myBookList.innerHTML += bookObj.render()
    }
  })

myBookList.addEventListener('click', handleListClick)

//Event Handlers
function handleListClick(e) {
  if (e.target.classList.contains("btn-danger")) {
    Adapter.deleteUserBook(e.target.parentElement.parentElement.dataset.userId, e.target.parentElement.dataset.bookId)
      .then(json => {
        // console.log(json);
        e.target.parentElement.remove()
      })
  }
  // else if (e.target.tagName === "IMG") {
  //   showBook(e.target.)
  // }
}


//John's Code

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
