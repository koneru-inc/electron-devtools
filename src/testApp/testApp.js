const inputLogEl = document.querySelector('.log');

console.log('sdgdeshges');

const sendLog = value => {
    console.log(value);
};
console.trace(sendLog);
inputLogEl.addEventListener('keydown', e => {
    if (e.keyCode === 13 && e.target.value) {
        sendLog(e.target.value);
        e.target.value = '';
    }
});
