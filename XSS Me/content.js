chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "do_some_stuff" ) {
			var page_inputs = document.getElementsByTagName("input");

			var num_inputs = page_inputs.length;
			if (num_inputs > 0)
			{
				var data = new FormData();

				for(var i = 0; i < num_inputs; i++)
				{
					if(page_inputs[i].type == 'text')
						data.append(page_inputs[i].name, '<script>alert("vulnerable");</script>');
					else
						data.append(page_inputs[i].name, page_inputs[i].value);
				}
				
				var xhr = new XMLHttpRequest();
				xhr.open('POST', window.location.href, true);

				xhr.onload = function () {
					var doc = document.implementation.createHTMLDocument("example");
					doc.documentElement.innerHTML = xhr.responseText;
					var scripts = doc.getElementsByTagName("script");
					var num_scripts = scripts.length;
					var vulnerable = false;

					for(var i = 0; i < num_scripts; i++)
					{
						if(scripts[i].innerHTML === "alert(\"vulnerable\");")
							vulnerable = true;
					}

					if(vulnerable)
					{
						chrome.runtime.sendMessage({'message' : "vulnerable", 'details' : "&lt;script&gt;alert(\"vulnerable\");&lt;/script&gt;"});
					}
					else
					{
						chrome.runtime.sendMessage({'message' : "not-vulnerable"});
					}
				};

				xhr.send(data);
			}
        }
    }
);