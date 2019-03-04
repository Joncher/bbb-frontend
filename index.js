document.addEventListener('DOMContentLoaded', function(event){
  console.log("we in this shit")

})

function getBooksData(searchInput){
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
  .then(resp => resp.json())
  .then(search => console.log(search))
}
