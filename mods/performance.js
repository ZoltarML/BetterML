function performanceMain() {

    const performanceSettings = localStorage.getItem('performancesettings');
    const base = { bigArt: false, dynamics: false, dust: false, particles: false, extra: false };

    ig.game.settings.enabledPerformance = performanceSettings === null ? base : JSON.parse(performanceSettings);

    ig.game.settings.routines = {
        bigArt: ["EntityDecoanim", "EntityDecotch", "EntityFurry", "EntityDecobig", "EntityDecovbig", "EntityFarback"],
        dynamics: ["EntityDynathing"],
        dust: ["EntityDust", "EntityRemovedust", "EntityFootdust", "EntityBigDust"],
        particles: ["EntityVignette", "EntityLiquidDrop", "EntitySparkle", "EntitySpot", "EntityBackgroundBlock"],
        extra: ["EntityDeadPlayer", "EntityPlayer"]

    }

    // helper functions
    ig.game.settings.togglePerformanceSetting = function (mode) {

        ig.game.settings[mode] = !ig.game.settings[mode];
        ig.game.settings.enabledPerformance[mode] = ig.game.settings[mode];
        localStorage.setItem("performancesettings", JSON.stringify(this.enabledPerformance));
    }

    ig.game.settings.renderControl = function (routines, functionStorage, isOn) {
        if (isOn) {
            for (let entity of routines) {
                functionStorage[entity] = window[entity].prototype.draw;
                window[entity].prototype.draw = () => { };
            }
        } else {
            for (let entity of routines)
                window[entity].prototype.draw = functionStorage[entity];
        }
    }

    for (mode in base) {
        ig.game.settings[mode] = false;
        ig.game.settings[mode + "Storage"] = {};
        eval(`ig.game.settings.${mode}Performance = function () { this.${mode} ? this.renderControl(this.routines.${mode}, this.${mode}Storage, false) : this.renderControl(this.routines.${mode}, this.${mode}Storage, true); this.togglePerformanceSetting("${mode}"); }`)

    }


    for (mode in ig.game.settings.enabledPerformance)
        ig.game.settings.enabledPerformance[mode] && ig.game.settings[mode + "Performance"]();


    // Rendering new settings
    ig.game.settings.Create.header('Performance');
    ig.game.settings.Create.toggle('Heavy Art', 'bigArt', '!this.ultra && ig.game.settings.bigArtPerformance()');
    ig.game.settings.Create.toggle('Dynamics', 'dynamics', 'ig.game.settings.dynamicsPerformance()');
    ig.game.settings.Create.toggle('Dust', 'dust', 'ig.game.settings.dustPerformance()');
    ig.game.settings.Create.toggle('Particles', 'particles', '!this.ultra && ig.game.settings.particlesPerformance()');
    ig.game.settings.Create.toggle('Extra Performance', 'extra', 'ig.game.settings.extraPerformance()');
    ig.game.settings.Create.addendum('NOTICE: enabling "extra performance" will cause players to be invisible.', '#ff6600');


}

