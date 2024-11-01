let header = document.querySelector('#intro');
let anim = [
    { t: "{ }", ms: 200 },
    { t: "{_}", ms: 200 },
    { t: "{ }", ms: 200 },
    { t: "{_}", ms: 200 },
    { t: "{N_}", ms: 100 },
    { t: "{NA_}", ms: 100 },
    { t: "{NAT_}", ms: 100 },
    { t: "{NATH_}", ms: 100 },
    { t: "{NATHA_}", ms: 100 },
    { t: "{NATHAN_}", ms: 100 },
    { t: "{NATHAN_}", ms: 100 },
    { t: "{NATHAN_G_}", ms: 100 },
    { t: "{NATHAN_GO_}", ms: 100 },
    { t: "{NATHAN_GOP_}", ms: 100 },
    { t: "{NATHAN_GOPE_}", ms: 100 },
    { t: "{NATHAN_GOPEE_}", ms: 100 },
    { t: "{NATHAN_GOPEE }", ms: 200 },
    { t: "{NATHAN_GOPEE_}", ms: 200 },
    { t: "{NATHAN_GOPEE }", ms: 200 },
    { t: "{NATHAN_GOPEE_}", ms: 200 },
    { t: "{NATHAN_GOPEE}", ms: 200 },
    { t: "{NATHAN_GOPEE}", ms: 200 }
];
let stepDenominator = 1;
if (window.localStorage.stepDenominator)
    stepDenominator = window.localStorage.stepDenominator;
let i = 0;
let update = () => {
    let step = anim[i];
    header.innerText = step.t;
    i++;

    if (i < anim.length)
        setTimeout(update, step.ms / stepDenominator);
    else {
        header.classList.add('top');
        setTimeout(() => {
            document.getElementById('main').style.opacity = 1;
            initGlobe();
        }, 500);
        window.localStorage.stepDenominator = 2;
    }
}
update();