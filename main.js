const sliceInTwo = {
  sliceOne(start,end,arr1,choice){
  let newArray = [];
  let secondArray = [];
  let count = 0;
  let secondCount = 0;

  for(let i = 0; i < arr1.length; i++){
    //remove the elements of arr1
    if (i >= start && i <= end){
      newArray[count] = arr1[i];
      count++;
    } else {
      secondArray[secondCount] = arr1[i];
      secondCount++;
    }
  }
  count = 0;
  secondCount = 0;

  return secondArray;

  // if (choice === "another"){
  //   return secondArray;
  // } else {
  //   return newArray;
  // }
}
}

// let arrayExample = [1,2,3,4,5,6,7,8,9,10]

// arrayExample = sliceInTwo.sliceOne(0,3,arrayExample)
// arrayExample = arrayExample.slice(4,arrayExample.length)
// console.log(arrayExample)



//create Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//create User Interface class
class UserInt {
  
  addBook(newBook) {
    if (document.querySelector("#title").value === "" || document.querySelector("#author").value === "" || document.querySelector("#isbn").value === ""){
      this.errorAlert();
    } else { 
    //create element tr this tr will be appended to tbody id book-lis    
    const tr = document.createElement("tr");
    //create td for the title
    const td1 = document.createElement("td");
    //appending the title
    td1.innerText = newBook.title;
    //create td for the author
    const td2 = document.createElement("td");
    td2.innerText = newBook.author;
    //create td ibsn
    const td3 = document.createElement("td");
    td3.innerText = newBook.isbn;
    //create a td with the delete class button 
    const td4 = document.createElement("td");
    td4.innerHTML = `<a href="#!" class="delete">X</a>`;
    //all these td will be appended to the tr 
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    //append tr with everybody to the tbody
    document.querySelector("#book-list").appendChild(tr);

    let books;
    if (localStorage.getItem("books") === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    books.push(newBook.title, newBook.author, newBook.isbn);

    localStorage.setItem("books", JSON.stringify(books));

    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";

    //here we call the function to show the user a message that the book was added successfully
    this.showBookAdded();
    this.deleteFromLocal();
    }
  }
  
  reloadBooks(){
    let books;
    if (localStorage.getItem("books") === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    
    for(let i = 0; i < books.length; i = i + 3){
      //create element tr this tr will be appended to tbody id book-lis    
      const tr = document.createElement("tr");
      //create td for the title
      const td1 = document.createElement("td");
      //appending the title
      td1.innerText = books[i];
      //create td for the author
      const td2 = document.createElement("td");
      td2.innerText = books[i+1];
      //create td ibsn
      const td3 = document.createElement("td");
      td3.innerText = books[i+2];
      //create a td with the delete class button 
      const td4 = document.createElement("td");
      td4.innerHTML = `<a href="#!" class="delete">X</a>`;
      //all these td will be appended to the tr 
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      //append tr with everybody to the tbody
      document.querySelector("#book-list").appendChild(tr);
    }
    this.deleteFromLocal();
  }

  showBookAdded(){
    //create a success div 
    const bookAdded = document.createElement("div");
    //give it a specic class on skeleton to look nice
    bookAdded.setAttribute("class","u-full-width sizing-style success");
    //append text into it
    bookAdded.textContent = "Book added successfully";
    //append a div before the #title element when added
    const divParent =  document.querySelector(".container");
    divParent.insertBefore(bookAdded, divParent.childNodes[2]);
    //after appending turn it off with setTimout function 
    setTimeout(function(){
       //here we remove this aadded div 
       bookAdded.remove();
    }, 500)
  }

  showBookRemoved(message,classValue){
    //create a success div 
    const bookRemoved = document.createElement("div");
    //give it a specic class on skeleton to look nice
    bookRemoved.setAttribute("class",classValue);
    //append text into it
    bookRemoved.textContent = message;
    //append a div before the #title element when added
    const divParent =  document.querySelector(".container");
    divParent.insertBefore(bookRemoved, divParent.childNodes[2]);
    //after appending turn it off with setTimout function 
    setTimeout(function(){
       //here we remove this aadded div 
       bookRemoved.remove();
    }, 500)
  }

  errorAlert(){
      //create a error alert
      const errorAlert = document.createElement("div");
      //give it a specic class on skeleton to look nice
      errorAlert.setAttribute("class","u-full-width sizing-style error");
      //append text into it
      errorAlert.textContent = "Title, Author and Isbn are Required!";
      //append a div before the #title element when added
      const divParent =  document.querySelector(".container");
      divParent.insertBefore(errorAlert, divParent.childNodes[2]);
      //after appending turn it off with setTimout function 
      setTimeout(function(){
           //here we remove this aadded div 
           errorAlert.remove();
        }, 1500)
  }

  deleteFromLocal() {
       //I came up wiht a counter slice object to solve it
       let books;
       if (localStorage.getItem("books") === null){
         books = [];
       } else {
         books = JSON.parse(localStorage.getItem("books"));
       }

       const deleteIcons = document.querySelectorAll(".delete");
    
       for(let i = 0; i < deleteIcons.length; i++){
         deleteIcons[i].addEventListener("click", function(e){
           //remove from local storage 
           if (books.length > 3){ 
             //here i prooved by induction that  3*i, 3*i+2 will alwaays get us the right index
             books = sliceInTwo.sliceOne(3*i, 3*i + 2, books);
             localStorage.setItem("books",JSON.stringify(books));
             console.log(books);
           } else {
             localStorage.removeItem("books");
           }
           this.parentElement.parentElement.remove();
           e.preventDefault();
         })
       }
  }
}


//create the objects from the classes and use the functions on the classes
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookISBN = document.querySelector("#isbn");
const form = document.querySelector("#book-form");


//add event listener
form.addEventListener("submit", function(e){
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const isbn = bookISBN.value;

  const book = new Book(title, author, isbn);

  //create an object off of the UI class
  const ui = new UserInt();

  ui.addBook(book);

  e.preventDefault();
});
 
//create a event for reloading the page 
document.addEventListener("DOMContentLoaded", function(e){
  //create an object off of the user interface class that enheirent all methods
  const ui = new UserInt();
  ui.reloadBooks();
})

const tbody = document.querySelector("#book-list");

tbody.addEventListener("click", function(e){
  const ui = new UserInt();

  console.log(e.target.textContent);
  //call a function to show when book gets removed targetting the anchor tag by this e.target method
  // Book removed successfully
  if (e.target.textContent === "X"){
  ui.showBookRemoved("Book removed successfully", "u-full-width sizing-style success");
  }
  e.preventDefault();
})



//showing a div book added 

//showing a div book deleted

// let arrayTest = new Array(1,2,3,4,5,6,7,8,9,10);
// console.log(arrayTest)
// console.log(SliceIt.sliceOne(2,3,arrayTest));


// let firstArray = sliceInTwo.sliceOne(3,5,arrayTest);
// let secondArray = sliceInTwo.sliceOne(3,5,arrayTest, "another");

// console.log(firstArray);
// console.log(secondArray);