// Add listener to wait for the button press from the popup. 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) 
    {
    	if( request.message === "open_new_tab") 
    	{
    		// Send this to the background to reload the page.
			chrome.runtime.sendMessage({message: "load_new_tab"});
		} 
		else if( request.message === "attack" ) 
		{
        	// get input elements from page to create new form from them
			var page_inputs = document.getElementsByTagName("input");
			var num_inputs = page_inputs.length;

			// if the page has form inputs
			if (num_inputs > 0)
			{
				// create a new form data 
				var data = new FormData();

				// add input elements to the form - if the original ones are of type text, insert XSS
				// test script: &<script>alert("vulnerable");</script>
				for(var i = 0; i < num_inputs; i++)
				{
					if(page_inputs[i].type == 'text')
						data.append(page_inputs[i].name, request.attack_string);
					else
						data.append(page_inputs[i].name, page_inputs[i].value);
				}

                // create new XML HTTP request that will be POSTed to the page location
				var xhr = new XMLHttpRequest();
				xhr.open('POST', window.location.href, true);

				// add a function that will run after the XML HTTP request has loaded
				xhr.onload = function () {
					document.write(xhr.responseText);
					var vulnerable = false
					window.addEventListener("message", function(event) {
					    // We only accept messages from ourselves
					    if (event.source != window)
					        return;

					    if (event.data.type && (event.data.type == "FROM_PAGE")) {
					    	// THIS IS SUCCESSFULL 
					    	chrome.runtime.sendMessage({message: "Success"});
					        //alert("Successfull XSS using attack string  " + request.attack_string);
					        sendResponse({"success" : true});
					        vulnerable = true;
					    }
					});
					sleep(500).then(() => {
  						  // Do something after the sleep!
						// report back to the popup javascript file to replace the text in the popup window
						if(vulnerable)
						{
							alert("vulnerable");	
							//chrome.runtime.sendMessage({'message' : "vulnerable", 'details' : "document.vulnerable=true;"});
						}
						else
						{
							// send a message to background that we need to try again
							sendResponse({"success" : false});
							//chrome.runtime.sendMessage({'message' : "not-vulnerable"});
						}
					})
				};
				// send the XML HTTP request
				xhr.send(data);
            }
        }
        return true;
    }
);

function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}