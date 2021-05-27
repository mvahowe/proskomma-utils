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
const {
    itemEnum,
    itemEnumLabels,
    itemArray2Object,
    itemObject2Array,
    itemArrays2Objects,
    itemObjects2Arrays,
} = require('./lib/item_defs');
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
const {
    aghast2items,
    aghast2string,
    items2aghast,
    string2aghast,
} = require('./lib/aghast');
const parserConstants = require('./lib/parser_constant_defs');

module.exports = {
    addTag,
    aghast2items,
    aghast2string,
    ByteArray,
    enumIndex,
    enumIndexes,
    enumRegexIndexTuples,
    enumStringIndex,
    generateId,
    graftLocation,
    headerBytes,
    inspectEnum,
    itemArray2Object,
    itemArrays2Objects,
    itemObject2Array,
    itemObjects2Arrays,
    itemEnum,
    itemEnumLabels,
    items2aghast,
    labelForScope,
    mapVerse,
    nComponentsForScope,
    parserConstants,
    preSuccinctVerseMapping,
    pushSuccinctTokenBytes,
    pushSuccinctGraftBytes,
    pushSuccinctScopeBytes,
    removeTag,
    reverseVersification,
    scopeEnum,
    scopeEnumLabels,
    serializedSchema,
    string2aghast,
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
