const xre = require('xregexp');

const vrs2json = vrsString => {
    const ret = {};

    for (
        const vrsLineBits of
        vrsString
            .split(/[\n\r]+/)
            .map(l => l.trim())
            .map(l => xre.exec(l, xre("^([A-Z1-6]{3} [0-9]+:[0-9]+(-[0-9]+)?) = ([A-Z1-6]{3} [0-9]+:[0-9]+[a-z]?(-[0-9]+)?)$")))
        ) {
        if (!vrsLineBits) {
            continue;
        }
        if (vrsLineBits[1] in ret) {
        }
        ret[vrsLineBits[1]] = vrsLineBits[3];
    }
    return {mappedVerses: ret};
}

const reverseVersification = vrsJson => {
    // Assumes each verse is only mapped once
    const ret = {};
    for (const [fromSpec, toSpec] of Object.entries(vrsJson.mappedVerses)) {
        toSpec in ret ? ret[toSpec].push(fromSpec): ret[toSpec] = [fromSpec];
    }
    return {reverseMappedVerses: ret};
}

module.exports = {vrs2json, reverseVersification};
