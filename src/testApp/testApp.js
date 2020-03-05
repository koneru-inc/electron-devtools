const inputLogEl = document.querySelector('.log');

console.log('sdgsdhg');

const sendLog = value => {
    console.log(value);
    console.warn(value);
    console.error(value);
};

inputLogEl.addEventListener('keydown', e => {
    if (e.keyCode === 13 && e.target.value) {
        sendLog(e.target.value);
        e.target.value = '';
    }
});
