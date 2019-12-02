/* Write a constructor for making “book” objects. We will revisit this in the 
project at the end of this lesson. Your book objects should have the book’s 
title, author, the number of pages, and whether or not you have read the book */

// the constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// store books into an array
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

Book.prototype.info = function() {
    if (this.read) {
        return `${this.title} by ${this.author}, ${this.pages} pages, finished reading.`;
    } else {
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`;
    }
}

let myLibrary = [];
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('Candide', 'Voltaire', 123, true);
addBookToLibrary('The Hounds of the Baskervilles', 'Sir Arthur Conan Doyle', 256, false);
addBookToLibrary('Emma', 'Jane Austen', 474, false);
console.table(myLibrary);