chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
	    if( request.message == "load_new_tab" )
	    {
    	// get the tab id
	    chrome.tabs.query({
  				active: true,
  				currentWindow: true
			}, function(tabs) {
  				var tab = tabs[0];
  				   
				// spawn a new tab
				chrome.tabs.duplicate(tab.id, function(tabs) {} );
				console.log(request.responseText);	
				//duplicate.document.write(request.responseText);
				// One more then the original tab	
				//chrome.tabs.executeScript( null, {code:"document.write(<h1>Sam</h1>);"},
   				//	function(results){ console.log(results); } );
			});
	    } 
	}
);