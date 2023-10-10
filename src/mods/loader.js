

// smooth loader from parse
!async function loader() {
    let loading = setInterval(async function () {
        if (typeof ig === "undefined") return
        else if (typeof ig.game === "undefined") return
        else if (typeof ig.game.screen === "undefined") return
        else if (ig.game.screen.x == 0) return
        else if (typeof Settings !== "function") return

        clearInterval(loading);
        loadDeobf();
        // Mods go here
        extraSoundsMain();
        performanceMain();
        contrastMain();
        speechtotextMain();
        debugMain();
        exporterMain();
        rankhandMain();
        norefreshMain();
        loadPixelCopy();
        friendsplusMain();
        movepainterMain();
        freecamMain();
        importerMain();
        buildMain();
        farbackMain();

    }, 250)
}()
