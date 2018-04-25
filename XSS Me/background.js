var attack_strings;
var num_attack_strings;
var index = 0;


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
	//create new XHR to open XML document containing list of scripts
	var xss_file = new XMLHttpRequest();

	//change XSS-strings.xml to file_url eventually
	if(file_url == null)
		file_url = 'XSS-strings.xml';

	xss_file.open("GET", chrome.extension.getURL(file_url), true);
	xss_file.responseType = "document";

	//once the file has loaded, do stuff
	xss_file.onreadystatechange = function ()
	{
	    if(xss_file.readyState === 4)
	    {
	        if(xss_file.status === 200 || xss_file.status == 0)
	        {
	        	//if the XHR succeeds, put the file response into a variable 
	        	//and parse the elements by tag name
	            var xss_xml = xss_file.response;
				attack_strings = xss_xml.getElementsByTagName("attackString");
				num_attack_strings = attack_strings.length;

				if(num_attack_strings == 0)
					console.log("invalid XSS attack string file - check your formatting?");
				else
				{
					/** change loop if you don't want the test to iterate through all attack strings
					var loop = false;
					
					if(!loop)
						num_attack_strings = 1;

					//iterate through attack strings...
					for(var i = 0; i < num_attack_strings; i++)
					{
						//...and send them to attack_page function 
						//that will send them to content script
						attack_page(attack_strings[i].textContent);
		            }**/
		            // send first attack to the page.
		            attack_page(attack_strings[index++].textContent);
				}
	        }
	        else
	        	console.log("XSS attack string file not found.");
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
									if (index <= 5) 
									{
										attack_page(attack_strings[index++].textContent);
									}
									else 
									{
										alert("Tried all of the strings.");
									}
								}
							});		
					    }  
					});
			} );
		});
}
