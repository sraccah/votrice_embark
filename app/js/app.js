// add logs to console
var addToConsole = function(txt) {
    $(".logs").append(txt);
};

$(document).ready(function() {
    var status = 0;
    // button set
  	$("button.set").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.setChoices(parseInt($("input.set").val())).send({from: web3.eth.defaultAccount});
            addToConsole("Nombre de projets set (web3) : ");
		} else {
            Votrice.setChoices(parseInt($("input.set").val()));
            addToConsole("Nombre de projets set : ");
		}
        addToConsole(parseInt($("input.set").val())+"<br>");
        for (var i = 0; i < parseInt($("input.set").val()); i++) {
            if (status == 0) {
                $(".voters").append("<input type='radio' name='voter' value='"+i+"'><span id='voter'>Votant "+(i + 1)+"</span></input>");
            } else {
                $(".voters").html("<input type='radio' name='voter' value='"+i+"'><span id='voter'>Votant "+(i + 1)+"</span></input>");
                status = 0;
            }
        }
        status = 1;
        $(".voter").show();
        var defaultAccount = web3.eth.defaultAccount;
        var accounts = web3.eth.getAccounts(console.log);
        console.log(defaultAccount);
        console.log(Object(accounts));
        addToConsole(" default : " + defaultAccount + "<br> accounts : " + accounts + "<br>");
    });
    // button voter
  	$("button.voter").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            addToConsole("Votant (web3) : ");
		} else {
            addToConsole("Votant : ");
        }
        if ($("input[name=voter]:checked").prop('checked')) {
            addToConsole(parseInt($("input[name=voter]:checked").val()) + 1 +"<br>");
        } else {
            addToConsole("default address : voters[0] <br>");
        }
    });
    // button vote
  	$("button.vote").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.didVote().call(function(err, value) {
                if (err) {
                    addToConsole(error + "<br>");
                }
                if (value == false) {
                    addToConsole("A voté ! (web3) : ");
                } else {
                    addToConsole("A déjà voté ! (web3) : VOTE ANNULÉ : ");
                }
                addToConsole(parseInt($("input.vote").val())+"<br>");
            });
            Votrice.methods.vote(parseInt($("input.vote").val())).send({from: web3.eth.defaultAccount});
		} else {
            Votrice.methods.didVote().call(function(err, value) {
                if (err) {
                    addToConsole(error + "<br>");
                }
                if (value == false) {
                    addToConsole("A voté ! : ");
                } else {
                    addToConsole("A déjà voté ! : VOTE ANNULÉ : ");
                }
                addToConsole(parseInt($("input.vote").val())+"<br>");
            });
            Votrice.vote(parseInt($("input.vote").val()));
		}
    });
    // button get
  	$("button.get").click(function() {
        // If web3.js 1.0 is being used
        if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.getWinningProject().call(function(err, value) {
                if (err) {
                    addToConsole(error + "<br>");
                }
                $(".value").html(Number(value));
                addToConsole("Vainqueur demandé (web3) : " + value + "<br>");
            });
		} else {
            Votrice.getWinningProject().then(function(value) {
                $(".value").html(Number(value));
		    });
		    addToConsole("Vainqueur demandé : " + value + "<br>");
		}
    });
});

