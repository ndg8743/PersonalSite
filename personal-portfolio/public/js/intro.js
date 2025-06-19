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
    else {        header.classList.add('top');
        setTimeout(() => {
            document.getElementById('main').style.opacity = 1;
            
            // Initialize all features
            if (typeof initGlobe === 'function') {
                initGlobe();
            }
            if (typeof initMatrix === 'function') {
                initMatrix();
            }
            if (typeof initEnhancedFeatures === 'function') {
                initEnhancedFeatures();
            }
            
            // Show initial page animations
            const initialPage = document.querySelector('.page.active');
            if (initialPage) {
                const animatedElements = initialPage.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, index * 100);
                });
            }
        }, 500);
        window.localStorage.stepDenominator = 2;
    }
}

// Auto-start animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (header) update();
    });
} else {
    if (header) update();
}
