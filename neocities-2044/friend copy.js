const friendcontainer = document.querySelector('#friendcontainer');
const friendimg = document.querySelector('#friendimg');
const friendcontext = document.querySelector('#friendcontext');
const friendmenu = document.querySelector('#friendmenu');
const flex = document.querySelector('#flex')
let lastdirection = '';
let isMouseDown = false;
ghostHover = 0;
catAwake = 0;

randomActions () 

friendmenu.style.display = 'none';

//wakeup
friendcontainer.addEventListener('click', () => {
    friendimg.src = "images/animacjawake2.gif";
    catAwake = 1;
    setTimeout(() => {
    friendimg.src ="images/animacjaidle.gif"
  }, 1200);
  friendcontext.style.display = 'none';
})

//menu
friendcontainer.addEventListener('contextmenu', (e) => {
    contextmenuon = true;
    e.preventDefault(); 
    friendmenu.style.display = 'inline';
})

//disable menu
document.addEventListener('mousedown', (e) => {
    if (contextmenuon === true) {
    setTimeout(() => {
        contextmenuon = false;
        friendmenu.style.display = 'none';
        }, 400);
    }
    });

//dangle
friendimg.addEventListener('mousedown', (e) => {
    contextmenuon = false;
    dangleon = true;
    friendmenu.style.display = 'none';
    if (e.button !== 0) return;
    friendcontainer.style.transition = '';
    if (catAwake === 1){ 
        friendimg.src ="images/animacjadangle.gif"
        isMouseDown = true;
        friendcontainer.style.pointerEvents = 'none';
        friendcontainer.style.left = `${e.clientX - 30}px`;
        friendcontainer.style.top = `${e.clientY + 10}px`;
        x = e.clientX - friendcontainer.offsetLeft;
        y = e.clientY - friendcontainer.offsetTop;
    }
});


document.addEventListener('mousemove', (e) => {
    
    if (isMouseDown) {
        friendcontainer.style.left = `${e.clientX - 30}px`;
        friendcontainer.style.top = `${e.clientY + 10}px`;
    }
});

//divy
const ghostDivsA = [];
for (let i = 1; i <= 4; i++) {
  const ghostDivs = document.querySelector(`#ghostdiv${i}`);
  ghostDivsA.push(ghostDivs);

  ghostDivs.addEventListener('mouseover', () => {
    ghostHover = i;
  });
  ghostDivs.addEventListener('mouseout', () => {
    ghostHover = 0
});


    
document.addEventListener('mouseup', (e) => {
    isMouseDown = false;
    friendcontainer.style.pointerEvents = 'auto';
    if (ghostHover === i && catAwake === 1){
        friendcontainer.style.top = `${ghostDivs.offsetTop - friendcontainer.offsetHeight + ghostDivs.offsetHeight}px`;
    }
    // else if (ghostHover === 0 && catAwake === 1 && e.button !== 2) {
    //     friendcontainer.style.top = `${flex.offsetHeight - friendcontainer.offsetHeight}px`;
    // }
    if (catAwake === 1 && dangleon === true) {
        friendcontainer.style.transition = 'top 0.5s ease';
        setTimeout(() => {
        friendcontainer.style.transition = '';
        }, 500);
        friendimg.src ="images/animacjaidle.gif"
    }
});
}

function pet() {
    alert('wee');
    friendimg.src ="images/animacjawake.gif"
}

//losowe lewo prawo
function randomActions () {
    dangleon = false;
    friendcontainer.style.transition = '';
    const random = Math.floor(Math.random() * 3);
    const randomstep = Math.floor(Math.random() * 7 + 1);
    const delay = Math.floor(Math.random() * 3000) + 2000;

    setTimeout(() => {

        if (isMouseDown || catAwake !== 1 || contextmenuon) {
            return randomActions(); 
        }

        if (random === 1) {
            lastdirection = "right";
            friendimg.style.transform = 'scale(-1, 1)';
            friendimg.src ="images/animacja-LEFT.gif";
            for (let step = 0; step < randomstep; step++) {
                setTimeout(() => {
                    if (isMouseDown === false) {
                        friendcontainer.style.left = `${friendcontainer.offsetLeft + 50}px`;
                        friendcontainer.style.transition = 'left 0.5s ease';
                    }
                }, step * 500);
            }
            
        }

        if (random === 2) {
            lastdirection = "left";
            friendimg.style.transform = 'scale(1, 1)';
            friendimg.src ="images/animacja-LEFT.gif";
            for (let step = 0; step < randomstep; step++) {
                setTimeout(() => {
                    if (isMouseDown === false) {
                        friendcontainer.style.left = `${friendcontainer.offsetLeft - 50}px`;
                        friendcontainer.style.transition = 'left 0.5s ease';
                    }
                }, step * 500);
            }
            
        }

        setTimeout(() => {
            if (isMouseDown === false) {
                if (lastdirection === "right") {
                    friendimg.src ="images/animacjaidle.gif"
                    friendimg.style.transform = 'scale(-1, 1)';
                    console.log(lastdirection);
                }
                if (lastdirection === "left") {
                    friendimg.src ="images/animacjaidle.gif"
                    friendimg.style.transform = 'scale(1, 1)';
                    console.log(lastdirection);
                }    
            }
            randomActions();
        }, randomstep * 500);

    }, delay);
}
