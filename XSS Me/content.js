chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "do_some_stuff" ) {
            alert("Got Message!");
            // var stuff = null;
            // if(stuff == null) {
            //     sendResponse({did_stuff: "false"});
            // } else {
            //     sendResponse({did_stuff: "true"});
            // }
        }
    }
);