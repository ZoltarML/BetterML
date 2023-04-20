// This is a template for adding a mod
function debugMain() {
    // Create a local storage entry
    let debugSettings = localStorage.getItem('debugsettings');
    debugSettings = JSON.parse(debugSettings);

    // Assign mod shorthand 
    ig.game.settings.dbg = debugSettings === null ? false : debugSettings;

    ig.game.enableDebug = Deobfuscator.function(ig.game, '"Current WS:', true)
    slicedFunction = ig.game[ig.game.enableDebug].toString().slice(73);
    ig.game.old_debug = ig.game[ig.game.enableDebug]


    // Create a togglable function
    ig.game.settings.debugFunction = function () {
        if (!this.dbg) {

            eval(`ig.game.${ig.game.enableDebug} = function(a){` + slicedFunction);
            ig.game[ig.game.enableDebug](!0);

        } else {
            // Disable
            ig.game[ig.game.enableDebug](!0);
            ig.game[ig.game.enableDebug] = ig.game.old_debug;
        }
        this.dbg = !this.dbg;
        localStorage.setItem('debugsettings', this.dbg);

    }

    // On refresh instructions
    if (ig.game.settings.dbg) {
        ig.game.settings.dbg = !ig.game.settings.dbg;
        ig.game.settings.debugFunction();

    }

    // Settings menu visuals
    ig.game.settings.Create.toggle("Debug Mode", "dbg", "ig.game.settings.debugFunction()");


}
