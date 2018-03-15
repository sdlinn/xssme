
function testXSS(){
    alert("sending stuff!");
    // Send message to content to check inline CSP
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "do_some_stuff"} , function(response) {
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('test_xss').addEventListener('click', testXSS);
});