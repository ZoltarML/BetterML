// This is a template for adding a mod
function buildMain() {
    // Create a local storage entry
    let buildSettings = localStorage.getItem('buildsettings');
    buildSettings = JSON.parse(buildSettings);

    // Assign mod shorthand 
    ig.game.settings.bps = buildSettings === null ? false : buildSettings;

    const old_base_types = {...Item.prototype.BASE_TYPES};
    const map = Deobfuscator.object(ig.game, "queuePerformDelayMs", true);

    // Create a togglable function
    ig.game.settings.buildFunction = function () {
        if (!this.bps) {
            // Enable
            // created by togekiss
            Object.keys(Item.prototype.BASE_TYPES).forEach(b=>{Item.prototype.BASE_TYPES[b].rotatable=true;Item.prototype.BASE_TYPES[b].flippable=true})
            ig.game[map].queuePerformDelayMs = 0;

        } else {
            // Disable
            for(const type in Item.prototype.BASE_TYPES) 
                Item.prototype.BASE_TYPES[type].rotatable = old_base_types[type].rotatable;
            
            ig.game[map].queuePerformDelayMs = 100;
        }
        this.bps = !this.bps;
        localStorage.setItem('buildsettings', this.bps);

    }

    // On refresh instructions
    if (ig.game.settings.bps) {
        ig.game.settings.bps = !ig.game.settings.bps;
        ig.game.settings.buildFunction();

    }

    // Settings menu visuals
    ig.game.settings.Create.toggle("Build+", "bps", "ig.game.settings.buildFunction()", "Mod by Togekiss");



}
