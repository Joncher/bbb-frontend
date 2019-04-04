//TODO: When user logs in, find or create user, assign user id to my book list container
const myBookShelf = document.querySelector("#bk-list")
const myLoginPage = document.querySelector('#login-submit')
const searchMyBooksForm = document.querySelector("#searchMyBooksForm")
const logoutButton = document.querySelector('#logout-submit')
const addBooksButton = document.querySelector('#add-books-button')

myLoginPage.addEventListener('click', function(e){
  e.preventDefault()
  const username = e.target.parentElement.querySelector('#input-4').value.toLowerCase()
  Adapter.postUser(username)
})

// myBookShelf.addEventListener('click', handleListClick)
// searchMyBooksForm.addEventListener('input', handleSearchInput)
logoutButton.addEventListener('click', handleLogout)
addBooksButton.addEventListener('click', handleAddBook)

//Log In Code
document.querySelector("#login-submit").addEventListener('click', function(event){
  // debugger
  const usernameInput = this.parentElement.querySelector("#input-4")
  this.parentElement.parentElement.parentElement.querySelector("h5").innerText = `Welcome to BBB ${usernameInput.value}`
  usernameInput.value = ""

  //Hide Log In Form
  document.querySelector("#loginForm").style.display = "none"
  document.querySelector("#logoutForm").style.display = "block"

  //Enable Nav Links
  document.querySelector("#bookListNavLink").href = "#process"
  document.querySelector("#bookSearchNavLink").href = "#features"

  //Allow Scrolling
  document.querySelector("body").style.overflow = "auto"
});

//Log Out Code
document.querySelector("#logoutForm").addEventListener('click', function(event) {
  document.querySelector("#loginForm").style.display = "block"
  document.querySelector("#logoutForm").style.display = "none"
  document.querySelector("#login-page h5").innerText = "Welcome to BBB"

  //Disable Nav Links
  document.querySelector("#bookListNavLink").href = ""
  document.querySelector("#bookSearchNavLink").href = ""

  //Allow Scrolling
  document.querySelector("body").style.overflow = "hidden"

  //Clear Search
  document.querySelector("div.features-content").innerHTML = '<div class="features-list block-1-3 block-s-1-2 block-tab-full group"></div>'
})

function handleListClick(e) {
  if (e.target.classList.contains("btn-danger")) {
    Adapter.deleteUserBook(e.target.parentElement.parentElement.dataset.userId, e.target.parentElement.dataset.bookId)
    .then(json => {
      e.target.parentElement.remove()
    })
  }
}
function handleLogout(e) {
  myBookShelf.innerHTML = ``
  Book.all = []
}

function handleAddBook(){
  const searchDiv = document.querySelector('#search-books')
  searchDiv.innerHTML =
  (`<form>
    <input type="text" id="searchMyBooksInput" placeholder="Search For A New Book">
  </form>`)

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
  .then(search => {
    renderBooksToPage(search.items)

    document.querySelector("div.features-list").addEventListener('click', event => {
      if (event.target.tagName === "BUTTON") {
        const bookObj = {
          'title': event.target.dataset.title,
          'author': event.target.dataset.author,
          'publisher': event.target.dataset.publisher,
          'description': event.target.dataset.description,
          'isbn_10': event.target.dataset.isbn10,
          'average_review': event.target.dataset.review,
        }


        event.target.disabled = true
        event.target.innerText = "Already Added"
        // debugger
        handleClick(event, bookObj)
      }
    })
  })
}

function renderBooksToPage(searchData) {
  document.querySelector("div.features-list").innerHTML = ""
  for (bookData of searchData) {
    if(isBookValid(bookData.volumeInfo)) {
      renderSingleBookToPage(bookData.volumeInfo)
    }
  }
}

function renderSingleBookToPage(bookData){
  const searchResultsDiv = document.querySelector('#search-books')
  // const bookDiv = document.createElement('div')
  const bookDiv = document.querySelector("div.features-list")
  let bookThumbnail = ""
  if (!!bookData.imageLinks) {
    bookThumbnail = bookData.imageLinks.thumbnail
  } else {
    bookThumbnail = 'http://books.google.com/books/content?id=wdJwDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  }

  const bookAuthor = bookData.authors ? bookData.authors[0] : "";
  let addButton
  const bookShelfIsbn = Book.all.map(book => book.isbn_10)
  // debugger

  if (bookShelfIsbn.includes(bookData.industryIdentifiers[1].identifier)){

    addButton = (`
      <button disabled data-title="${bookData.title}"
            data-author="${bookAuthor}"
            data-publisher="${bookData.publisher}"
            data-description="${bookData.description}"
            data-isbn10="${bookData.industryIdentifiers[1].identifier}"
            data-review="${bookData.averageRating}">
            Already Added
      </button>`)
  } else {
    addButton = (`
      <button data-title="${bookData.title}"
            data-author="${bookAuthor}"
            data-publisher="${bookData.publisher}"
            data-description="${bookData.description}"
            data-isbn10="${bookData.industryIdentifiers[1].identifier}"
            data-review="${bookData.averageRating}">
            Add to Bookshelf
      </button>`)
  }

  bookDiv.innerHTML +=
  (`<div class="bgrid feature">

      <img src=${bookThumbnail}>

      <div class="service-content">

        <h3 class="h05">${bookData.title}</h3>
        ${addButton}
      </div>

  </div>`)

}

function handleClick(e, bookData) {
  const list = document.querySelector("div.features-list")
  const listClone = document.querySelector("div.features-list").cloneNode(true)
  list.parentNode.replaceChild(listClone, list)
  // debugger
  postNewBook(bookData, myBookShelf.dataset.userId)
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
    // debugger
    const newBook = new Book(book)
    myBookShelf.innerHTML += newBook.render()
    Books().init()
  })
}

function isBookValid(volumeInfo) {
  // debugger
  return !!volumeInfo.industryIdentifiers &&
  !!volumeInfo.industryIdentifiers[1] &&
  volumeInfo.title.length < 50
}
