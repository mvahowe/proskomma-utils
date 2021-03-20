const xre = require('xregexp');

const vrs2json = vrsString => {
    const ret = {};

    for (
        const vrsLineBits of
        vrsString
            .split(/[\n\r]+/)
            .map(l => l.trim())
            .map(l => xre.exec(l, xre("^([A-Z1-6]{3} [0-9]+:[0-9]+(-[0-9]+)) = ([A-Z1-6]{3} [0-9]+:[0-9]+(-[0-9]+))$")))
        ) {
        if (!vrsLineBits) {
            continue;
        }
        ret[vrsLineBits[1]] = vrsLineBits[3];
    }
    return {mappedVerses: ret};
}

module.exports = { vrs2json };
