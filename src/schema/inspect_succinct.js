const ByteArray = require("../lib/byte_array");

const inspectEnum = enumString => {
    const ba = new ByteArray();
    ba.fromBase64(enumString);
    const ret = [];
    ret.push(`Char length\t${ba.length}`);
    let pos = 0;
    let count = 0;
    while (pos < ba.length) {
        const stringLength = ba.byte(pos);
        ret.push(`${count}\t(${stringLength})\t"${ba.countedString(pos)}"`);
        pos += stringLength + 1;
        count++;
    }
    return ret.join("\n");
}

const headerBytes = (succinct, pos) =>{
    const headerByte = succinct.byte(pos);
    const itemType = headerByte >> 6;
    const itemLength = headerByte & 0x0000003F;
    const itemSubtype = succinct.byte(pos + 1);
    return [itemLength, itemType, itemSubtype];
}

module.exports = { inspectEnum, headerBytes };