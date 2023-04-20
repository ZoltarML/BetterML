// This is a template for adding a mod
function contrastMain() {
    // Create a local storage entry
    let contrastSettings = localStorage.getItem('contrastsettings');
    contrastSettings = JSON.parse(contrastSettings);

    // Assign mod shorthand 
    ig.game.settings.con = contrastSettings === null ? false : contrastSettings;

    // Create a togglable function
    ig.game.settings.contrastFunction = function () {
        if (!this.con) {
            // Enable
            jQuery("canvas").css("filter", "contrast(300%)")
        } else {
            // Disable
            jQuery("canvas").css("filter", "contrast(100%)")
        }
        this.con = !this.con;
        localStorage.setItem('contrastsettings', this.con);

    }

    // On refresh instructions
    if (ig.game.settings.con) {
        ig.game.settings.con = !ig.game.settings.con;
        ig.game.settings.contrastFunction();

    }

    // Settings menu visuals
    ig.game.settings.Create.header("accessibility");
    ig.game.settings.Create.toggle("High contrast mode", "con", "ig.game.settings.contrastFunction()");


}
