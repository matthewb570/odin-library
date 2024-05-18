function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.numPages + " pages, " + (this.haveRead ? "already read" : "not read yet");
    }
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());