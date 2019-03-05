class Adapter {
  static getBooks() {
    return fetch(BOOKS_URL)
      .then(res => res.json())
  }

  static showBook(bookId) {
    return fetch(`${BOOKS_URL}/${bookId}`)
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

  static postUser(username) {
    return fetch(`${USERS_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({username: username})
    })
  }
}
