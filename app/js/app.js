// add logs
var addToLog = function(txt) {
    $(".logs").append("<br>" + txt);
  };

$(document).ready(function() {
    // button vote
  	$("button.vote").click(function() {
        addToLog(parseInt($("input.text").val()));
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.vote(parseInt($("input.text").val())).send({from: web3.eth.defaultAccount});
            addToLog("Votrice.methods.vote(value).send({from: web3.eth.defaultAccount})");
		} else {
            Votrice.vote(parseInt($("input.text").val()));
            addToLog("Votrice.vote(value)");
		}
    });
    // button get
  	$("button.get").click(function() {
        // If web3.js 1.0 is being used
        if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.getWinningChoice().call(function(err, value) {
                if (err) {
                    addToLog(error);
                }
                $(".value").html(value);
            });
            addToLog("Votrice.methods.getWinningChoice(console.log)");
		} else {
            Votrice.getWinningChoice().then(function(value) {
                $(".value").html(value.toNumber());
		    });
		    addToLog("Votrice.getWinningChoice()");
		}
  	});
});