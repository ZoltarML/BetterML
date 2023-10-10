async function movepainterMain() {

    // Create a local storage entry
    let movepainterSettings = localStorage.getItem('movepaintersettings');
    movepainterSettings = JSON.parse(movepainterSettings);

    // Assign mod shorthand 
    ig.game.settings.mpr = movepainterSettings === null ? false : movepainterSettings;

    ig.game.painter.old_launch = ig.game.painter.launch;
    ig.game.painter.old_close = ig.game.painter.close;

    ig.game.painter.isImport = false;

    ig.game.painter.setType = Deobfuscator.function(ig.game.painter, 'c=confirm("Motion', true);
    ig.game.painter.old_setType = ig.game.painter[ig.game.painter.setType];



    ig.game.painter.createImportButton = function () {
        img = document.createElement('img');
        img.src = 'https://cdn.discordapp.com/attachments/986742746104598548/1095837823950655579/1f15225e0e4e4c9.png'
        img.style.position = 'absolute';
        img.style.top = JSON.parse($(".painterInputBox")[0].style.top.split("px")[0]) + (ig.system.scale * 17) - 1 + "px";
        img.style.left = JSON.parse($(".painterInputBox")[0].style.left.split("px")[0]) + (ig.system.scale * 82) - 2 + "px";
        img.width = (ig.system.scale * 33.35);
        img.height = (ig.system.scale * 18) + 2;
        img.style.cursor = 'pointer';
        img.id = "importButton";

        img.onclick = function () {

            ig.game.alertDialog.open(`<style> body { margin-top: 25px; } </style> <p class="miftThankYouMessage">Enter Image URL</p> <input type="text" id="urlInput" autocomplete="off" placeholder="https://image.com/thing.png" style="font-size: 10px; font-family: 'Press Start 2P', sans-serif; padding: 5px; width: 300px; "></input>`,
                true,
                async () => {
                    url = document.getElementById("urlInput").value;
                    pixelCopyImage(url);
                    ig.game.painter.isImport = true;
                },
                "IMPORT", null, null, null, null, null, null, null, true);
        }

        document.body.appendChild(img);
    }

    ig.game.painter.dragPainter = function () {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;

        let painter = ig.game.painter.canvas;
        let input = document.getElementById('nameInput');

        painter.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();

            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();

            if (ig.input.state("shift") !== true) return;
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            painter.style.top = painter.offsetTop - pos2 + "px";
            painter.style.left = painter.offsetLeft - pos1 + "px";


            input.style.top = input.offsetTop - pos2 + "px";
            input.style.left = input.offsetLeft - pos1 + "px";

            if (ig.game.settings.imp && document.getElementById('importButton')) {
                let importButton = document.getElementById('importButton');
                importButton.style.top = importButton.offsetTop - pos2 + "px";
                importButton.style.left = importButton.offsetLeft - pos1 + "px";
            }

        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    ig.game.painter.hasDrawn = Deobfuscator.function(ig.game.painter, 'a=!1;if(this.data')
    ig.game.painter.updateTileWidth = Deobfuscator.function(ig.game.painter, 'this.selectedCell;this.');

    // erm, sorry
    ig.game.painter.importLaunch = function () {
        this.old_launch();
        this.createImportButton();
    }

    ig.game.painter.moveLaunch = function () {
        this.old_launch();
        this.dragPainter();
    }

    ig.game.painter.importClose = function (a) {
        this.old_close(a);
        if (a == !0 || !ig.game.painter.hasDrawn())
            document.getElementById('importButton') && document.body.removeChild(document.getElementById('importButton'));
        ig.game.painter.isImport = false;

    }

    ig.game.painter.moveClose = function (a) {
        this.old_close(a);
        ig.game.painter.canvas.onmousedown = null;
    }

    ig.game.painter.doublePainterLaunch = function () {
        this.old_launch();
        this.dragPainter();
        this.createImportButton();


    }

    ig.game.painter.doublePainterClose = function (a) {
        this.old_close(a);
        ig.game.painter.canvas.onmousedown = null;
        if (a == !0 || !ig.game.painter.hasDrawn())
            document.getElementById('importButton') && document.body.removeChild(document.getElementById('importButton'));

        ig.game.painter.isImport = false;
    }


    ig.game.painter.moveSetType = function (a, b) {
        this.old_setType(a, b);
        if (typeof ig.game.painter.canvas !== 'undefined')
            ig.game.painter.canvas.onmousedown = null;

        ig.game.painter.dragPainter();

    }

    ig.game.painter.importSetType = function (a, b) {
        this.old_setType(a, b);
        document.getElementById('importButton') && document.body.removeChild(document.getElementById('importButton'));
        this.createImportButton();

    }

    ig.game.painter.doubleSetType = function (a, b) {
        this.old_setType(a, b);
        if (typeof ig.game.painter.canvas !== 'undefined')
            ig.game.painter.canvas.onmousedown = null;

        document.getElementById('importButton') && document.body.removeChild(document.getElementById('importButton'));
        this.createImportButton();
        ig.game.painter.dragPainter();
    }



    // Create a togglable function
    ig.game.settings.movepainter = function () {
        this.mpr = !this.mpr;
        if (this.mpr) {

            ig.game.painter.launch = ig.game.settings.imp && ig.game.settings.mpr ? ig.game.painter.doublePainterLaunch : ig.game.painter.moveLaunch;
            ig.game.painter.close = ig.game.settings.imp && ig.game.settings.mpr ? ig.game.painter.doublePainterClose : ig.game.painter.moveClose;
            ig.game.painter[ig.game.painter.setType] = ig.game.settings.imp && ig.game.settings.mpr ? ig.game.painter.doubleSetType : ig.game.painter.moveSetType;


        } else {
            ig.game.painter.launch = ig.game.settings.imp ? ig.game.painter.importLaunch : ig.game.painter.old_launch;
            ig.game.painter.close = ig.game.settings.imp ? ig.game.painter.importClose : ig.game.painter.old_close;
            ig.game.painter[ig.game.painter.setType] = ig.game.painter.old_setType;
            if (typeof ig.game.painter.canvas !== 'undefined')
                ig.game.painter.canvas.onmousedown = null;
        }

        localStorage.setItem('movepaintersettings', this.mpr);

    }

    // On refresh instructions
    if (ig.game.settings.mpr) {
        ig.game.settings.mpr = !ig.game.settings.mpr;
        ig.game.settings.movepainter();

    }

    // Settings menu visuals
    ig.game.settings.Create.toggle("Moveable Painter", "mpr", "ig.game.settings.movepainter()", "Shift + Click to move");


}
