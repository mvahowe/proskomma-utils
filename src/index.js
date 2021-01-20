const serializedSchema = require('./schema/proskomma_serialized_0_2.json');
const { inspectEnum } = require('./schema/inspect_succinct');
const {
    headerBytes,
    pushSuccinctTokenBytes,
    pushSuccinctGraftBytes,
    pushSuccinctScopeBytes,
    succinctTokenChars,
    succinctScopeLabel,
    succinctGraftName,
    succinctGraftSeqId,
    enumIndexes,
    unpackEnum
} = require('./lib/succinct');
const ByteArray = require('./lib/byte_array');
const {generateId} = require('./lib/generate_id');
const {graftLocation} = require('./lib/graft_defs');
const { itemEnum, itemEnumLabels } = require('./lib/item_defs');
const { scopeEnum, scopeEnumLabels, labelForScope, nComponentsForScope } = require("./lib/scope_defs");
const {validateTags, validateTag, addTag, removeTag} = require('./lib/tags');
const { tokenEnum, tokenEnumLabels, tokenCategory } = require('./lib/token_defs');
const { enumStringIndex } = require('./lib/enums');

module.exports = {
    addTag,
    ByteArray,
    enumIndexes,
    enumStringIndex,
    generateId,
    graftLocation,
    headerBytes,
    inspectEnum,
    itemEnum,
    itemEnumLabels,
    labelForScope,
    nComponentsForScope,
    pushSuccinctTokenBytes,
    pushSuccinctGraftBytes,
    pushSuccinctScopeBytes,
    removeTag,
    scopeEnum,
    scopeEnumLabels,
    serializedSchema,
    succinctTokenChars,
    succinctScopeLabel,
    succinctGraftName,
    succinctGraftSeqId,
    tokenCategory,
    tokenEnum,
    tokenEnumLabels,
    unpackEnum,
    validateTag,
    validateTags
};
