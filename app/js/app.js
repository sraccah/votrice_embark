// add logs to console
var addToConsole = function(txt) {
    $(".logs").append(txt);
};

$(document).ready(function() {
    // index of the address
    var voter = 0;
    // status of the setChoices methode
    var status = 0;
    // accounts contain all addresses
    var accounts = [];
    // button set
  	$("button.set").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.setChoices(parseInt($("input.set").val())).send({from: web3.eth.defaultAccount});
            Votrice.methods.setAccounts().send({from: web3.eth.defaultAccount});
            addToConsole("Nombre de projets set (web3) : ");
		} else {
            Votrice.setChoices(parseInt($("input.set").val()));
            addToConsole("Nombre de projets set : ");
        }
        var ret = parseInt($("input.set").val());
        var tmp = 1;
        if (ret > 10 || ret < 1) {
            tmp = 1;
            addToConsole("1" + "<br>");
        } else {
            tmp = ret;
            addToConsole(ret + "<br>");
        }
        for (var i = 0; i < tmp; i++) {
            if (status == 0) {
                $(".voters").append("<input type='radio' name='voter' value='"+i+"'><span id='voter'>Votant "+(i + 1)+"</span></input>");
            } else {
                $(".voters").html("<input type='radio' name='voter' value='"+i+"'><span id='voter'>Votant "+(i + 1)+"</span></input>");
                status = 0;
            }
        }
        status = 1;
        $(".voter").show();
        web3.eth.getAccounts().then((value) => {
            value.forEach((element) => {
                accounts.push(element);
            })
        });
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
            voter = parseInt($("input[name=voter]:checked").val());
        } else {
            addToConsole("default address : voters[0] <br>");
        }
    });
    // button vote
  	$("button.vote").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.didVote(accounts[voter]).call((err, value) => {
                if (value == false) {
                    addToConsole("A voté ! (web3) : ");
                } else {
                    addToConsole("A déjà voté ! (web3) : VOTE ANNULÉ : ");
                }
                addToConsole(parseInt($("input.vote").val())+"<br>");
            });
            var vote = parseInt($("input.vote").val());
            if (vote > 10 || vote < 1) {
                Votrice.methods.vote(1).send({from: accounts[voter]});
            } else {
                Votrice.methods.vote(vote).send({from: accounts[voter]});
            }
		} else {
            Votrice.methods.didVote(accounts[voter]).call((err, value) => {
                if (value == false) {
                    addToConsole("A voté ! : ");
                } else {
                    addToConsole("A déjà voté ! : VOTE ANNULÉ : ");
                }
            });
            var vote = parseInt($("input.vote").val());
            if (vote > 10 || vote < 1) {
                Votrice.vote(1);
                addToConsole("1<br>");
            } else {
                Votrice.vote(vote);
                addToConsole(parseInt($("input.vote").val())+"<br>");
            }
		}
    });
    // button get
  	$("button.get").click(function() {
        // If web3.js 1.0 is being used
        if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.getWinningProject().call((err, value) => {
                var nbr = Number(value) + 1;
                $(".value").html(nbr);
                addToConsole("Vainqueur demandé (web3) : " + nbr + "<br>");
            });
		} else {
            Votrice.getWinningProject().then((value) => {
                var nbr = Number(value) + 1;
                $(".value").html(nbr);
                addToConsole("Vainqueur demandé : " + nbr + "<br>");
		    });
		}
    });
});
