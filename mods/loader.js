async function loadObf() {
    if (typeof Deobfuscator == 'undefined')
        await $.getScript("https://cdn.jsdelivr.net/gh/parseml/many-deobf@latest/deobf.js")

}

// smooth loader from parse
!async function loader() {
    let loading = setInterval(async function () {
        if (typeof ig === "undefined") return
        else if (typeof ig.game === "undefined") return
        else if (typeof ig.game.screen === "undefined") return
        else if (ig.game.screen.x == 0) return
        else if (typeof Settings !== "function") return

        clearInterval(loading);
        await loadObf();
        // Mods go here
        extraSoundsMain();
        performanceMain();
        babelMain();
        exporterMain();
        rankhandMain();
        friendsplusMain();
        uncappedplacementMain();
        freecamMain();

    }, 250)
}()
