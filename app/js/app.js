// DAPP
$(document).ready(function() {
    // index of the address
    var voter = 0;
    // status of the setChoices methode
    var status = 0;
    // accounts contain all addresses
    var accounts = [];
    // accounts contain all winners
    var winners = [];
    // store all accounts
    web3.eth.getAccounts().then((value) => {
        value.forEach((element) => {
            accounts.push(element);
        })
    });
    // button set
  	$("button.set").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.setChoices(parseInt($("input.set").val())).send({from: accounts[voter]});
		} else {
            Votrice.setChoices(parseInt($("input.set").val()));
        }
        var ret = parseInt($("input.set").val());
        var tmp = 1;
        if (ret > 10 || ret < 1) {
            tmp = 1;
        } else {
            tmp = ret;
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
    });
    // button voter
  	$("button.voter").click(function() {
        if ($("input[name=voter]:checked").prop('checked')) {
            voter = parseInt($("input[name=voter]:checked").val());
        }
    });
    // button vote
  	$("button.vote").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.didVote(accounts[voter]).call();
            var vote = parseInt($("input.vote").val());
            if (vote > 10 || vote < 1) {
                Votrice.methods.vote(1).send({from: accounts[voter]});
            } else {
                Votrice.methods.vote(vote).send({from: accounts[voter]});
            }
		} else {
            Votrice.methods.didVote(accounts[voter]).call();
            var vote = parseInt($("input.vote").val());
            if (vote > 10 || vote < 1) {
                Votrice.vote(1);
            } else {
                Votrice.vote(vote);
            }
		}
    });
    // button get
  	$("button.get").click(function() {
        $(".winners").empty();
        // If web3.js 1.0 is being used
        if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.getWinningProject().call((err, value) => {
                value.forEach((element) => {
                    var nbr = Number(element) + 1;
                    $(".winners").append("<p>Projet " + nbr + " : " + accounts[nbr - 1] + "</p>");
                }, this);
            });
		} else {
            Votrice.getWinningProject().then((value) => {
                value.forEach((element) => {
                    var nbr = Number(element) + 1;
                    $(".winners").append("<p>Projet " + nbr + " : " + accounts[nbr - 1] + "</p>");
                }, this);
		    });
		}
    });
});
