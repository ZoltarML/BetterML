// This is a template for adding a mod
function templateMain() {
    // Create a local storage entry
    let exampleSettings = localStorage.getItem('examplesettings');
    exampleSettings = JSON.parse(exampleSettings);

    // Assign mod shorthand 
    ig.game.settings.exp = exampleSettings === null ? false : exampleSettings;

    // Create a togglable function
    ig.game.settings.exampleFunction = function () {
        if (!this.exp) {
            // Enable
            ig.game.gravity = 300;
        } else {
            // Disable
            ig.game.gravity = 800;
        }
        this.exp = !this.exp;
        localStorage.setItem('examplesettings', this.exp);

    }

    // On refresh instructions
    if (ig.game.settings.exp) {
        ig.game.settings.exp = !ig.game.settings.exp;
        ig.game.settings.exampleFunction();

    }

    // Settings menu visuals
    ig.game.settings.Create.toggle("Name here", "exp", "ig.game.settings.exampleFunction()");
    ig.game.settings.Create.addendum("Just gravity toggle", 'black');


}
