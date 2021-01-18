const enumStringIndex = (enumSuccinct, str) => {
    let pos = 0;
    let count = 0;
    while (pos < enumSuccinct.length) {
        const stringLength = enumSuccinct.byte(pos);
        const enumString = enumSuccinct.countedString(pos);
        if (enumString === str) {
            return count;
        }
        pos += (stringLength + 1);
        count += 1;
    }
    return -1;
}

module.exports = {
    enumStringIndex
}