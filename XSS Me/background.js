chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
	    if( request.message === "load_new_tab" )
	    {
    	// get the tab id
	    chrome.tabs.query({
  				active: true,
  				currentWindow: true
			}, function(tabs) {
  				var tab = tabs[0]
  				//var text = request.responseText  				   
				// spawn a new tab
				console.log(tab.id);
				chrome.tabs.duplicate(tab.id, function(tabs) {
						console.log(tabs);
						chrome.tabs.onUpdated.addListener(function (tabId , info) {
  							if (info.status === 'complete') {
    							chrome.tabs.sendMessage(tabs.id, {"message": "do_test"} , function(response) {});		
						    }  
						});
				} );
			});
	    } 
	}
);