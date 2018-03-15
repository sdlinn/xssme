chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "do_some_stuff" ) {
            alert("Got Message!");

			var page_inputs = document.getElementsByTagName("input");

			var num_inputs = page_inputs.length;
			if (num_inputs > 0)
			{
				var data = new FormData();

				for(var i = 0; i < num_inputs; i++)
				{
					if(page_inputs[i].type == 'text')
						data.append(page_inputs[i].name, '<script>alert("xss detected")</script>');
					else
						data.append(page_inputs[i].name, page_inputs[i].value);
				}
				
				var xhr = new XMLHttpRequest();
				xhr.open('POST', window.location.href, true);

				xhr.onload = function () {
					//check results for vulnerabilities
				};

				xhr.send(data);
			}
        }
    }
);