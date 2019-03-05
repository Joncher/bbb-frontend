const BOOKS_URL = 'http://localhost:3000/books'
const USERS_URL = 'http://localhost:3000/users'

class Adapter {
  //Book Fetch Requests
  static getBooks() {
    return fetch(BOOKS_URL)
      .then(res => res.json())
  }

  static showBook(bookId) {
    return fetch(`${BOOKS_URL}/${bookId}`)
      .then(res => res.json())
  }

  //User Fetch Requests
  static getUserBooks(userId) {
    return fetch(`${USERS_URL}/${userId}/books`)
      .then(res => res.json())
  }

  static deleteUserBook(userId, bookId) {
    return fetch(`${USERS_URL}/${userId}/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    }).then(res => res.json())
  }
}
