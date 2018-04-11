// Add listener to wait for the button press from the popup. 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    	// if the message is do_test, execute script
        if( request.message === "do_test" ) {
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
						data.append(page_inputs[i].name, '&<script>document.vulnerable=true;</script>');
					else
						data.append(page_inputs[i].name, page_inputs[i].value);
				}
				
				// create new XML HTTP request that will be POSTed to the page location
				var xhr = new XMLHttpRequest();
				xhr.open('POST', window.location.href, true);

				// add a function that will run after the XML HTTP request has loaded
				xhr.onload = function () {
					// create a new HTML document so we can use DOM selectors
					var doc = document.implementation.createHTMLDocument("example");
					// and put the contents of the response to the XML HTTP request into the document
					doc.documentElement.innerHTML = xhr.responseText;
					// Send this to the background to reload the page.
					chrome.runtime.sendMessage({message: "load_new_tab", responseText: xhr.responseText});

					// select all scripts from the document and count how many there are 
					var scripts = doc.getElementsByTagName("script");
					var num_scripts = scripts.length;
					var vulnerable = false;

					// check each script for the incidence of our XSS
					// this will be changed later to a more generic DOM manipulation 
					// in order to test different kinds of XSS strings 
					for(var i = 0; i < num_scripts; i++)
					{
						if(scripts[i].innerHTML === "document.vulnerable=true;")
							vulnerable = true;
					}

					// report back to the popup javascript file to replace the text in the popup window
					if(vulnerable)
					{
						chrome.runtime.sendMessage({'message' : "vulnerable", 'details' : "document.vulnerable=true;"});
					}
					else
					{
						chrome.runtime.sendMessage({'message' : "not-vulnerable"});
					}
				};

				// send the XML HTTP request
				xhr.send(data);
			}
        }
    }
);