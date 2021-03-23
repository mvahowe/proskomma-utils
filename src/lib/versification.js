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
    // Assumes each verse is only mapped from once
    const ret = {};
    for (const [fromSpec, toSpec] of Object.entries(vrsJson.mappedVerses)) {
        toSpec in ret ? ret[toSpec].push(fromSpec): ret[toSpec] = [fromSpec];
    }
    return {reverseMappedVerses: ret};
}

const preSuccinctVerseMapping = mappingJson => {
    const ret = {};
    for (let [fromSpec, toSpecs] of Object.entries(mappingJson)) {
        if (typeof toSpecs === 'string') {
            toSpecs = [toSpecs];
        }
        const [fromBook, fromCVV] = fromSpec.split(' ');
        const toBook = toSpecs[0].split(' ')[0];
        const record = toBook === fromBook ? ["cv"] : ["bcv"];
        let [fromCh, fromV] = fromCVV.split(':');
        let toV = fromV;
        if (fromV.includes('-')) {
            const vBits = fromV.split('-');
            fromV = vBits[0];
            toV = vBits[1];
        }
        record.push([fromV, toV]);
        record.push([]);

        for (const toCVV of toSpecs.map(ts => ts.split(' ')[1])) {
            let [toCh, fromV] = toCVV.split(':');
            let toV = fromV;
            if (fromV.includes('-')) {
                const vBits = fromV.split('-');
                fromV = vBits[0];
                toV = vBits[1];
            }
            if (record[0] === 'cv') {
                record[2].push([toCh, fromV, toV]);
            } else {
                record[2].push([toBook, toCh, fromV, toV]);
            }
        }
        if (!(fromBook in ret)) {
            ret[fromBook] = {};
        }
        if (!(fromCh in ret[fromBook])) {
            ret[fromBook][fromCh] = [];
        }
        ret[fromBook][fromCh].push(record);
    }
    return ret;
}

module.exports = {vrs2json, reverseVersification, preSuccinctVerseMapping};
