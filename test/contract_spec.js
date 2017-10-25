describe("Votrice", function() {
 before(function(done) {
   this.timeout(0);
   var contractsConfig = {
     "Votrice": {
       args: [100, '0x123']
     }
   };
   EmbarkSpec.deployAll(contractsConfig, done);
 });

 it("should set constructor value", function(done) {
   Votrice.storedData(function(err, result) {
     assert.equal(result.toNumber(), 100);
     done();
   });
 });

 it("set storage value", function(done) {
   Votrice.vote(150, function() {
     Votrice.getWinningChoice(function(err, result) {
       assert.equal(result.toNumber(), 150);
       done();
     });
   });
 });
});
