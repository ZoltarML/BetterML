
(function () {

    const dependencies = ['deobf.js', 'jimp.min.js', 'quantize.js', 'artyom.window.min.js'];
    // loader.js MUST come last and extrasounds.js MUST be first
    const mods = ['extrasounds.js', 'exporter.js', 'pixelCopyImage.js', 'rankhand.js', 'performance.js', 'friendsplus.js', 'movepainter.js', 'norefresh.js', 'freecam.js', 'importer.js', 'speechtotext.js', 'highcontrast.js', 'debugmode.js', 'buildplus.js', 'farbackconverter.js','loader.js'];

    // Prime dependencies
    for(d of dependencies) {
        let node = document.getElementsByTagName('body')[0];
        let s = document.createElement('script');

        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', chrome.runtime.getURL('dependencies/' + d));

        s.onload = () => s.remove();
        node.appendChild(s);
    }

    // Prime mods
    for (mod of mods) {
        let node = document.getElementsByTagName('body')[0];
        let s = document.createElement('script');

        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', chrome.runtime.getURL('mods/' + mod));

        s.onload = () => s.remove();
        node.appendChild(s);

    }

}())

