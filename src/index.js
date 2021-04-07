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
    enumIndex,
    unpackEnum
} = require('./lib/succinct');
const ByteArray = require('./lib/byte_array');
const {generateId} = require('./lib/generate_id');
const {graftLocation} = require('./lib/graft_defs');
const { itemEnum, itemEnumLabels } = require('./lib/item_defs');
const { scopeEnum, scopeEnumLabels, labelForScope, nComponentsForScope } = require("./lib/scope_defs");
const {validateTags, validateTag, addTag, removeTag} = require('./lib/tags');
const { tokenEnum, tokenEnumLabels, tokenCategory } = require('./lib/token_defs');
const { enumStringIndex, enumRegexIndexTuples } = require('./lib/enums');
const {
    vrs2json,
    reverseVersification,
    preSuccinctVerseMapping,
    succinctifyVerseMapping,
    succinctifyVerseMappings,
    unsuccinctifyVerseMapping,
    mapVerse,
} = require('./lib/versification');

module.exports = {
    addTag,
    ByteArray,
    enumIndex,
    enumIndexes,
    enumRegexIndexTuples,
    enumStringIndex,
    generateId,
    graftLocation,
    headerBytes,
    inspectEnum,
    itemEnum,
    itemEnumLabels,
    labelForScope,
    mapVerse,
    nComponentsForScope,
    preSuccinctVerseMapping,
    pushSuccinctTokenBytes,
    pushSuccinctGraftBytes,
    pushSuccinctScopeBytes,
    removeTag,
    reverseVersification,
    scopeEnum,
    scopeEnumLabels,
    serializedSchema,
    succinctTokenChars,
    succinctScopeLabel,
    succinctGraftName,
    succinctGraftSeqId,
    succinctifyVerseMapping,
    succinctifyVerseMappings,
    tokenCategory,
    tokenEnum,
    tokenEnumLabels,
    unpackEnum,
    unsuccinctifyVerseMapping,
    validateTag,
    validateTags,
    vrs2json,
};
