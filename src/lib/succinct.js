const { tokenCategory, tokenEnumLabels } = require('./token_defs');
const { scopeEnumLabels, nComponentsForScope } = require("./scope_defs");

const headerBytes = (succinct, pos) =>{
    const headerByte = succinct.byte(pos);
    const itemType = headerByte >> 6;
    const itemLength = headerByte & 0x0000003F;
    const itemSubtype = succinct.byte(pos + 1);
    return [itemLength, itemType, itemSubtype];
}

const succinctTokenChars = (enums, enumIndexes, succinct, itemSubtype, pos) => {
    const itemCategory = tokenCategory[tokenEnumLabels[itemSubtype]];
    const itemIndex = enumIndexes[itemCategory][succinct.nByte(pos + 2)];
    return enums[itemCategory].countedString(itemIndex);
}

const succinctScopeLabel = (enums, enumIndexes, succinct, itemSubtype, pos) => {
    const scopeType = scopeEnumLabels[itemSubtype];
    let nScopeBits = nComponentsForScope(scopeType);
    let offset = 2;
    let scopeBits = '';

    while (nScopeBits > 1) {
        const itemIndexIndex = succinct.nByte(pos + offset);
        const itemIndex = enumIndexes.scopeBits[itemIndexIndex];
        const scopeBitString = enums.scopeBits.countedString(itemIndex);
        scopeBits += `/${scopeBitString}`;
        offset += succinct.nByteLength(itemIndexIndex);
        nScopeBits--;
    }
    return `${scopeType}${scopeBits}`;
}

const succinctGraftName = (enums, enumIndexes, itemSubtype) => {
    const graftIndex = enumIndexes.graftTypes[itemSubtype];
    return enums.graftTypes.countedString(graftIndex);
}

const succinctGraftSeqId = (enums, enumIndexes, succinct, pos) => {
    const seqIndex = this.enumIndexes.ids[succinct.nByte(pos + 2)];
    return enums.ids.countedString(seqIndex);
}

module.exports = { headerBytes, succinctTokenChars, succinctScopeLabel, succinctGraftName, succinctGraftSeqId };
