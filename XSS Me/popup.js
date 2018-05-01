// Function to test if the webpage is vulnerable to xss
function testXSS(){
    // Send message to content script to test the xss.
    // This is nessasary because the content script can access the DOM of the page.
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, {"message": "open_new_tab"} , function(response) {
        });
    });
}

// Set listener to receive a message from the content script to display 
// if the webpage is vulnerable or not.
chrome.runtime.onMessage.addListener( function(request,sender,sendResponse) {
	if( request.message === "vulnerable" )
	{
		document.getElementById("results").innerHTML = "<div class=\"alert alert-danger\"><strong>Vulnerable to XSS</strong></div>";
	}
	else if( request.message === "not-vulnerable" )
	{
		document.getElementById("results").innerHTML = "<div class=\"alert alert-success\"><strong>Not Vulnerable</strong></div>";
	}
});

// When the DOM is looaded, set a attach a click listen to the button. 
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('test_xss').addEventListener('click', testXSS);
});

document.getElementById("your-id").addEventListener("click", inpt);

function inpt() {
	var inp1 = document.getElementById("input1").value;
	var inp2 = document.getElementById("input2").value;
	//var inp3 = document.getElementById("input3").value;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {"message" : "customize" , greeting : inp1 + "|" + inp2}, function(response) {
			console.log(tabs[0].url);
		});
	});
}
