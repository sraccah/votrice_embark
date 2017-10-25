// add logs
var addToLog = function(id, txt) {
    $(id + " .logs").append("<br>" + txt);
  };


$(document).ready(function() {

  	$("button.vote").click(function() {
		var value = parseInt($("input.text").val(), 1);

		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
		Votrice.methods.vote(value).send({from: web3.eth.defaultAccount});
		addToLog("VOTE", "Votrice.methods.vote(value).send({from: web3.eth.defaultAccount})");
		} else {
		Votrice.vote(value);
		addToLog("VOTE", "Votrice.vote(" + value + ")");
		}
  	});

  	$("button.get").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
		Votrice.methods.getWinningChoice().call(function(err, value) {
			$(".value").html(value);
		});
		addToLog("GET", "Votrice.methods.getWinningChoice(console.log)");
		} else {
		Votrice.getWinningChoice().then(function(value) {
			$(".value").html(value.toNumber());
		});
		addToLog("GET", "Votrice.getWinningChoice()");
		}
  	});
});