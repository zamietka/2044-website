const friendcontainer = document.querySelector('#friendcontainer');
const main = document.querySelector('#main')
const page = document.querySelector('#page');
const page2 = document.querySelector('#page2');
let isMouseDown = false;
pageHover = 0;



page.addEventListener('mouseover', () => {
    pageHover = 1
});
page2.addEventListener('mouseover', () => {
    pageHover = 2
});

page.addEventListener('mouseout', () => {
    pageHover = 0
});
page2.addEventListener('mouseout', () => {
    pageHover = 0
});

friendcontainer.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    friendcontainer.style.pointerEvents = 'none';
    x = e.clientX - friendcontainer.offsetLeft;
    y = e.clientY - friendcontainer.offsetTop;
});

main.addEventListener('mousemove', (e) => {
    fall = e.clientY - y
    if (isMouseDown) {
        friendcontainer.style.left = `${e.clientX - x}px`;
        friendcontainer.style.top = `${fall}px`;
    }
});

main.addEventListener('mouseup', () => {
    isMouseDown = false;
    friendcontainer.style.pointerEvents = 'auto';
    if (pageHover === 2){
    friendcontainer.style.top = `${page2.offsetTop - friendcontainer.offsetHeight + page2.offsetHeight}px`;
    }
    else if (pageHover === 1) {
        friendcontainer.style.top = `${page.offsetTop - friendcontainer.offsetHeight + page.offsetHeight}px`;
    }
    else if (pageHover === 0) {
        friendcontainer.style.top = `${main.offsetHeight - friendcontainer.offsetHeight}px`;
    }
    friendcontainer.style.transition = 'top 0.5s ease';
    setTimeout(() => {
    friendcontainer.style.transition = '';
  }, 500);

});


    

