
function movepainterMain() {
    // Create a local storage entry
    let movepainterSettings = localStorage.getItem('movepaintersettings');
    movepainterSettings = JSON.parse(movepainterSettings);

    // Assign mod shorthand 
    ig.game.settings.mpr = movepainterSettings === null ? false : movepainterSettings;

    ig.game.painter.old_launch = ig.game.painter.launch;
    ig.game.painter.old_close = ig.game.painter.close;

    function dragPainter() {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;

        let painter = ig.game.painter.canvas;
        let input = $(".painterInputBox")[0];

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

        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Create a togglable function
    ig.game.settings.movepainter = function () {
        if (!this.mpr) {

            ig.game.painter.launch = function () {
                this.old_launch();
                dragPainter();

            }

            ig.game.painter.close = function (a) {
                ig.game.painter.old_close(a);
                ig.game.painter.canvas.onmousedown = null;
            }

        } else {
            ig.game.painter.launch = ig.game.painter.old_launch;
            ig.game.painter.close = ig.game.painter.old_close;
            ig.game.painter.canvas.onmousedown = null;
        }
        this.mpr = !this.mpr;
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
