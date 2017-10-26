// add logs
var addToLog = function(txt) {
    $(".logs").append(txt + "<br>");
  };

$(document).ready(function() {
    // button set
  	$("button.set").click(function() {
        addToLog(parseInt($("input.set").val()));
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.setChoices(parseInt($("input.set").val())).send({from: web3.eth.defaultAccount});
            addToLog("Votrice.methods.setChoices(value).send({from: web3.eth.defaultAccount})");
		} else {
            Votrice.setChoices(parseInt($("input.set").val()));
            addToLog("Votrice.setChoices(value)");
		}
    });
    // button vote
  	$("button.vote").click(function() {
        addToLog(parseInt($("input.vote").val()));
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.vote(parseInt($("input.vote").val())).send({from: web3.eth.defaultAccount});
            addToLog("Votrice.methods.vote(value).send({from: web3.eth.defaultAccount})");
		} else {
            Votrice.vote(parseInt($("input.vote").val()));
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