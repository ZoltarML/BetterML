async function loadDependencies() {
    // Getting deobf
    if (typeof Deobfuscator == 'undefined') await $.getScript("https://cdn.jsdelivr.net/gh/parseml/many-deobf@latest/deobf.js")
    // Getting Quantization Algorithm
    if (typeof MMCQ === 'undefined') $.getScript('https://cdn.jsdelivr.net/gh/ZoltarML/mmcq@1.0/quantize.js')
    // Getting Jimp
    if (typeof Jimp == 'undefined') $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jimp/0.22.7/jimp.min.js');

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
        await loadDependencies();
        // Mods go here
        extraSoundsMain();
        performanceMain();
        babelMain();
        exporterMain();
        rankhandMain();
        norefreshMain();
        loadPixelCopy();
        friendsplusMain();
        movepainterMain();
        freecamMain();
        importerMain();


    }, 250)
}()
