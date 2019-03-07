//TODO: When user logs in, find or create user, assign user id to my book list container
const myBookShelf = document.querySelector("#myBookShelf")
const myLoginPage = document.querySelector('#login-page')
const searchMyBooksForm = document.querySelector("#searchMyBooksForm")
const logoutButton = document.querySelector('#logout-button')
const addBooksButton = document.querySelector('#add-books-button')
const bookSearch = document.querySelector('#search-books')
let bookInfoArray = []
document.addEventListener('DOMContentLoaded', function(event){

})
myLoginPage.addEventListener('submit', function(e){
  e.preventDefault()
  const username = e.target.querySelector('input').value.toLowerCase()
  Adapter.postUser(username)
})

myBookShelf.addEventListener('click', handleListClick)
searchMyBooksForm.addEventListener('input', handleSearchInput)
logoutButton.addEventListener('click', handleLogout)
addBooksButton.addEventListener('click', handleAddBook)

//Event Handlers
function handleSearchInput(e) {
  e.preventDefault()
  const searchInputValue = e.target.value
  filteredBooks = Book.all.filter(book => book.title.toLowerCase().includes(searchInputValue));
  myBookShelf.innerHTML = filteredBooks.map(book => book.render()).join('')
}

function handleListClick(e) {
  if (e.target.classList.contains("btn-danger")) {
    Adapter.deleteUserBook(e.target.parentElement.parentElement.dataset.userId, e.target.parentElement.dataset.bookId)
    .then(json => {
      e.target.parentElement.remove()
    })
  } else if (e.target.tagName === "H2") {
    const bookDetail = document.querySelector("#book-detail")
    bookDetail.innerHTML = Book.all.find(book => book.id === +e.target.parentElement.dataset.bookId).renderDetail()
  }
}

function handleLogout(e) {
  myBookShelf.innerHTML = ``
  Book.all = []
}

function handleAddBook(){
  const searchDiv = document.querySelector('#search-books')
  searchDiv.innerHTML =
  `
  <form action="index.html" method="post">
    <input type="text" id="searchMyBooksInput" placeholder="Search For A New Book">
  </form>
  `
  document.querySelector('body').append(searchDiv)
  searchDiv.addEventListener('submit', function(e) {
    e.preventDefault()
    const searchInput = e.target.firstElementChild.value
    getBooksData(searchInput)
  } )
}
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
  const bookInformationDiv = document.createElement('div')
  let bookThumbnail = ""

  if (!!bookData.imageLinks) {
    bookThumbnail = bookData.imageLinks.thumbnail
  } else {
    bookThumbnail = 'http://books.google.com/books/content?id=wdJwDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  }
  if (bookData.authors === undefined){
    bookData.authors = ["N/A"]
  }
  if (bookData.title === undefined) {
    bookData.title = "N/A"
  }
  if (bookData.description === undefined) {
    bookData.description = "N/A"
  }
  if (bookData.averageRating === undefined){
    bookData.averageRating = "N/A"
  }

  bookInformationDiv.innerHTML =
  `
  <img src=${bookThumbnail}>
  <h4> ${bookData.title} </h4>
  `
  let bookInfo =
  `
  <h4>Title : ${bookData.title}</h4>
  <h4>Author : ${bookData.authors[0]}</h4>
  <h4>Description : ${bookData.description}</h4>
  <h4>Average Rating : ${bookData.averageRating}</h4>
  `
  bookInfoArray.push(bookInfo)
  bookDiv.dataset.index = bookInfoArray.length - 1
  bookInformationDiv.addEventListener('click', showDetails)
  function showDetails(){
    if (event.target.tagName == "IMG"){

      const previousDiv = event.target.parentElement.innerHTML
      const parent = event.target.parentElement
      parent.innerHTML = bookInfoArray[parent.parentElement.dataset.index]
      const returnButton = document.createElement('button')
      returnButton.innerText = "Return to Image"
      returnButton.addEventListener('click', function(){
        parent.innerHTML = previousDiv
        // parent.querySelector('button').addEventListener('click', )
      })
      parent.append(returnButton)
      }
  }
  const addToBookShelfButton = document.createElement('button')
  addToBookShelfButton.innerText = 'Add Book to Bookshelf'

  const bookShelfIsbn = Book.all.map(book => book.isbn_10)

  if (bookShelfIsbn.includes(bookData.industryIdentifiers[1].identifier)){
    addToBookShelfButton.disabled = true
    addToBookShelfButton.innerText = "Already Added"
  }
  const buttonDiv = document.createElement('div')
  buttonDiv.append(addToBookShelfButton)
  buttonDiv.querySelector('button').addEventListener('click', function addBooks() {
      event.target.disabled = true
      addToBookShelfButton.innerText = "Already Added"
      handleClick(event, bookData)
    })
  bookDiv.append(bookInformationDiv)
  bookDiv.append(buttonDiv)
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
  postNewBook(bookObj, myBookShelf.dataset.userId)

  //find or create by into database
  //add to our book list
  //strike through button and say added to book list
  //
}

function postNewBook(bookObj, userId){
  fetch(`http://localhost:3000/books/${userId}`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(bookObj)
  }).then(res => res.json()).then(book => {
    const newBook = new Book(book)
    myBookShelf.innerHTML += newBook.render()

  })
}
