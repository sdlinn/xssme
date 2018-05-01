var attack_strings;
var num_attack_strings;
var index = 0;
var original_tab_id = 0;
var type;
var id;
var bool;

chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
	    if( request.message === "load_new_tab" )
	    {
	    	// reset these if clicking the popup again in the same session. 
	    	index = 0;
			bool = 0;
	    	original_tab_id = 0;
    		read_attack_strings(null);
	    } else if (request.message === "customize_1") {
			index = 0;
	    	original_tab_id = 0;
			bool = 1;
			type = request.input1;
			id = request.input2;
			console.log(request.input1);
			console.log(request.input2);
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
			// Force the original tab that we are duplicating to be the same. 
			if (original_tab_id === 0) {
				original_tab_id = tab.id;
			}
			console.log("Orignal Tab id:" + original_tab_id);
			// spawn a new tab
			chrome.tabs.duplicate(original_tab_id, function(tabs) {
					console.log("New ID of new tab: " + tabs.id);
					chrome.tabs.onUpdated.addListener(function (tabId , info) {
						if (info.status === 'complete') {
							if (bool === 1) {
							chrome.tabs.sendMessage(tabs.id, {"message" : "attack_specific", "tabId" : tabs.id, "attack_string" : attack_string, "type" : type, "id" : id}, 
								function(response) 
								{
									if (response.success)
									{
										alert("XSS was success with the following attack string\n" + attack_string);
										// This part stops the rest of the attacks for going on.
										//index = num_attack_strings+1;

										index = 0;
	    								original_tab_id = 0;
									} 
									else 
									{
										//console.log(attack_string + " This attack string didn't work");
										// remove the tab now. 
										chrome.tabs.remove(tabs.id, function(){});
										if (index < num_attack_strings) 
										{
											attack_page(attack_strings[index++].textContent);
										}
										else 
										{
											alert("This extension was unable to successfully perform and XSS attack.");
											console.log("Finished");
											index = 0;
	    									original_tab_id = 0;
										}
									}
								});		
							}
							else if (bool === 0) {
							chrome.tabs.sendMessage(tabs.id, {"message" : "attack", "tabId" : tabs.id, "attack_string" : attack_string}, 
								function(response) 
								{
									if (response.success)
									{
										alert("XSS was success with the following attack string\n" + attack_string);
										// This part stops the rest of the attacks for going on.
										//index = num_attack_strings+1;

										index = 0;
	    								original_tab_id = 0;
									} 
									else 
									{
										// remove the tab now. 
										chrome.tabs.remove(tabs.id, function(){});
										//console.log(attack_string + " This attack string didn't work");
										if (index < num_attack_strings) 
										{
											attack_page(attack_strings[index++].textContent);
										}
										else 
										{
											alert("This extension was unable to successfully perform an XSS attack.");
											console.log("Finished");
											index = 0;
	    									original_tab_id = 0;
										}
									}
								});	
								
							}
						}						
					});
			} );
		});
}
