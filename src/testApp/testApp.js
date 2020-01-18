const inputLogEl = document.querySelector('.log');

const sendLog = value => {
    console.log(value);
};

inputLogEl.addEventListener('keydown', e => {
    if (e.keyCode === 13 && e.target.value) {
        sendLog(e.target.value);
        e.target.value = '';
    }
});
