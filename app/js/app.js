// add logs to console
var addToConsole = function(txt) {
    $(".logs").append(txt);
};

var god = web3.eth.defaultAccount;

$(document).ready(function() {
    var voters = [
        "0xb7e2050f3c9e30829363f5c926fbd0050f2b20a7",
        "0x1dc47f98416eaab7fee81648b829fa205fcf0b4c",
        "0x62ca5a06ef488d6878eac1dbe585e44e64ef1adf",
        "0x2fa64f35fd79a8a424fc52089ecef2e795222fd6",
        "0x2451560cd059d1ee3dd0f9650774c1b613c8cdc9",
        "0x6cd5439d4045f1da7c91221a3f7c4ae1e3b170fe",
        "0x44c63de1e8912ee487446379680650dbb848a8ee",
        "0x46e46d72a4a6ddf6844a549d15820a3368126be7",
        "0x44deae4a3a964578899285ccc11218585a5c5d8e",
        "0x9d7657c6a32732ed3a83665c3130f6446cc10cac"
    ];
    var voter = 0;
    var status = 0;
    // button set
  	$("button.set").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.setChoices(parseInt($("input.set").val())).send({from: voters[voter]});
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
        console.log(accounts);
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
            voter = parseInt($("input[name=voter]:checked").val());
        } else {
            addToConsole("default address : voters[0] <br>");
        }
    });
    // button vote
  	$("button.vote").click(function() {
		// If web3.js 1.0 is being used
		if (EmbarkJS.isNewWeb3()) {
            Votrice.methods.didVote(voters[voter]).call(function(err, value) {
                if (value == false) {
                    addToConsole("A voté ! (web3) : ");
                } else {
                    addToConsole("A déjà voté ! (web3) : VOTE ANNULÉ : ");
                }
                addToConsole(parseInt($("input.vote").val())+"<br>");
            });
            Votrice.methods.vote(parseInt($("input.vote").val())).send({from: voters[voter]});
		} else {
            Votrice.methods.didVote(voters[voter]).call(function(err, value) {
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

