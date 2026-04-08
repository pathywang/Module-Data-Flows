const myLibrary = [];

window.addEventListener("load", () => {
  populateLibrary();
  render();
});

function populateLibrary() {
  if (myLibrary.length !== 0) {
    return;
  }

  myLibrary.push(
    new Book("Robinson Crusoe", "Daniel Defoe", 252, true),
    new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true)
  );
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readCheckbox = document.getElementById("check");
const tableBody = document.querySelector("#display tbody");

function submit() {
  // .value is always a string, never null
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = Number(pagesInput.value);

  // Reject empty strings, whitespace-only strings, invalid page counts
  if (title === "" || author === "") {
    alert("Title and author cannot be empty.");
    return;
  }

  if (!Number.isInteger(pages) || pages <= 0) {
    alert("Page count must be a positive whole number.");
    return;
  }

  myLibrary.push(
    new Book(title, author, pages, readCheckbox.checked)
  );

  render();
}

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function render() {
  // Clear all existing rows in one operation
  tableBody.textContent = "";

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;

    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;

    const pagesCell = document.createElement("td");
    pagesCell.textContent = book.pages;

    const readCell = document.createElement("td");
    const toggleReadButton = document.createElement("button");
    toggleReadButton.className = "btn btn-success";
    toggleReadButton.textContent = book.hasRead ? "Yes" : "No";

    toggleReadButton.addEventListener("click", () => {
      book.hasRead = !book.hasRead;
      render();
    });

    readCell.appendChild(toggleReadButton);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-warning";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      const deletedTitle = book.title;

      myLibrary.splice(index, 1);
      render();

      alert(`Deleted: ${deletedTitle}`);
    });

    deleteCell.appendChild(deleteButton);

    row.append(
      titleCell,
      authorCell,
      pagesCell,
      readCell,
      deleteCell
    );

    tableBody.appendChild(row);
  });
}

