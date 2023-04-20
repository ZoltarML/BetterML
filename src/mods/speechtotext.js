function speechtotextMain() {
    // Create a local storage entry

    let speechSettings = localStorage.getItem('speechsettings');
    speechSettings = JSON.parse(speechSettings);

    // Assign mod shorthand 
    ig.game.settings.spe = speechSettings === null ? false : speechSettings;

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    ig.game.websocket.sendSpeech = Deobfuscator.function(ig.game.websocket, ".SPEECH,{")
    let playerChat = Deobfuscator.object(ig.game.player, 'player', false);

    textbuffer = [];
    bufferInterval = 0;

    ig.game.player.type = async function (text) {
        if (text === '_nl') {
            ig.game.websocket.sendSpeech(`_nl`);
            playerChat.addItem(`_nl`, false)
        } else {
            for (const letter of text) {
                ig.game.websocket.sendSpeech(`_c${letter}`);
                playerChat.addItem(`_c${letter}`, false)
                await timeout(50);
            }
        }

    }

    const artyom = new Artyom();

    let UserDictation = artyom.newDictation({
        continuous: true,
        onResult: async function (text) {
            consoleref.log(text)
            textbuffer.push(text.toLowerCase());


        }
    });

    // Create a togglable function
    ig.game.settings.speechFunction = function () {
        if (!this.spe) {
            // Enable
            UserDictation.start();
            bufferInterval = setInterval(() => {
                if (textbuffer[textbuffer.length - 1] === '') {
                    ig.game.player.type(textbuffer[textbuffer.length - 2]).then(() => ig.game.player.type("_nl"));
                    textbuffer = [];

                }
            }, 10)

        } else {
            // Disable
            UserDictation.stop();
            clearInterval(bufferInterval);

        }
        this.spe = !this.spe;
        localStorage.setItem('speechsettings', this.spe);

    }

    // On refresh instructions
    if (ig.game.settings.spe) {
        ig.game.settings.spe = !ig.game.settings.spe;
        ig.game.settings.speechFunction();

    }

    // Settings menu visuals
    ig.game.settings.Create.toggle("Speech to Text", "spe", "ig.game.settings.speechFunction()");


}
