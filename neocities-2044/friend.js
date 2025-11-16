const friendcontainer = document.querySelector('#friendcontainer');
const flex = document.querySelector('#flex')
const ghostdiv1 = document.querySelector('#ghostdiv1');
const ghostdiv2 = document.querySelector('#ghostdiv2');
let isMouseDown = false;
ghostHover = 0;
catAwake = 0;

randomActions () 


ghostdiv1.addEventListener('mouseover', () => {
    ghostHover = 1
});
ghostdiv2.addEventListener('mouseover', () => {
    ghostHover = 2
});

ghostdiv1.addEventListener('mouseout', () => {
    ghostHover = 0
});
ghostdiv2.addEventListener('mouseout', () => {
    ghostHover = 0
});

friendcontainer.addEventListener('click', () => {
    friendcontainer.src = "images/animacjawake2.gif";
    catAwake = 1;
    setTimeout(() => {
    friendcontainer.src ="images/animacjaidle.gif"
  }, 1200);
    
})


friendcontainer.addEventListener('mousedown', (e) => {
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
});

flex.addEventListener('mousemove', (e) => {
    
    if (isMouseDown) {
        friendcontainer.style.left = `${e.clientX - 30}px`;
        friendcontainer.style.top = `${e.clientY + 10}px`;
    }
});

flex.addEventListener('mouseup', () => {
    isMouseDown = false;
    friendcontainer.style.pointerEvents = 'auto';
    if (ghostHover === 2){
    friendcontainer.style.top = `${ghostdiv2.offsetTop - friendcontainer.offsetHeight + ghostdiv2.offsetHeight}px`;
    }
    else if (ghostHover === 1) {
        friendcontainer.style.top = `${ghostdiv1.offsetTop - friendcontainer.offsetHeight + ghostdiv1.offsetHeight}px`;
    }
    else if (ghostHover === 0 && catAwake === 1) {
        friendcontainer.style.top = `${flex.offsetHeight - friendcontainer.offsetHeight}px`;
    }
    friendcontainer.style.transition = 'top 0.5s ease';
    setTimeout(() => {
    friendcontainer.style.transition = '';
    }, 500);
    friendcontainer.src ="images/animacjaidle.gif"

});
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
            friendcontainer.src ="images/animacja-right.gif";
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
                friendcontainer.src ="images/animacjaidle.gif";
            }
            randomActions();
        }, randomstep * 500);

    }, delay);
}


