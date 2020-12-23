const ByteArray = require("../lib/byte_array");
const { headerBytes, enumIndexes, succinctGraftName, succinctGraftSeqId, succinctScopeLabel, succinctTokenChars, unpackEnum } = require('../lib/succinct');
const { itemEnumLabels } = require('../lib/item_defs');
const { tokenEnumLabels } = require('../lib/token_defs');
const { scopeEnumLabels } = require('../lib/scope_defs');

const inspectEnum = enumString => {
    const ba = new ByteArray();
    ba.fromBase64(enumString);
    const ret = [];
    ret.push(`* Char length ${ba.length} *`);
    for (const [count, text] of unpackEnum(ba, true)) {
        ret.push(`${count}\t"${text}"`);
    }
    return ret.join("\n");
}

const inspectSuccinct = (succinct, enumStrings) => {
    const ba = new ByteArray();
    ba.fromBase64(succinct);
    const enums = {};
    for (const [category, enumString] of Object.entries(enumStrings)) {
        enums[category] = new ByteArray();
        enums[category].fromBase64(enumString);
    }
    const indexes = enumIndexes(enums);
    const ret = [];
    ret.push(`* Char length ${ba.length} *`);
    let pos = 0;
    while (pos < ba.length) {
        const [itemLength, itemType, itemSubtype] = headerBytes(ba, pos);
        let subtypeLabel = itemSubtype;
        let extra = "";
        switch (itemEnumLabels[itemType]) {
            case "token":
                subtypeLabel = tokenEnumLabels[itemSubtype];
                extra = `"${succinctTokenChars(enums, indexes, ba, itemSubtype, pos)}"`;
                break;
            case "startScope":
            case "endScope":
                subtypeLabel = scopeEnumLabels[itemSubtype];
                extra = succinctScopeLabel(enums, indexes, ba, itemSubtype, pos);
                break;
            case "graft":
                subtypeLabel = succinctGraftName(enums, indexes, itemSubtype);
                extra = succinctGraftSeqId(enums, indexes, ba, pos);
        }
        ret.push(`${itemEnumLabels[itemType]}\t${subtypeLabel}\t(${itemLength})\t${extra}`);
        pos += itemLength;
    }
    return ret.join("\n");
}

module.exports = { inspectEnum, inspectSuccinct };
