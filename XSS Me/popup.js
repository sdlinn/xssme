// Function to test if the webpage is vulnerable to xss
function testXSS(){
    // Send message to content script to test the xss.
    // This is nessasary because the content script can access the DOM of the page.
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, {"message": "do_test"} , function(response) {
        });
    });
}

// Set listener to receive a message from the content script to display 
// if the webpage is vulnerable or not.
chrome.runtime.onMessage.addListener( function(request,sender,sendResponse) {
	if( request.message === "vulnerable" )
	{
		document.getElementById("results").innerHTML = "Vulnerable to XSS";
	}
	else if( request.message === "not-vulnerable" )
	{
		document.getElementById("results").innerHTML = "Not Vulnerable";
	}
});

// When the DOM is looaded, set a attach a click listen to the button. 
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('test_xss').addEventListener('click', testXSS);
});