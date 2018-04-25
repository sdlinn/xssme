chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
	    if( request.message === "load_new_tab" )
	    {
    		read_attack_strings(null);
	    } 
	}
);

function read_attack_strings(file_url) 
{
	//open XML document containing list of scripts
	var xss_file = new XMLHttpRequest();
	xss_file.open("GET", chrome.extension.getURL('XSS-strings.xml'), true);
	xss_file.responseType = "document";
	xss_file.onreadystatechange = function ()
	{
	    if(xss_file.readyState === 4)
	    {
	        if(xss_file.status === 200 || xss_file.status == 0)
	        {
	            var xss_xml = xss_file.response;
				var attack_strings = xss_xml.getElementsByTagName("attackString");
				var num_attack_strings = attack_strings.length;

				// change loop if you don't want the test to iterate through all attack strings
				var loop = false;
				
				if(!loop)
					num_attack_strings = 5;

				for(var i = 0; i < num_attack_strings; i++)
				{
					attack_page(attack_strings[i].textContent); 
	            }
	        }
	    }
	}
	xss_file.send(null);
}

function attack_page(attack_string) 
{
	// get the tab id
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				var tab = tabs[0]
				//var text = request.responseText  				   
			// spawn a new tab
			console.log(tab.id);
			chrome.tabs.duplicate(tab.id, function(tabs) {
					console.log(tabs);
					chrome.tabs.onUpdated.addListener(function (tabId , info) {
							if (info.status === 'complete') {
							chrome.tabs.sendMessage(tabs.id, {"message" : "attack", "tabId" : tabs.id, "attack_string" : attack_string}, 
								function(response) 
								{
									console.log(response)
									if(response.success)
									{
										alert("Attack worked!");
									}
									else {
										console.log(attack_string + " This attack string didn't work");
										// remove the tab now. 
										chrome.tabs.remove(tabs.id, function(){});
									}
								});		
					    }  
					});
			} );
		});
}
