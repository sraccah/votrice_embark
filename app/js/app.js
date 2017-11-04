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
    if (projects_count == 0) {
        $(".allprojects").html("<div>Project : "+projects[projects_count]+" : "+(projects_count+1)+"<button class=\"vote btn btn-default\" value=\""+projects_count+"\">Voter pour ce projet</button>"+"</div>");
    } else {
        $(".allprojects").append("<div>Project "+projects[projects_count]+" : "+(projects_count+1)+"<button class=\"vote btn btn-default\" value=\""+projects_count+"\">Voter pour ce projet</button>"+"</div>");
    }
    // button set
  	$("button.set").click(function() {
        Votrice.methods.getSenderAddress().call().then((caller) => {
            adresses[projects_count] = caller;
            if (EmbarkJS.isNewWeb3()) {
                Votrice.methods.didAdd(caller).call((value) => {
                    if (value == false) {
                        Votrice.methods.addChoice($("input.set").val()).send({from: value});
                        addToConsole("Projet ajouté (web3) : " + $("input.set").val() + "<br>address : " + value + "<br>");
                    } else {
                        addToConsole("A déjà ajouter son projet ! (web3) : ACTION ANNULÉE <br>");
                    }
                });
            } else {
                Votrice.methods.didAdd(caller).call((value) => {
                    if (value == false) {
                        Votrice.addChoice($("input.set").val());
                        addToConsole("Projet ajouté : " + $("input.set").val() + "<br>address : " + value + "<br>");
                    } else {
                        addToConsole("A déjà ajouter son projet ! : ACTION ANNULÉE <br>");
                    }
                });
            }
            projects_count += 1;
        });
    });
    // button vote
  	$("button.vote").click(function() {
        Votrice.methods.getSenderAddress().call().then((caller) => {
            if (EmbarkJS.isNewWeb3()) {
                Votrice.methods.didVote(caller).call((value) => {
                    if (value == false) {
                        addToConsole("A voté ! (web3) <br>");
                        var vote = parseInt($("button.vote").attr("value"));
                        Votrice.methods.vote(vote).send({from: caller});
                    } else {
                        addToConsole("A déjà voté ! (web3) : VOTE ANNULÉ <br>");
                    }
                });
            } else {
                Votrice.methods.didVote(caller).call((value) => {
                    if (value == false) {
                        addToConsole("A voté ! <br>");
                        var vote = parseInt($("button.vote").attr("value"));
                        Votrice.vote(vote);
                    } else {
                        addToConsole("A déjà voté ! : VOTE ANNULÉ <br>");
                    }
                });
            }
        });
    });
    // button get
  	$("button.get").click(function() {
        $(".winners").empty();
        if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.getWinners().call().then((value) => {
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
