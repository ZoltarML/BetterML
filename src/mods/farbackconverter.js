// This is a template for adding a mod
function farbackMain() {
    // Create a local storage entry
    let farbackSettings = localStorage.getItem('farbacksettings');
    farbackSettings = JSON.parse(farbackSettings);

    // Assign mod shorthand 
    ig.game.settings.fbc = farbackSettings === null ? false : farbackSettings;

    const itemQuery = Deobfuscator.object(ig.game, 'mnt_P', false);
    itemQuery.old_itemStats = itemQuery.getItemStats_P;

    // Create a togglable function
    ig.game.settings.farbackFunction = function () {
        if (!this.fbc) {
            // Enable
            // written by togekiss
            itemQuery.getItemStats_P = function (a) {
                let selectedBlock = Deobfuscator.object(ig.game.itemContextMenu, 'rotation', false);

                if (typeof selectedBlock !== 'undefined' && selectedBlock.thing.base == "FARBACK" && ig.input.state("ctrl")) 
                    selectedBlock.thing.base = "STACKWEARB";
                
                return jQuery.ajax({
                    url: "/j/i/st/" + a
                })
            }

        } else {
            // Disable
            itemQuery.getItemStats_P = itemQuery.old_itemStats;
        }
        this.fbc = !this.fbc;
        localStorage.setItem('farbacksettings', this.fbc);

    }

    // On refresh instructions
    if (ig.game.settings.fbc) {
        ig.game.settings.fbc = !ig.game.settings.fbc;
        ig.game.settings.farbackFunction();
    }

    // Settings menu visuals
    ig.game.settings.Create.toggle("Farback Converter", "fbc", "ig.game.settings.farbackFunction()", "Ctrl + Right Click");
    ig.game.settings.Create.addendum("Convert placed Farbacks into bodies by Ctrl+right clicking. Mod by Togekiss.", 'black');


}
