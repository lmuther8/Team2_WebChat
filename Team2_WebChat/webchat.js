var id;

$(document).ready(function () {
    $('#sendText').click(sendText);
    $('#checkText').click(sendText);

    var input = document.getElementById("textinput");
    // Respond to enter key
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        sendText();
      }
    });


    id=makeid(10);
    console.log("ID:",id);

});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// Function to force scrollable window at bottom
function updateScroll(){
    var element = document.getElementById("chatBox");
    element.scrollTop = element.scrollHeight;
}


 // Respond to send button
function sendText() {
  console.log("sendText");
  // Get the text from the text box
  inText = $('#textinput').val();
  // Clear the input text
  $('#textinput').val("");

  //document.getElementById('chatBox').innerHTML += "<font color='red'>You: </font>" + inText+"<br />";
  // force to bottom
  updateScroll();

  message=inText.replace("","+");
  $.ajax(
    {
    type: "get",
    url: "/cgi-bin/muther1_webchat.py?message=" + message + "&id="+id,
    dataType: "text",
    success:  processResults,
    error: function(request, ajaxOptions, thrownError)
    {
        $("#debug").text("error with get:"+request+thrownError);
    }
  });
}

//
// <p>Click on the button below. The input field will tell you when two, four, and six seconds have passed.</p>
//
// <button onclick="timedText()">Display timed text</button>
// <input type="text" id="txt">
//
// <script>
// function timedText() {
//   var x = document.getElementById("txt");
//   setTimeout(function(){ x.value="2 seconds" }, 2000);
//   setTimeout(function(){ x.value="4 seconds" }, 4000);
//   setTimeout(function(){ x.value="6 seconds" }, 6000);
// }
// </script>



function processResults(data) {
  // add to the bottom of the chat box
  console.log("got:"+data);
  $('#chatBox').append(data);
  setTimeout(1000);
}
