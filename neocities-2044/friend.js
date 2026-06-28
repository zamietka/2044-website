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
    friendcontainer.src = "images/animacjawake2.gif";
    catAwake = 1;
    setTimeout(() => {
    friendcontainer.src ="images/animacjaidle.gif"
  }, 1200);
    
})

//menu
friendcontainer.addEventListener('contextmenu', (e) => {
    contextmenuon = true;
    e.preventDefault(); 
    friendmenu.style.display = 'inline';
    friendmenu.style.left = `${friendcontainer.offsetLeft - 30}px`;
    friendmenu.style.top = `${friendcontainer.offsetTop}px`;
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
friendcontainer.addEventListener('mousedown', (e) => {
    if(e.button == 0) {
        contextmenuon = false;
        friendmenu.style.display = 'none';
        friendcontainer.style.transition = '';
        if (catAwake === 1){ 
        friendcontainer.src ="images/animacjadangle.gif"
        isMouseDown = true;
        friendcontainer.style.pointerEvents = 'none';
        friendcontainer.style.left = `${e.clientX - 30}px`;
        friendcontainer.style.top = `${e.clientY + 10}px`;
        x = e.clientX - friendcontainer.offsetLeft;
        y = e.clientY - friendcontainer.offsetTop;
        }
}
});

flex.addEventListener('mousemove', (e) => {
    
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

flex.addEventListener('mouseup', () => {
    isMouseDown = false;
    friendcontainer.style.pointerEvents = 'auto';
    if (ghostHover === i && catAwake === 1){
    friendcontainer.style.top = `${ghostDivs.offsetTop - friendcontainer.offsetHeight + ghostDivs.offsetHeight}px`;
    }
    //else if (ghostHover === 0 && catAwake === 1) {
    //    friendcontainer.style.top = `${flex.offsetHeight - friendcontainer.offsetHeight}px`;
    //}
    if (catAwake === 1) {
    friendcontainer.style.transition = 'top 0.5s ease';
    setTimeout(() => {
    friendcontainer.style.transition = '';
    }, 500);
    friendcontainer.src ="images/animacjaidle.gif"
}
});
}

function pet() {
    catAwake = 0;
    friendcontainer.src ="images/animacja-pet.gif"
    setTimeout(() => {
    catAwake = 1;
    friendcontainer.src ="images/animacjaidle.gif"
  }, 2500);
}

//losowe lewo prawo
function randomActions () {
    friendcontainer.style.transition = '';
    const random = Math.floor(Math.random() * 3);
    const randomstep = Math.floor(Math.random() * 7 + 1);
    const delay = Math.floor(Math.random() * 3000) + 2000;

    setTimeout(() => {

        if (isMouseDown) {
            return randomActions(); 
        }

        if (catAwake !== 1) {
            return randomActions();
        }

        if (random === 1) {
            lastdirection = "right";
            friendcontainer.style.transform = 'scale(-1, 1)';
            friendcontainer.src ="images/animacja-LEFT.gif";
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
            friendcontainer.style.transform = 'scale(1, 1)';
            friendcontainer.src ="images/animacja-LEFT.gif";
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
                    friendcontainer.src ="images/animacjaidle.gif"
                    friendcontainer.style.transform = 'scale(-1, 1)';
                    console.log(lastdirection);
                }
                if (lastdirection === "left") {
                    friendcontainer.src ="images/animacjaidle.gif"
                    friendcontainer.style.transform = 'scale(1, 1)';
                    console.log(lastdirection);
                }    
            }
            randomActions();
        }, randomstep * 500);

    }, delay);
}