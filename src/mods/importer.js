// This is a template for adding a mod
function importerMain() {
    // Create a local storage entry
    let importerSettings = localStorage.getItem('importersettings');
    importerSettings = JSON.parse(importerSettings);

    // Assign mod shorthand 
    ig.game.settings.imp = importerSettings === null ? false : importerSettings;

    // Checks if everything is alright before actually saving
    ig.game.painter.saveCheck = Deobfuscator.function(ig.game.painter, '"SET NAME"', true)
    ig.game.painter.old_save_check = ig.game.painter[ig.game.painter.saveCheck];

    let saveCheckSplit = ig.game.painter[ig.game.painter.saveCheck].toString().split('function(){')[1];
    ig.game.painter.recompiledSaveFunction = saveCheckSplit.split('"unnamed";').join(`"unnamed"; consoleref.log(ig.game.painter.data.name); if(ig.game.painter.isImport && !ig.game.painter.data.name.includes("import")){a = !1; jQuery("#nameInput").attr("placeholder", 'Missing "Import"'); jQuery("#nameInput").addClass("missingValueInputBox"); document.getElementById("nameInput").value = ""; ig.game.sounds.nocando.play(); ig.game.alertDialog.open( '<p style="color: red">Creations name must include "Import" before saving!</p>', !0, null, null, null, !0, null, null, !0, null, null, !0 );}`)

    // Where it actually saves
    ig.game.painter.finalSave = Deobfuscator.function(ig.game.painter, ').indexOf("someone', true)
    ig.game.painter.old_final_save = ig.game.painter[ig.game.painter.finalSave];

    // Create a togglable function
    ig.game.settings.importer = function () {
        this.imp = !this.imp;

        if (this.imp) {

            ig.game.painter.launch = ig.game.settings.imp && ig.game.settings.mpr ? ig.game.painter.doublePainterLaunch : ig.game.painter.importLaunch;
            ig.game.painter.close = ig.game.settings.imp && ig.game.settings.mpr ? ig.game.painter.doublePainterClose : ig.game.painter.importClose;
            eval(`ig.game.painter.${ig.game.painter.saveCheck} = function(){` + ig.game.painter.recompiledSaveFunction);
            ig.game.painter[ig.game.painter.setType] = ig.game.settings.imp && ig.game.settings.mpr ? ig.game.painter.doubleSetType : ig.game.painter.importSetType;

            ig.game.painter[ig.game.painter.finalSave] = function (a) {
                document.getElementById('importButton') && document.body.removeChild(document.getElementById('importButton'));
                ig.game.painter.isImport = false;
                this.old_final_save(a);

            }

        } else {
            // Disable
            ig.game.painter.launch = ig.game.settings.mpr ? ig.game.painter.moveLaunch : ig.game.painter.old_launch;
            ig.game.painter.close = ig.game.settings.mpr ? ig.game.painter.moveClose : ig.game.painter.old_close;
            ig.game.painter[ig.game.painter.saveCheck] = ig.game.painter.old_save_check;
            ig.game.painter[ig.game.painter.finalSave] = ig.game.painter.old_final_save;
            ig.game.painter[ig.game.painter.setType] = ig.game.painter.old_setType;
            document.getElementById('importButton') && document.body.removeChild(document.getElementById('importButton'));

        }

        localStorage.setItem('importersettings', this.imp);

    }

    // On refresh instructions
    if (ig.game.settings.imp) {
        ig.game.settings.imp = !ig.game.settings.imp;
        ig.game.settings.importer();

    }

    // Settings menu visuals
    ig.game.settings.Create.toggle("Image Importer", "imp", "ig.game.settings.importer()");
    ig.game.settings.Create.addendum("Warning: This modification is seen by some as unfair and in violation of Manylands TOS, use at your own discretion.", 'red');


}
