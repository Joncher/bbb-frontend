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
  //
  // render() {
  //   return (`
  //     <div class="" data-book-id="${this.id}">
  //       <h2>${this.title}</h2>
  //       <button class="btn btn-danger">Delete</button>
  //     </div>`)
  // }
  render() {
    return (`
      <li>
        <div class="bk-book book-1" data-book-id="${this.id}" >
          <div class="bk-front">
            <div class="bk-cover-back"></div>
            <div class="bk-cover">
              <h2>
                <span>${this.author}</span>
                <span>${this.title}</span>
              </h2>
            </div>
          </div>
          <div class="bk-page">
            <div class="bk-content bk-content-current">
              ${this.renderDetail()}
            </div>
          </div>
          <div class="bk-back">
          </div>
          <div class="bk-right"></div>
          <div class="bk-left">
            <h2>
              <span>${this.author}</span>
              <span>${this.title}</span>
            </h2>
          </div>
          <div class="bk-top"></div>
          <div class="bk-bottom"></div>
        </div>
      </li>`)
  }

  renderDetail() {
    return (`
      <h1>${this.title}</h1>
      <h2>${this.author}</h2>`)
  }
}

Book.all = []
