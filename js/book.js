var categories = new Array();
var rowID;
var book = new Array();

$(document).ready(function () {

    // get personal data values from local storage
    fullName = localStorage.getItem("name");
    studentId = localStorage.getItem("id");
    userName = localStorage.getItem("username");
    program = localStorage.getItem("program");

    // get categories and book detail array values from local storage 
    categories = JSON.parse(localStorage.getItem("categories"));
    book = JSON.parse(localStorage.getItem("bookdetails"));

    // get unique ID values from local storage
    rowID = localStorage.getItem("rowID");

    // display the line to show user that Category was chosen
    $("header").html(
        `
        <h3>Books from the ${categories[rowID].categoryGroup} category</h3>
        `
    );

    // create a list of books based on categories
    for (let x = 0; x < book.length; x++) {
        if (categories[rowID].categoryGroup === book[x].category) {
            $("#bookList").append(
                `
                <li>
                ID: ${book[x].bookID}<br>
                Title: ${book[x].title}<br>
                ISBN: ${book[x].isbn}<br>
                Page Count: ${book[x].pageCount}<br>
                <a href='${book[x].thumbnailUrl}' target='_blank'><img src='${book[x].thumbnailUrl}' width='20'></a><br>
                Authors: ${book[x].authors}<br>
                Category: ${book[x].category}<br>
                </li>
                `
            );
        }
    }

    $("footer").html(
        `
        <hr>My Sheridan User Name: ${userName}<br>
        My Program: ${program}
        `
    );

});