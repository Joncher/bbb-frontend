class Book {
  constructor(book) {
    const {id, title, author, publisher, description, isbn_10, page_count, average_review, thumbnail, info_link, retail_price} = book;

    this.id = id;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.description = description;
    this.isbn_10 = isbn_10;
    this.page_count = page_count;
    this.average_review = average_review;
    this.thumbnail = thumbnail;
    this.info_link = info_link;
    this.retail_price = retail_price;

    Book.all.push(this)
  }

  render() {
    return (`
      <div class="" data-book-id="${this.id}">
        <h2>${this.title}</h2>
        <button class="btn btn-danger">Delete</button>
      </div>`)
  }
}

Book.all = []
