
function testXSS(){
    // Send message to content to check inline CSP
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "do_some_stuff"} , function(response) {
        });
    });
}

chrome.runtime.onMessage.addListener( function(request,sender,sendResponse) {
	if( request.message === "vulnerable" )
	{
		alert("vulnerable");
		document.getElementById("results").innerHTML = request.details + " executed";
	}
	else if( request.message === "not-vulnerable" )
	{
		alert("not vulnerable");
		document.getElementById("results").innerHTML = "not vulnerable";
	}
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('test_xss').addEventListener('click', testXSS);
});