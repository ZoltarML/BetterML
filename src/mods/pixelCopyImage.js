

function loadPixelCopy() {
    ig.game.alertDialog.prompt = Deobfuscator.function(ig.game.alertDialog, "if(!this.isOpen)")
    ig.game.painter.rotatePixels = Deobfuscator.function(ig.game.painter, "(a);return a");


    function deepEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            const areObjects = isObject(val1) && isObject(val2);
            if (
                areObjects && !deepEqual(val1, val2) ||
                !areObjects && val1 !== val2
            ) {
                return false;
            }
        }

        return true;
    }

    function isObject(object) {
        return object != null && typeof object === 'object';
    }

    pixelCopyImage = async function (url) {


        let pixels = []
        let painterSize = ig.game.painter.tileWidth;
        image = await Jimp.read(`https://corsanywhereclone.onrender.com/${url}`);
        await image.resize(painterSize, painterSize);

        // Converting image to a 2d pixel array.
        var width = image.bitmap.width;
        var height = image.bitmap.height;
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
                pixels.push([pixel.r, pixel.g, pixel.b]);
            }
        }

        quantizedPixels = [[]];
        colorMap = MMCQ.quantize(pixels, 56);
        // Quantizing pixels...
        for (let i = 0; i < pixels.length; i++) {
            let qp = colorMap.map(pixels[i]);
            quantizedPixels[quantizedPixels.length - 1].length == painterSize ? quantizedPixels.push([[qp[0], qp[1], qp[2]]]) : quantizedPixels[quantizedPixels.length - 1].push([qp[0], qp[1], qp[2]]);

        }

        painterFormat = [];
        // Formating pixels to later be cross referenced with colors.
        for (let i = 0; i < quantizedPixels.length; i++) {
            let qp = quantizedPixels[i];
            for (let j = 0; j < qp.length; j++) {
                painterFormat.push({ alpha: 1, b: qp[j][2], g: qp[j][1], r: qp[j][0] });
            }
        }


        let colors = [];

        // Color finding algorithm, could have done this through .palette, but it would have been more code.
        for (let i = 0; i < painterFormat.length; i++) {
            match = false;
            if (colors.length == 0) {
                colors.push(painterFormat[i]);
            }
            for (j = 0; j < colors.length; j++) {
                if (deepEqual(painterFormat[i], colors[j])) {
                    match = true;
                    break;
                }
            }
            if (j == 11) {
                colors.push({ alpha: 0, b: 0, g: 0, r: 0 });
                if (!match) {
                    colors.push(painterFormat[i]);
                    i++;
                }

            } else if (!match) {
                colors.push(painterFormat[i]);
            }
        }

        painterPixelData = [[]];
        empty = [[]]

        // Formatting pixels again to for entry to be equal to it's colors index within the colors array.
        // Also using an array structure readable by the painter..
        for (let i = 0; i < painterFormat.length; i++) {
            for (let j = 0; j < colors.length; j++) {
                if (deepEqual(colors[j], painterFormat[i])) {
                    if (painterPixelData[painterPixelData.length - 1].length !== painterSize) {
                        painterPixelData[painterPixelData.length - 1].push(j);
                        empty[empty.length - 1].push(11);

                    } else {
                        painterPixelData.push([j]);
                        empty.push([11]);
                    }
                }
            }
        }

        painterPixelData.push([1, 1, 1]);
        // Sending it only to the first cell
        pixelContainer = [painterPixelData, empty, empty, empty, empty, empty, empty, empty, empty];
        ig.game.painter.flip = Deobfuscator.function(ig.game.painter, "this.tileWidth-c-1]");

        ig.game.painter.data.pixels[ig.game.painter.selectedCell] = painterPixelData;
        ig.game.painter.data.pixels[ig.game.painter.selectedCell] = ig.game.painter.rotatePixels(ig.game.painter.data.pixels[ig.game.painter.selectedCell])
        ig.game.painter.data.pixels[ig.game.painter.selectedCell] = ig.game.painter.flip(ig.game.painter.data.pixels[ig.game.painter.selectedCell])
        ig.game.painter.data.colors = colors;
        ig.game.painter.update();


    }
}











