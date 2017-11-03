// CONSOLE
var addToConsole = function(txt) {
    $(".logs").append(txt);
};

// DAPP
$(document).ready(function() {
    // accounts contain all winners
    var projects = [];
    // accounts contain all winners
    var projects_count = 0;
    // accounts contain all winners
    var winners = [];
    // button set
  	$("button.set").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.addChoice($("input.set").val()).send({from: web3.eth.defaultAccount});
            addToConsole("Projet ajouté (web3) : ");
		} else {
            Votrice.setChoices($("input.set").val());
            addToConsole("Projet ajouté : ");
        }
        if (projects_count == 0) {
            $(".projects").html("<div>Project : "+ $("input.set").val() +" : "+ projects_count +"</div>");
        } else {
            $(".projects").append("<div>Project : "+ $("input.set").val() +" : "+ projects_count +"</div>");
        }
        addToConsole(" "+ $("input.set").val() +" <br>");
        projects[projects_count] = $("input.set").val();
        projects_count += 1;
    });
    // button vote
  	$("button.vote").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.didVote(web3.eth.defaultAccount).call((err, value) => {
                if (value == false) {
                    addToConsole("A voté ! (web3) : ");
                } else {
                    addToConsole("A déjà voté ! (web3) : VOTE ANNULÉ : ");
                }
                addToConsole(parseInt($("input.vote").val())+"<br>");
            });
            var vote = parseInt($("input.vote").val());
            if (vote > 10 || vote < 1) {
                Votrice.methods.vote(1).send({from: web3.eth.defaultAccount});
            } else {
                Votrice.methods.vote(vote).send({from: web3.eth.defaultAccount});
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
        $(".winners").empty();
        // If web3.js 1.0 is being used
        if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.getWinners().call((err, value) => {
                addToConsole("Vainqueurs demandé (web3) : ");
                value.forEach((element) => {
                    var nbr = Number(element) + 1;
                    $(".winners").append("<p>Projet " + nbr + "</p>");
                }, this);
                addToConsole(value + "<br>");
            });
		} else {
            Votrice.getWinners().then((value) => {
                addToConsole("Vainqueurs demandé : ");
                value.forEach((element) => {
                    var nbr = Number(element) + 1;
                    $(".winners").append("<p>Projet " + nbr + "</p>");
                }, this);
                addToConsole(value + "<br>");
		    });
		}
    });
});
