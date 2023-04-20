function extraSoundsMain() {
    ig.game.settings.add = Deobfuscator.function(ig.game.settings, 'Math.min(ig.system.scale,5)', true);
    ig.game.settings.header = Deobfuscator.function(ig.game.settings, 'text-transform: uppercase;', true);
    const stringMethod = Deobfuscator.function(ig.game.strings, `this.replaceAll(a,"<","&lt;"`, true);

    ig.game.panelSet.musicPlayer.old_addUrl = ig.game.panelSet.musicPlayer.addUrl;

    ig.game.settings[ig.game.settings.header] = function (a, b = 'black') {
        return `<div style="margin-top: 30px; margin-bottom: 5px; opacity: .65; color: ${b}; text-transform: uppercase;">` + ig.game.strings[stringMethod](a) + "</div>";
    }

    ig.game.settings.Create = {
        toggle: function (name, toggle, callback, description = "") {

            let splitCheck = ig.game.settings.openDialog.toString().split('function() {').length > 1 ? 'function() {' : 'function(){';
            let splitText = ig.game.settings.openDialog.toString().split(splitCheck)[1];

            let recompiledFunction;

            recompiledFunction = splitText.split('a+="</div>";').join(`a += this.${ig.game.settings.add}("${toggle}", "${name}", "${description}", "${callback}", this.${toggle}); a+="</div>";`)
            eval('ig.game.settings.openDialog = function(){ ' + recompiledFunction);
        },
        header: function (name, color = 'black') {
            let splitCheck = ig.game.settings.openDialog.toString().split('function() {').length > 1 ? 'function() {' : 'function(){';
            let splitText = ig.game.settings.openDialog.toString().split(splitCheck)[1];

            let recompiledFunction;
            recompiledFunction = splitText.split('a+="</div>";').join(`a += this.${ig.game.settings.header}("${name}", "${color}"); a+="</div>";`)
            eval('ig.game.settings.openDialog = function(){ ' + recompiledFunction);

        },
        addendum: function (text, color = 'black') {
            let splitCheck = ig.game.settings.openDialog.toString().split('function() {').length > 1 ? 'function() {' : 'function(){';
            let splitText = ig.game.settings.openDialog.toString().split(splitCheck)[1];
            let recompiledFunction;
            recompiledFunction = splitText.split('a+="</div>";').join(`a+= '<p style="opacity: .5; color: ${color}; font-size: 9.5px; padding: 1px; padding-left: 20px; font-style: italic;">${text}</p>'; a+="</div>";`)
            eval('ig.game.settings.openDialog = function(){ ' + recompiledFunction);


        }
    }


    let btMuteSetting = localStorage.getItem("bettermute");
    let typeSetting = localStorage.getItem("typesound");

    btMuteSetting = JSON.parse(btMuteSetting);
    typeSetting = JSON.parse(typeSetting);

    let pasteCheck = Deobfuscator.function(ig.game.player, 'Boolean(b&&b', true);
    let slotPass = Deobfuscator.object(ig.game, 'slots', true);
    let storedPasteCheck = ig.game.player[pasteCheck];


    ig.game.settings.typeInterval = 1;

    const getPlayerChat = target => {
        Deobfuscator.findByType = (object, type, returnKey) => {

            let keyFound = null;

            Object.keys(object).forEach((i) => {
                if (object[i] === null)
                    return;

                if (object[i].constructor === type)
                    keyFound = returnKey ? i : object[i];
            });

            return keyFound;

        }

        updatePlayers();
        if (ig.game.players.length == 0) return;
        let chat = "";
        ig.game.players.forEach(player => {
            let playerId = ig.game.players.length > 0 ? Deobfuscator.variableByLength(ig.game.players[1], 24, true) : id;
            if (player[playerId] === target) {

                let playerChat = Deobfuscator.object(player, 'player', false);
                playerChat.object = Deobfuscator.findByType(playerChat, Array, false);

                if (playerChat.object.length != 0) {
                    let index = playerChat.object.length - 1;
                    chat = Deobfuscator.findByType(playerChat.object[index], String, false);
                }
            }
        });

        return chat;
    }

    function getDistance(x1, y1, x2, y2) {
        let xDistance = x2 - x1;
        let yDistance = y2 - y1;

        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }


    ig.game.settings.betterMute = function () {
        if (!this.btm) {

            let whiteListedSounds = ["ping", "clap", "click", "whoosh", "softWhoosh", "nocando", "success", "shortWhoosh", "putdown", "pickup", "portallingWhoosh", "jump", "actionSoft", "bin", "collide", "collideSoft"];

            ig.game.player[pasteCheck] = function (a) {
                if (a === "mutesPastes") return true;
                var b = this.attachments[ig.game[slotPass].slots.WEARABLE];


                return Boolean(b && b.attributes && b.attributes[a])
            }
            ig.game.panelSet.musicPlayer.addUrl = () => { };

            for (let sound of Object.keys(ig.game.sounds)) {
                if (!whiteListedSounds.includes(sound)) {
                    if (ig.game.sounds[sound].volume == 1) {
                        ig.game.sounds[sound].volume = 0;
                    }


                }
            }
            this.btm = !this.btm
            localStorage.setItem("bettermute", this.btm);

        } else {
            ig.game.player[pasteCheck] = storedPasteCheck;
            ig.game.panelSet.musicPlayer.addUrl = ig.game.panelSet.musicPlayer.old_addUrl;
            for (let sound of Object.keys(ig.game.sounds)) {
                if (ig.game.sounds[sound].volume == 0) {
                    ig.game.sounds[sound].volume = 1;
                }


            }
            this.btm = !this.btm;
            localStorage.setItem("bettermute", this.btm);
        }

    }

    ig.game.settings.typeSound = function () {

        let chatBuffer = [{ id: "", message: "" }]
        let chatterIds = [""];

        if (!this.tps) {
            ig.game.settings.typeInterval = setInterval(() => {
                updatePlayers();
                if (ig.game.players.length == 0) {
                    this.tps = !this.tps;
                    localStorage.setItem("typesound", this.tps);
                    return;
                }
                for (let player of ig.game.players) {

                    let playerId = ig.game.players.length > 1 ? Deobfuscator.variableByLength(ig.game.players[1], 24, true) : id;

                    if (getDistance(ig.game.player.pos.x, ig.game.player.pos.y, player.pos.x, player.pos.y) <= 230 && player[playerId] != ig.game.player.id) {
                        if (!chatterIds.includes(player[playerId])) {
                            chatBuffer.push({ id: player[playerId], message: getPlayerChat(player[playerId]) })
                            chatterIds.push(player[playerId])
                        }

                        for (let chatter of chatBuffer) {
                            if (chatter.id === player[playerId]) {

                                if (chatter.message != getPlayerChat(player[playerId])) {
                                    ig.game.sounds.click.play();
                                }
                                chatter.message = getPlayerChat(player[playerId]);

                            }
                        }

                    }
                }
            }, 50)
            this.tps = !this.tps;
            localStorage.setItem("typesound", this.tps);

        } else {
            clearInterval(ig.game.settings.typeInterval);
            this.tps = !this.tps;
            localStorage.setItem("typesound", this.tps);
        }


    }



    ig.game.settings.btm = typeof btMuteSetting == null ? ig.game.settings.btm = false : ig.game.settings.btm = btMuteSetting;
    ig.game.settings.tps = typeof typeSetting == null ? ig.game.settings.tps = false : ig.game.settings.tps = typeSetting;


    if (ig.game.settings.btm) {
        ig.game.settings.btm = !ig.game.settings.btm;
        ig.game.settings.betterMute();

    }

    if (ig.game.settings.tps) {
        ig.game.settings.tps = !ig.game.settings.tps;
        ig.game.settings.typeSound();
    }


    ig.game.settings.Create.header("Sound Extras");
    ig.game.settings.Create.toggle("Better Mute", "btm", "ig.game.settings.betterMute()", "Mutes everything but the essentials");
    ig.game.settings.Create.toggle("Type Sound", "tps", "ig.game.settings.typeSound()");



}
