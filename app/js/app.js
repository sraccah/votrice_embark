// add logs
var addToLog = function(txt) {
    $(".logs").append(txt);
  };

$(document).ready(function() {
    // button set
  	$("button.set").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.setChoices(parseInt($("input.set").val())).send({from: web3.eth.defaultAccount});
            addToLog("Nombre de projets set (web3) : ");
		} else {
            Votrice.setChoices(parseInt($("input.set").val()));
            addToLog("Nombre de projets set : ");
		}
        addToLog(parseInt($("input.set").val())+"<br>");
    });
    // button vote
  	$("button.vote").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.vote(parseInt($("input.vote").val())).send({from: web3.eth.defaultAccount});
            addToLog("A voté ! (web3) : ");
		} else {
            Votrice.vote(parseInt($("input.vote").val()));
            addToLog("A voté ! : ");
		}
        addToLog(parseInt($("input.vote").val())+"<br>");
    });
    // button get
  	$("button.get").click(function() {
        // If web3.js 1.0 is being used
        if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.getWinningChoice().call(function(err, value) {
                if (err) {
                    addToLog(error);
                }
                $(".value").html(Number(value));
            });
            addToLog("Vainqueur demandé (web3) <br>");
		} else {
            Votrice.getWinningChoice().then(function(value) {
                $(".value").html(Number(value));
		    });
		    addToLog("Vainqueur demandé <br>");
		}
  	});
});