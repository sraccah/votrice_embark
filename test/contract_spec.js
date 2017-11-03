var assert = require('assert');
var Embark = require('embark');
var EmbarkSpec = Embark.initTests();
var web3 = EmbarkSpec.web3;

describe("Votrice", function() {
    before(function(done) {
        this.timeout(0);
        var contractsConfig = {
            "Votrice":{}
        };
        EmbarkSpec.deployAll(contractsConfig, done);
    });

    it("set storage value", function(done) {
        Votrice.addProject("name", function() {
            Votrice.getWinningChoice(function(err, result) {
                assert.equal("name");
                done();
            });
        });
        Votrice.vote(150, function() {
            Votrice.getWinningChoice(function(err, result) {
                assert.equal(result.toNumber(), 150);
                done();
            });
        });
    });
});
