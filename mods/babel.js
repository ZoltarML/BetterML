function babelMain() {
    let manybabelSettings = localStorage.getItem('manybabel');
    manybabelSettings = JSON.parse(manybabelSettings);

    ig.game.settings.mbl = manybabelSettings === null ? false : manybabelSettings;

    ig.game.settings.manyBABEL = function () {
        if (!this.mbl) {
            if (location.protocol === 'https:')
                $.getScript('https://cdn.jsdelivr.net/gh/ZoltarML/ManyBABEL@0.1/babelClient.js')
            else
                ig.game.alertDialog.open(`<p style='color: red'>To use ManyBABEL you must be using https. You are currently only using http. Try navigating to "https://manyland.com" instead of "http://manyland.com" from now on!</p>`, !0, null, null, null, !0, null, null, !0, null, null, !0);

            this.mbl = !this.mbl;
            localStorage.setItem('manybabel', this.mbl);

        } else {
            this.mbl = !this.mbl;
            localStorage.setItem('manybabel', this.mbl);
            location.reload();
        }

    }

    if (ig.game.settings.mbl) {
        ig.game.settings.mbl = !ig.game.settings.mbl;
        ig.game.settings.manyBABEL();

    }

    ig.game.settings.Create.header("BetterML", 'green');
    ig.game.settings.Create.toggle("ManyBABEL", "mbl", "ig.game.settings.manyBABEL()", "voice and text chat");
    ig.game.settings.Create.addendum("Notice: turning off ManyBABEL will refresh your page.", '#ff6600');

}