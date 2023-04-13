const HOME_HTML = `<img src="icons/bmllogo.png" width="130" height="130" style="margin-bottom: -15px"> <p style="color: #38ac84"><i>Version 1.0.6</i></p> <h1 style="color:#faebd7">Better<span style="color: #3fcb94">ML</span></h1> <p style="color:#faebd7">A better Manyland experience.</p> <div id="turnpage" style="float: right; margin-right: -33px; padding-right: 7px; margin-top: 25px; cursor: pointer; color: #38ac84; font-size: 20px"><span style="position: absolute; font-size: 10px; right: 32px; padding-top: 5px"><i>About</i></span>→</div>`
const ABOUT_HTML = `<p style="color:antiquewhite; line-height: 25px; margin: 15px; font-size: 15px; margin-top: 50px; margin-bottom: 30px; inline-size: 400px;"><span style="color: #3fcb94">BetterML</span> is a project designed to make <span style="color: #3fcb94">Manyland</span> better through a collection of <span style="color: #3fcb94">quality of life</span> modifications and useful gameplay additions. This game has done a shocking amount for me in my growth both as a person and a programmer, so I figured I'd give back to it's players as one last <span style="color: #3fcb94">good bye</span> to the game that made me who I am today. I'll do my best to keep this maintained and fix any bugs or add any suggested features that you are more than welcome to share with me via my discord at <span style="color: #3fcb94">Zoltar#9177</span>. See instructions for an in depth guide on how to actually use this thing. Feel free to also check out BetterML's sister app <span style="color: #3fcb94">Pandora's Box!</span> For those of you who are still playing, I hope you can get some use out of this, it's been real fellas. <span style="font-style: italic; color: #3fcb94">~Zoltar</span></p><p style="color: #3fcb94; font-size: 18px; font-style: italic; font-weight: bold;"><a href="https://zoltarml.github.io/BetterML/" target="_blank" style="padding-right: 40px; text-decoration: none; color: #00cb94;">Instructions</a><a style="text-decoration: none; color: #00cb94;" href="https://www.pbox.wiki" target="_blank">Pandora's Box</a></p> <div id="turnpage" style="float: left; margin-left: -33px; padding-right: 7px; margin-top: 25px; cursor: pointer; color: #38ac84; font-size: 20px"><span style="position: absolute; font-size: 10px; left: 32px; padding-top: 5px"><i>Home</i></span>←</div>`

const innerdiv = document.getElementById('innerdiv');
let count = 0;


function pageTurn() {

    if (count === 0) {
        innerdiv.innerHTML = ABOUT_HTML;
        count = 1;
    } else if (count === 1) {
        innerdiv.innerHTML = HOME_HTML;
        count = 0;
    }
    document.getElementById('turnpage').addEventListener("click", pageTurn);
}


document.getElementById('turnpage').addEventListener("click", pageTurn);
