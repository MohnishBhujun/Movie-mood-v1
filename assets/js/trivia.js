//Waiting for the document to be fully loaded
$(document).ready(function() {
    //Getting the quoteButton element and quoteBox element
    const quoteButton = document.getElementById('quoteButton');
    const quoteBox = document.getElementById('quoteBox');
  
    //Adding a click event listener to the quoteButton
    quoteButton.addEventListener('click', function() {
      //Setting the category to only movies and apiKey 
      const category = 'movies';
      const apiKey = 'OlBKQ6b7xtEnCJI+cdgoeg==HgFvL8PnguKCxPZr';
  
      //Making an AJAX request to retrieve a movie quote from the API
      $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        success: function(result) {
          //Getting the quote and author from the result
          const quote = result[0].quote;
          const author = result[0].author;
  
          //Displaying the quote and author in the quoteBox
          quoteBox.textContent = `"${quote}" - ${author}`;
        },
        error: function ajaxError(jqXHR) {
          //Logging any errors that may occur during the AJAX request
          console.error('Error: ', jqXHR.responseText);
        }
      });
    });
  });