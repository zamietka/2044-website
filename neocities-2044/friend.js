const friendcontainer = document.querySelector('#friendcontainer');
const page = document.querySelector('#page');
let isMouseDown = false;


friendcontainer.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    x = e.clientX - friendcontainer.offsetLeft;
    y = e.clientY - friendcontainer.offsetTop;
});

page.addEventListener('mousemove', (e) => {
    fall = e.clientY - y
    if (isMouseDown) {
        friendcontainer.style.left = `${e.clientX - x}px`;
        friendcontainer.style.top = `${fall}px`;
    }
});

page.addEventListener('mouseup', () => {
    isMouseDown = false;
    friendcontainer.style.top = `${page.offsetHeight - friendcontainer.offsetHeight}px`;
    friendcontainer.style.transition = 'top 0.5s ease';
    setTimeout(() => {
    friendcontainer.style.transition = '';
  }, 500);

});
    