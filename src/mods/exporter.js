function exporterMain() {
    let exporterSettings = localStorage.getItem('exportersettings');
    exporterSettings = JSON.parse(exporterSettings);

    ig.game.settings.exp = exporterSettings === null ? false : exporterSettings;

    ig.game.itemContextMenu.old_draw = ig.game.itemContextMenu.draw;

    let image = new Image();
    image.src = 'https://cdn.discordapp.com/attachments/614637022614782000/867213341953097769/arrow.png'

    // Thank you Stackoverflow!
    function toDataURL(url) {
        return fetch(url).then((response) => {
            return response.blob();
        }).then(blob => {
            return URL.createObjectURL(blob);
        });
    }

    async function exportSprite(item) {
        ig.game.sounds.click.play();
        const a = document.createElement("a");
        a.href = await toDataURL(`${item.imageURL}.png`);
        a.download = `${item.name}.png`;
        document.body.appendChild(a);
        window.removeEventListener('click', clickArrow)
        a.click();
        document.body.removeChild(a);
        window.addEventListener('click', clickArrow)
    }

    function clickArrow(event) {
        if (ig.game.itemContextMenu.isOpen) {
            let selected = Deobfuscator.object(ig.game.itemContextMenu, 'thing');
            let spot = {
                x1: (ig.game.itemContextMenu.pos.x + 102) * ig.system.scale,
                y1: (ig.game.itemContextMenu.pos.y + 14) * ig.system.scale,
                x2: ((ig.game.itemContextMenu.pos.x + 102) * ig.system.scale) + (11 * ig.system.scale),
                y2: ((ig.game.itemContextMenu.pos.y + 14) * ig.system.scale) + (9 * ig.system.scale),
                call: () => { selected.thing.creatorId == ig.game.player[id] ? exportSprite(selected.thing) : ig.game.alertDialog.open("<p style='color: red'>To export an item you must be its creator.</p>", !0, null, null, null, !0, null, null, !0, null, null, !0); }
            }

            let clickPos = { x: ig.input.mouse.x * ig.system.scale, y: ig.input.mouse.y * ig.system.scale }

            if (clickPos.x > spot.x1 && clickPos.x < spot.x2 && clickPos.y > spot.y1 && clickPos.y < spot.y2) {
                spot.call();
            }
        }

    }

    ig.game.settings.exporter = function () {


        if (!this.exp) {


            window.addEventListener('click', clickArrow)
            ig.game.itemContextMenu.draw = () => {
                ig.game.itemContextMenu.old_draw();
                if (ig.game.itemContextMenu.isOpen) {
                    ig.system.context.globalAlpha = 0.4;
                    ig.system.context.drawImage(image, (ig.game.itemContextMenu.pos.x + 102) * ig.system.scale, (ig.game.itemContextMenu.pos.y + 12) * ig.system.scale, (11 * ig.system.scale), (9 * ig.system.scale));
                    ig.system.context.globalAlpha = 1;
                }

            }
        } else {
            window.removeEventListener('click', clickArrow)
            ig.game.itemContextMenu.draw = () => {
                ig.game.itemContextMenu.old_draw();
            }
        }

        this.exp = !this.exp;
        localStorage.setItem('exportersettings', this.exp);
    }


    if (ig.game.settings.exp) {
        ig.game.settings.exp = !ig.game.settings.exp;
        ig.game.settings.exporter();

    }


    ig.game.settings.Create.header("BetterML", 'green');
    ig.game.settings.Create.toggle("Item Exporter", "exp", "ig.game.settings.exporter()");



}

