// CONSOLE
var addToConsole = function(txt) {
    $(".logs").append(txt);
};

// DAPP
$(document).ready(function() {
    // all projects names
    var projects = [];
    // counter for the index of the project
    var projects_count = 0;
    // contain all winners
    var winners = [];
    // all projects addresses
    var adresses = [];
    // button set
  	$("button.set").click(function() {
		// If web3.js 1.0 is being used
        Votrice.methods.getSenderAddress().call().then((value) => {
            adresses[projects_count] = value;
            if (EmbarkJS.isNewWeb3()) {
                Votrice.methods.addChoice($("input.set").val()).send({from: value});
                addToConsole("Projet ajouté (web3) : " + $("input.set").val() + "<br>address : " + value + "<br>");
            } else {
                adresses[projects_count] = Votrice.setChoices($("input.set").val());
                addToConsole("Projet ajouté : " + $("input.set").val() + "<br>address : " + value + "<br>");
            }
            if (projects_count == 0) {
                $(".allprojects").html("<div>Project "+ $("input.set").val() +" : "+ (projects_count + 1) +" : " + value + "<button class=\"vote btn btn-primary\" value=\""+projects_count+"\">Vote</button>" + "</div>");
            } else {
                $(".allprojects").append("<div>Project "+ $("input.set").val() +" : "+ (projects_count + 1) +" : " + value + "</div>");
            }
            projects[projects_count] = $("input.set").val();
            projects_count += 1;
        });
    });
    // button vote
  	$("button.vote").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.didVote(web3.eth.defaultAccount).call((value) => {
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
            Votrice.methods.didVote(accounts[voter]).call((value) => {
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
            Votrice.methods.getWinners().call((value) => {
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
