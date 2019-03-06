//TODO: When user logs in, find or create user, assign user id to my book list container
const myBookShelf = document.querySelector("#myBookShelf")
const myLoginPage = document.querySelector('#login-page')
const searchMyBooksForm = document.querySelector("#searchMyBooksForm")
const logoutButton = document.querySelector('#logout-button')
const addBooksButton = document.querySelector('#add-books-button')
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
<<<<<<< HEAD
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
=======
function handleListClick(e) {
  if (e.target.classList.contains("btn-danger")) {
    Adapter.deleteUserBook(e.target.parentElement.parentElement.dataset.userId, e.target.parentElement.dataset.bookId)
    .then(json => {
      // console.log(json);
      e.target.parentElement.remove()
    })
>>>>>>> ebb791572955f2f5f914c8ca1d2d4e13397657a3
  } else if (e.target.tagName === "H2") {
    const bookDetail = document.querySelector("#book-detail")
    bookDetail.innerHTML = Book.all.find(book => book.id === +e.target.parentElement.dataset.bookId).renderDetail()
  }
}

function handleSearchInput(e) {
  e.preventDefault()
  const searchInputValue = e.target.value
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
  let bookThumbnail = ""
  if (!!bookData.imageLinks) {
    bookThumbnail = bookData.imageLinks.thumbnail
  } else {
    bookThumbnail = 'http://books.google.com/books/content?id=wdJwDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  }
  bookDiv.innerHTML =
  `
  <img src=${bookThumbnail}>
  <h4> ${bookData.title} </h4>
  `
  const addToBookShelfButton = document.createElement('button')
  addToBookShelfButton.innerText = 'Add Book to Bookshelf'
  const bookShelfIsbn = Book.all.map(book => book.isbn_10)
  if (bookShelfIsbn.includes(bookData.industryIdentifiers[1].identifier)){
    addToBookShelfButton.disabled = true
    addToBookShelfButton.innerText = "Already Added"
  }
  bookDiv.append(addToBookShelfButton)
  bookDiv.querySelector('button').addEventListener('click', function(event) {
      event.target.disabled = true
      addToBookShelfButton.innerText = "Already Added"
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
