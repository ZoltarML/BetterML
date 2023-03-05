function rankhandMain() {
    let rankhandSettings = localStorage.getItem('rankhandsettings');
    rankhandSettings = JSON.parse(rankhandSettings);

    ig.game.settings.rkh = rankhandSettings === null ? false : rankhandSettings;

    let profileRequest = false;
    let globalColor = "";
    let image = new Image();
    let image2 = new Image();

    const whiteArray = ['https://cdn.discordapp.com/attachments/821248617628565524/858245966929985536/Rank0Hand.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858245767889944606/Rank1Hand.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858246009771261982/Rank2Hand.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858245730572959754/Rank3Hand.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858245729389510656/Rank4Hand.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858245899813257236/Rank5Hand.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858245723756691466/Rank10Hand.png']
    const blackArray = ['https://cdn.discordapp.com/attachments/821248617628565524/858245737828974602/Rank0HandBlack.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858245742136393728/Rank1HandBlack.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858245736357167113/Rank2HandBlack.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858245735426293790/Rank3HandBlack.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858245733974409216/Rank4HandBlack.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858245732930027540/Rank5HandBlack.png', 'https://cdn.discordapp.com/attachments/821248617628565524/858245732271783936/Rank10HandBlack.png']

    let rank = ig.game.player.rank === 10 ? 6 : ig.game.player.rank;
    image.src = whiteArray[rank];

    let opened = false;
    let initialOffset = 55;
    const requestUrl = window.location.protocol === "https:" ? 'https://manyland.com/j/u/pi' : 'http://manyland.com/j/u/pi';

    ig.game.oldDraw = ig.game.draw;




    ig.game.playerDialog.rank_old_draw = ig.game.playerDialog.draw;




    ig.game.settings.rankhand = function () {
        if (!this.rkh) {
            ig.game.draw = function () {
                ig.game.oldDraw();
                ig.system.context.globalAlpha = 0.85;
                ig.system.context.drawImage(image, 5, -4, (18 * ig.system.scale), (18 * ig.system.scale))

                ig.game.whiteFont.draw(ig.game.player.screenName, 22, 6);
                ig.system.context.globalAlpha = 1;


            }

            ig.game.playerDialog.draw = function () {
                ig.game.playerDialog.rank_old_draw();

                if (this.isOpen) {
                    let player = Deobfuscator.object(ig.game.playerDialog, 'rank', false);
                    if (player.id === ig.game.player[id]) return;

                    if (player.name.length > 6 && !opened) {
                        opened = true;
                        if (player.hasMinfinity) {
                            initialOffset -= 14;
                        } else if (player.rank === 0) {
                            initialOffset -= 26;
                        }
                        for (let i = 0; i < player.name.length - 6; i++) {
                            initialOffset -= 12;

                        }
                    } else if (player.name.length < 6 && !opened) {
                        opened = true;
                        if (player.hasMinfinity) {
                            initialOffset -= 14;
                        } else if (player.rank === 0) {
                            initialOffset -= 26;
                        }
                        for (let i = 0; i < (6 - player.name.length); i++) {
                            initialOffset += 12;

                        }

                    } else {
                        if (player.hasMinfinity && !opened) {
                            opened = true;
                            initialOffset -= 14;
                        } else if (player.rank === 0 && !opened) {
                            initialOffset -= 26;
                        }
                    }

                    if (!profileRequest) {


                        $.post(requestUrl, { id: player.id, planeId: 0, areaId: ig.game.areaId }, data => {
                            globalColor = data.profileColor;
                            ig.system.context.globalAlpha = 0.7;
                            let rank = player.rank === 10 ? 6 : player.rank;


                            globalColor === 7 || globalColor === null ? image2.src = blackArray[rank] : image2.src = whiteArray[rank]


                            ig.system.context.drawImage(image2,
                                (this.pos.x * ig.system.scale) + ig.game.playerDialog.clickspotInfoPos.x - initialOffset,
                                (this.pos.y * ig.system.scale) + ig.game.playerDialog.clickspotInfoPos.y - 10, (17 * ig.system.scale), (17 * ig.system.scale)
                            );

                            ig.system.context.globalAlpha = 1;

                        })
                        profileRequest = true;

                    } else {

                        ig.system.context.globalAlpha = 0.7;
                        let rank = player.rank === 10 ? 6 : player.rank;

                        globalColor === 7 || globalColor === null ? image2.src = blackArray[rank] : image2.src = whiteArray[rank]

                        ig.system.context.drawImage(image2,
                            (this.pos.x * ig.system.scale) + ig.game.playerDialog.clickspotInfoPos.x - initialOffset,
                            (this.pos.y * ig.system.scale) + ig.game.playerDialog.clickspotInfoPos.y - 10, 50, 50
                        );

                        ig.system.context.globalAlpha = 1;
                    }



                } else {
                    profileRequest = false;
                    initialOffset = 55;
                    opened = false;
                }
            }

        } else {
            ig.game.draw = ig.game.oldDraw;
            ig.game.playerDialog.draw = ig.game.playerDialog.rank_old_draw;
        }
        this.rkh = !this.rkh;
        localStorage.setItem('rankhandsettings', this.rkh);

    }


    if (ig.game.settings.rkh) {
        ig.game.settings.rkh = !ig.game.settings.rkh;
        ig.game.settings.rankhand();

    }

    ig.game.settings.Create.toggle("Old school rank check", "rkh", "ig.game.settings.rankhand()");
}

