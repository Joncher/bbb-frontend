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

  static postUser(username) {
    return fetch(`${USERS_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({username: username})
    }).then(res => res.json())
    .then(user => {
      this.changeMyContainerData(user, myBookShelf)

    })
  }

  static changeMyContainerData(user, myBookShelf){
    myBookShelf.dataset.userId = `${user.id}`
    Adapter.getUserBooks(myBookShelf.dataset.userId).then(books => {
      // debugger
        let booksObjArr = books.map(book => new Book(book))
        for (let bookObj of booksObjArr) {
          myBookShelf.innerHTML += bookObj.render()
        }

        var Books = (function() {

        	var transEndEventNames = {
        			'WebkitTransition' : 'webkitTransitionEnd',
        			'MozTransition' : 'transitionend',
        			'OTransition' : 'oTransitionEnd',
        			'msTransition' : 'MSTransitionEnd',
        			'transition' : 'transitionend'
        		},
        		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
        		$books = $( '#bk-list > li > div.bk-book' ), booksCount = $books.length, currentbook = -1;
        		debugger

        	function init() {
        		$books.each( function( i ) {

        			var $book = $( this ),
        				$other = $books.not( $book ),
        				$parent = $book.parent(),
        				$page = $book.children( 'div.bk-page' ),
        				$content = $page.children( 'div.bk-content' ), current = 0;

        			if( i < booksCount / 2 ) {
                // debugger
        				$parent.css( 'z-index', i ).data( 'stackval', i );
        			}
        			else {
                // debugger
        				$parent.css( 'z-index', booksCount - i ).data( 'stackval', booksCount - i ); //booksCount - 1 - i
        			}

        			$book.on( 'click', function() {

        				if( currentbook !== -1 && currentbook !== $parent.index() ) {
        					closeCurrent();
        				}

        				if( $book.data( 'opened' ) ) {
        					$book.data( 'opened', false ).removeClass( 'bk-viewinside' ).on( transEndEventName, function() {
        						$( this ).off( transEndEventName ).removeClass( 'bk-outside' );
        						$parent.css( 'z-index', $parent.data( 'stackval' ) );
        						currentbook = -1;
        					} );
        				}
        				else {
        					$book.data( 'opened', true ).addClass( 'bk-outside' ).on( transEndEventName, function() {
        						$( this ).off( transEndEventName ).addClass( 'bk-viewinside' );
        						$parent.css( 'z-index', booksCount );
        						currentbook = $parent.index();
        					} );
        					current = 0;
        					$content.removeClass( 'bk-content-current' ).eq( current ).addClass( 'bk-content-current' );
        				}

        			} );

        			if( $content.length > 1 ) {

        				var $navPrev = $( '<span class="bk-page-prev">&lt;</span>' ),
        					$navNext = $( '<span class="bk-page-next">&gt;</span>' );

        				$page.append( $( '<nav></nav>' ).append( $navPrev, $navNext ) );

        				$navPrev.on( 'click', function() {
        					if( current > 0 ) {
        						--current;
        						$content.removeClass( 'bk-content-current' ).eq( current ).addClass( 'bk-content-current' );
        					}
        					return false;
        				} );

        				$navNext.on( 'click', function() {
        					if( current < $content.length - 1 ) {
        						++current;
        						$content.removeClass( 'bk-content-current' ).eq( current ).addClass( 'bk-content-current' );
        					}
        					return false;
        				} );

        			}

        		} );

        	}

        	function closeCurrent() {

        		var $book = $books.eq( currentbook ),
        			$parent = $book.parent();

        		$book.data( 'opened', false ).removeClass( 'bk-viewinside' ).on( transEndEventName, function(e) {
        			$( this ).off( transEndEventName ).removeClass( 'bk-outside' );
        			$parent.css( 'z-index', $parent.data( 'stackval' ) );
        		} );

        	}

        	return { init : init };

        })();

        Books.init()
    })
  }
}
