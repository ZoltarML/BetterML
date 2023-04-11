function norefreshMain() {
    let refreshSettings = localStorage.getItem('norefreshsettings');
    refreshSettings = JSON.parse(refreshSettings);

    ig.game.settings.nrf = refreshSettings === null ? false : refreshSettings;





    ig.game.settings.norefresh = function () {
        if (!this.nrf) {

            // Written by MPT3
            ig.game.doResize = function () {
                var offs = $("div").width();

                // no ad bar? (or it's hidden?) then there's no effective offset.
                if (!$('div')[0] || $("div").is(":hidden"))
                    offs = 0;

                // use unsafeWindow directly because we can because we have to later.
                // impact games have a useful function that resizes the game, which never gets called in Manyland
                ig.system.resize((window.innerWidth - offs) / ig.system.scale, window.innerHeight / ig.system.scale, ig.system.scale);

                // this has side effects, which require the adjustment of various things
                $("#searchInput").remove();
                ig.game.playerDialog = new PlayerDialog;
                ig.game.boostDialog = new BoostDialog;
                ig.game.bottomMenu.init();
                ig.game.panelSet.init();
                ig.game.camera.setOffset();
            };

            // jQuery wants a reference to a specific window object to turn off and add event handlers
            jQuery(window).off("resize");
            jQuery(window).resize(ig.game.doResize);


            this.nrf = !this.nrf;
            localStorage.setItem('norefreshsettings', this.nrf);

        } else {
            this.nrf = !this.nrf;
            localStorage.setItem('norefreshsettings', this.nrf);
            location.reload();
        }
    }

    if (ig.game.settings.nrf) {
        ig.game.settings.nrf = !ig.game.settings.nrf;
        ig.game.settings.norefresh();

    }

    ig.game.settings.Create.toggle("No Refresh on Resize", "nrf", "ig.game.settings.norefresh()", "Mod by MPT3");
    ig.game.settings.Create.addendum("Notice: page will refesh when disabled.", '#ff6600');


}
