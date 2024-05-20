const diagAddBook = document.querySelector("#dialog-add-book");
const btnOpenDialog = document.querySelector("button.open-dialog");
const btnCloseDialog = document.querySelector("#dialog-add-book .close");

const formNewBook = document.querySelector("#form-new-book");
const txtTitle = document.querySelector("#txt-title");
const txtAuthor = document.querySelector("#txt-author");
const txtNumPages = document.querySelector("#txt-num-pages");
const txtDescription = document.querySelector("#txt-description");
const radReadYes = document.querySelector("#rad-read-yes");
const radReadNo = document.querySelector("#rad-read-no");
const btnSubmit = document.querySelector("#dialog-add-book button.submit");

const myLibrary = [];

btnOpenDialog.addEventListener("click", handleDialogOpen);
btnCloseDialog.addEventListener("click", handleDialogClose);
btnSubmit.addEventListener("click", handleAddNewBook);

function handleDialogOpen(event) {
    diagAddBook.showModal();
}

function handleDialogClose(event) {
    diagAddBook.close();
}

function handleAddNewBook(event) {
    event.preventDefault();

    if (formNewBook.reportValidity()) {
        myLibrary.push(new Book(txtTitle.value, txtAuthor.value,
            txtDescription.value, txtNumPages.value, radReadYes.checked));
        displayBooks();

        diagAddBook.close();
        txtTitle.value = "";
        txtAuthor.value = "";
        txtDescription.value = "";
        txtNumPages.value = "";
        radReadYes.checked = false;
        radReadNo.checked = false;
    }
}

function Book(title, author, description, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.numPages = numPages;
    this.haveRead = haveRead;

}

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.numPages
        + " pages, " + (this.haveRead ? "already read" : "not read yet");
}

function addBookToLibrary(title, author, description, numPages, haveRead) {
    myLibrary.push(new Book(title, author, description, numPages, haveRead));
}

function displayBooks() {
    const libraryContainer = document.querySelector(".library-container");
    while(libraryContainer.firstChild) {
        libraryContainer.removeChild(libraryContainer.lastChild);
    }

    for (bookIndex in myLibrary) {
        let book = myLibrary[bookIndex];
        
        let card = document.createElement("div");
        card.classList.add("card");

        let title = document.createElement("div");
        title.classList.add("card-title");
        title.textContent = book.title;

        let btnDelete = document.createElement("button");
        btnDelete.classList.add("icon");
        btnDelete.classList.add("close");
        btnDelete.type = "button";
        btnDelete.addEventListener("click", handleDelete);
        btnDelete.setAttribute("index", bookIndex);

        let author = document.createElement("div");
        author.classList.add("card-author");
        author.textContent = book.author;

        let description = document.createElement("div");
        description.classList.add("card-description");
        description.textContent = book.description;

        let additionalInfo = document.createElement("div");
        additionalInfo.classList.add("card-additional-info");

        let pageCount = document.createElement("div");
        pageCount.classList.add("page-count");
        pageCount.textContent = `${book.numPages} pages`;

        let btnReadStatus = document.createElement("button");
        btnReadStatus.classList.add("read-status");
        btnReadStatus.type = "button";
        btnReadStatus.textContent = book.haveRead ? "Read" : "Not Read";
        btnReadStatus.addEventListener("click", handleReadStatusChange);
        btnReadStatus.setAttribute("index", bookIndex);

        additionalInfo.appendChild(pageCount);
        additionalInfo.appendChild(btnReadStatus);

        card.appendChild(title);
        card.appendChild(btnDelete);
        card.appendChild(author);
        card.appendChild(description);
        card.appendChild(additionalInfo);

        libraryContainer.appendChild(card);
    }
}

function handleDelete(event) {
    myLibrary.splice(event.target.getAttribute("index"), 1);
    displayBooks();
}

function handleReadStatusChange(event) {
    let book = myLibrary[event.target.getAttribute("index")];
    book.haveRead = !book.haveRead;
    event.target.textContent = book.haveRead ? "Read" : "Not Read";
}