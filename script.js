const myLibrary = [];

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
    let read = "read";
    
    addBookToLibrary(title, author, pages, read);

    newBookForm.reset();
    newBookDialog.close();

    title = "";
    author = "";
    pages = null;
    read = null;
})

function Book(title, author, pages, read) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
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

        const bookTitle = document.createElement("h3");
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement("h4");
        bookAuthor.textContent = book.author;

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);

        booksGrid.appendChild(bookCard);
    });
}