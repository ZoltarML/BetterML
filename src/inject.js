
(function () {

    // loader.js MUST come last and extrasounds.js MUST be first
    let mods = ['extrasounds.js', 'babel.js', 'exporter.js', 'rankhand.js', 'performance.js', 'friendsplus.js', 'movepainter.js', 'norefresh.js', 'freecam.js', 'loader.js'];

    for (mod of mods) {
        let node = document.getElementsByTagName('body')[0];
        let s = document.createElement('script');

        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', chrome.runtime.getURL('mods/' + mod));

        s.onload = () => s.remove();
        node.appendChild(s);

    }

}())

