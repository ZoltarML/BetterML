function uncappedplacementMain() {
    let uncapSettings = localStorage.getItem('uncapsettings');
    uncapSettings = JSON.parse(uncapSettings);

    ig.game.settings.ucp = uncapSettings === null ? false : uncapSettings;


    let placementCheck = Deobfuscator.function(ig.game.websocket, '.requestDeletionMarkersForSector', true)
    let worldHandler = Deobfuscator.object(ig.game, 'deleteThingAt', true);
    let speechHandler = Deobfuscator.object(ig.game, 'symbolPos', true);
    let vocabIndexCall = Deobfuscator.function(ig.game[speechHandler], '1.5<=', true);

    let replaceString = `:ig.game.${worldHandler}.deleteThingAt(d.x,d.y,!0)`;
    let replaceString2 = `ig.game.${speechHandler}.${vocabIndexCall}("tired")`;


    ig.game.settings.uncappedplacement = function () {
        if (!this.ucp) {
            eval(`ig.game.websocket.${placementCheck} = function(a,b,c,d){` + ig.game.websocket[placementCheck].toString().split('function(a,b,c,d){')[1].split(replaceString).join(':console.log("one")').split(replaceString2).join("console.log('two')"))

        } else {
            eval(`ig.game.websocket.${placementCheck} = function(a,b,c,d){` + ig.game.websocket[placementCheck].toString().split('function(a,b,c,d){')[1].split(':console.log("one")').join(replaceString).split("console.log('two')").join(replaceString2))

        }
        this.ucp = !this.ucp;
        localStorage.setItem('uncapsettings', this.ucp);

    }

    if (ig.game.settings.ucp) {
        ig.game.settings.ucp = !ig.game.settings.ucp;
        ig.game.settings.uncappedplacement();

    }

    ig.game.settings.Create.toggle("Uncapped Placement", "ucp", "ig.game.settings.uncappedplacement()");
    ig.game.settings.Create.addendum("WARNING: This modification is seen by some as unfair and in violation of Manyland TOS, thus this mod should be used at your own discretion.", 'red');


}