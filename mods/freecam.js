
function freecamMain() {
    let freecamSettings = localStorage.getItem('freecamsettings');
    freecamSettings = JSON.parse(freecamSettings);

    ig.game.settings.frc = freecamSettings === null ? false : freecamSettings;


    let oldUpdate = ig.game.update;
    let followMouse = false;
    let oldOffset = { 'x': ig.game.camera.offset.x, 'y': ig.game.camera.offset.y };


    ig.game.settings.freecam = function () {
        if (!this.frc) {
            // Eternity's freecam script
            ig.game.update = function () {
                let result = oldUpdate.apply(this, arguments);

                if (ig.input.state('ctrl') && ig.input.pressed('e')) {
                    followMouse = !followMouse;
                    ig.game.camera.offset = oldOffset;
                }

                if (followMouse) {
                    let value = { 'x': -ig.input.mouse.x - oldOffset.x, 'y': -ig.input.mouse.y - oldOffset.y };
                    ig.game.camera.offset = { 'x': -value.x * ig.system.scale, 'y': -value.y * ig.system.scale }
                }

                return result;
            }
        } else {
            ig.game.update = oldUpdate;
        }
        this.frc = !this.frc;
        localStorage.setItem('freecamsettings', this.frc);


    }

    if (ig.game.settings.frc) {
        ig.game.settings.frc = !ig.game.settings.frc;
        ig.game.settings.freecam();

    }

    ig.game.settings.Create.toggle("Freecam", "frc", "ig.game.settings.freecam()", "CTRL+E, Follows mouse");
}



