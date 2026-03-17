let myLibrary = [];

const closeDialog = document.querySelector("#close-btn");
const newBookButton = document.querySelector("#new-book-btn");
const newBookDialog = document.querySelector("#new-book-dialog");
const newBookForm = document.querySelector("#new-book-form")

const confirmButton = document.querySelector("#confirm-btn");

newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
})

closeDialog.addEventListener("click", () => {
    newBookDialog.close();
})

confirmButton.addEventListener("click", (e) => {
    e.preventDefault();

    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#book-author").value;
    let pages = document.querySelector("#book-pages").value;
    let isRead = document.querySelector('input[name="been-read"]:checked');
    
    addBookToLibrary(title, author, pages, isRead);

    newBookForm.reset();
    newBookDialog.close();

    title = "";
    author = "";
    pages = null;
    isRead = null;
})

function Book(title, author, pages, isRead) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead.value == "read" ? "Read" : "Not Read";
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${isRead}`;
    }
}

Book.prototype.changeReadStatus = function(book) {
    if(book.isRead == "Read") {
        book.isRead = "Not Read";
    } else {
        book.isRead = "Read"
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const booksGrid = document.querySelector(".books");
    const existingBooks = booksGrid.querySelectorAll(".book-card");

    existingBooks.forEach((existingBook) => {
        existingBook.remove();
    });

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.id = book.id;

        const bookTitle = document.createElement("h3");
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement("h4");
        bookAuthor.textContent = book.author;

        const isBookRead = document.createElement("div");
        isBookRead.textContent = book.isRead;
        isBookRead.id = "isRead-card";

        const deleteButton = document.createElement("button");

        deleteButton.addEventListener("click", () => {
            myLibrary = myLibrary.filter(b => b.id !== book.id);
            displayBooks();
        })

        isBookRead.addEventListener("click", () => {
            book.changeReadStatus(book);
            isBookRead.textContent = book.isRead;
        })

        deleteButton.classList.add("delete-book");
        deleteButton.textContent = "✕";

        bookCard.appendChild(deleteButton);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(isBookRead);

        booksGrid.appendChild(bookCard);
    });
}

function deleteBook(book) {
    book.remove();
}
