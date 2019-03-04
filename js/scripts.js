window.onload = function() {
    resizeImgBoxFunc();
    backChangerFunc();
}

var feed = new Instafeed({
    get: 'user',
    userId: '9992482754',
    accessToken: '9992482754.2d4af4e.7aec98d5edad447db3e1e6e72db282a4',
    filter: function(image) {
        var MAX_LENGTH = 40;
        var resolution = 'standard_resolution';

        // here we create a property called "short_caption"
        // on the image object, using the original caption
        if (image.caption && image.caption.text) {
            image.short_caption = image.caption.text.slice(0, MAX_LENGTH);
        } else {
            image.short_caption = "";
        }

        // ensure the filter doesn't reject any images
        return true;
    },
    template: '<div class="col-2"><img style="width:10vw;" src={{image}}><p class="likes"><i class="fas fa-heart pr-2"></i>{{likes}}</div>'
});
feed.run();

//In some browsers, namely Firefox, there has been a decrease in performance whenever my functions are called and it can be quite discouraging to see a webpage perform slow due to a small function.
//The methods I've used to call my functions might have not been the most optimal but I do feel that I have progressed further with Javascript and I found it enjoyable.
//Code taken from "https://davidwalsh.name/javascript-debounce-function". David Walsh comments here explaining how it works.
//I've implemented this strategy to reduce the amount of calls that is requested by the addEventListeners.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var resizeImgBox = debounce(function() {
    resizeImgBoxFunc();
}, 250);

var backChanger = debounce(function() {
    backChangerFunc();
}, 20);

//Before the trigger fires, it will be delayed by the debounce function
//The parameters just before any debounce function closes there is an millisecond delay value which can be changed to whatever suit  
window.addEventListener('resize', resizeImgBox);
window.addEventListener('resize', backChanger);
window.addEventListener('wheel', backChanger);

//
function resizeImgBoxFunc() {
    //The property "topbar" and "botbar" has been defined in the HTML document and is being pulled and stored into a variable that I have defined.
    let blocktop = document.getElementById('topbar');
    let blockbot = document.getElementById('botbar');
    //In order to acquire the x,y properties of each variable, I've used "getBoundingClientRect();" to store their physical positions found in the HTML document.
    //Positions are relative to the height/width.
    let blocktopProp = blocktop.getBoundingClientRect();
    let blockbotProp = blockbot.getBoundingClientRect();
    //To read the 4 values from "getBoundingClientRect();", you can define which one you need.
    //The calculation below will work out element "topbar" and "botbar" heights and add both values together.
    let block1Height = (blocktopProp.top - blocktopProp.bottom) + (blockbotProp.top - blockbotProp.bottom);
    //I've selected "image1cont" and have applied the height property of "block1nam".
    //CSS will need a measurement format to be readable, i've used pixels since "getBoundingClientRect();" return pixel values.
    //"px" is the correct syntax to add text to value in a variable format.
    //"Math.abs" can change a value from either a positive to a negative or negative to positive.
    document.getElementById('image1cont').style.height = Math.abs(block1Height) + "px";
}

function backChangerFunc() {
    //This could be considered as a quick hack to fetch the viewport values into pixel format.
    //There are a few calculations at the bottom that will make use of the viewports.
    let viewport = document.getElementById('viewport');
    let viewportProp = viewport.getBoundingClientRect();
    var vh = viewportProp.bottom - viewportProp.top
    var vw = viewportProp.right - viewportProp.left

    let imgcont = document.getElementById('image1cont');
    let img = document.getElementById('image1');
    let imgcontProp = imgcont.getBoundingClientRect();
    let imgProp = img.getBoundingClientRect();
    //Value becomes 0 the further you scroll down the page, the sticky image will eventually reach the bottom of the container.
    let imgcalc = imgcontProp.bottom - imgProp.bottom

    //Declaring the value "x" as an array.
    var x = []
    //Selecting all classes with the value of ".universal-color".
    var x = document.querySelectorAll(".universal-color");
    //Declaring the value "cont" as an array
    var cont = []
    //The "cont" array will store getBoundingClientRect() for each class that is found in the HTML document.
    for (let i = 0; i < x.length; i++) {
        cont.push(x[i].getBoundingClientRect());
    }
    //Finds the mid point between each section (the center width of the white gaps ".whitespace").
    if (cont[2].top + ((cont[2].bottom - cont[2].top)/2) - vh*4  < 0) {
        for (let i = 0; i < x.length; i++) {
            //The following colour will be applied to any x value that passes through this loop
            x[i].style.backgroundColor = "#FF6600";
        }
        //The title will be set to the following only if the if statement criteria is fulfilled
        document.getElementById('t1').innerHTML = "CONTACT"
    } else if (cont[2].top + ((cont[2].bottom - cont[2].top)/2) - vh*20 < 0) {
        for (let i = 0; i < x.length; i++) {
            //The following colour will be applied to any x value that passes through this loop
            x[i].style.backgroundColor = "#FF6600";
    }
        //The title will be set to the following only if the if statement criteria is fulfilled
        document.getElementById('t1').innerHTML = "PROJECTS"
    } else if ((cont[1].bottom - vh*25) < 0) {
        for (let i = 0; i < x.length; i++) {
            //The following colour will be applied to any x value that passes through this loop
            x[i].style.backgroundColor = "#AD3CF5";
        }
        //The title will be set to the following only if the if statement criteria is fulfilled
        document.getElementById('t1').innerHTML = "PROJECTS"
    } else if (cont[1].top - ((cont[1].top - cont[0].bottom) / 2) < 0) {
        for (let i = 0; i < x.length; i++) {
            //The following colour will be applied to any x value that passes through this loop
            x[i].style.backgroundColor = "#FF6600";
        }
        //The title will be set to the following only if the if statement criteria is fulfilled
        document.getElementById('t1').innerHTML = "SKILLS";
    } else if (imgcalc < vh * 5) {
        for (let i = 0; i < x.length; i++) {
            //The following colour will be applied to any x value that passes through this loop
            x[i].style.backgroundColor = "#ED2939";
        }
        //The title will be set to the following only if the if statement criteria is fulfilled
        document.getElementById('t1').innerHTML = "ABOUT ME";
    } else if (imgcalc > 10) {
        for (let i = 0; i < x.length; i++) {
            //The following colour will be applied to any x value that passes through this loop
            x[i].style.backgroundColor = "#FF0000";
        }
        //The title will be set to the following only if the if statement criteria is fulfilled
        document.getElementById('t1').innerHTML = "PORTFOLIO";
    }
}

document.addEventListener('wheel', function() {

});

window.addEventListener("resize", function() {

})