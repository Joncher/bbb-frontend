//TODO: When user logs in, find or create user, assign user id to my book list container
const BOOKS_URL = 'http://localhost:3000/books'
const USERS_URL = 'http://localhost:3000/users'
const myBookList = document.querySelector("#my-books-container")


Adapter.getBooks().then(books => {
    Book.all = books.map(book => new Book(book))
    for (book of Book.all) {
      myBookList.innerHTML += book.render()
    }
  })

myBookList.addEventListener('click', handleListClick)

//Event Handlers
function handleListClick(e) {
  if (e.target.classList.contains("btn-danger")) {
    Adapter.deleteUserBook(e.target.parentElement.parentElement.dataset.userId, e.target.parentElement.dataset.bookId)
      .then(json => {
        console.log(json);
        // e.target.parentElement.remove
      })
  }
  // else if (e.target.tagName === "IMG") {
  //   showBook(e.target.)
  // }
}
