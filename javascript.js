const myLibrary = [];

function Book(title, author, description, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.info = function() { // TODO: Add to prototype
        return this.title + " by " + this.author + ", " + this.numPages + " pages, " + (this.haveRead ? "already read" : "not read yet");
    }
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

        let btnClose = document.createElement("button");
        btnClose.classList.add("icon");
        btnClose.classList.add("close");
        btnClose.type = "button";
        btnClose.addEventListener("click", handleClose);
        btnClose.setAttribute("index", bookIndex);

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
        card.appendChild(btnClose);
        card.appendChild(author);
        card.appendChild(description);
        card.appendChild(additionalInfo);

        libraryContainer.appendChild(card);
    }
}

function handleClose(event) {
    myLibrary.splice(event.target.getAttribute("index"), 1);
    displayBooks();
}

function handleReadStatusChange(event) {
    let book = myLibrary[event.target.getAttribute("index")];
    book.haveRead = !book.haveRead;
    event.target.textContent = book.haveRead ? "Read" : "Not Read";
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "A story about hobbits.", 295, false);
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J. K. Rowling", "A story about wizards.", 100, true);
addBookToLibrary("The Hunger Games", "Suzanne Collins", "A story about Panem.", 100, true);
displayBooks();