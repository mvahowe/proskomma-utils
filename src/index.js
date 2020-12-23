const serializedSchema = require('./schema/proskomma_serialized_0_2.json');
const { inspectEnum, headerBytes } = require('./schema/inspect_succinct');
const ByteArray = require('./lib/byte_array');
const {generateId} = require('./lib/generate_id');
const {graftLocation} = require('./lib/graft_defs');
const { itemEnum, itemEnumLabels } = require('./lib/item_defs');
const { scopeEnum, scopeEnumLabels, labelForScope, nComponentsForScope } = require("./lib/scope_defs");
const {validateTags, validateTag, addTag} = require('./lib/tags');
const { tokenEnum, tokenEnumLabels, tokenCategory } = require('./lib/token_defs');

module.exports = {
    addTag,
    ByteArray,
    generateId,
    graftLocation,
    headerBytes,
    inspectEnum,
    itemEnum,
    itemEnumLabels,
    labelForScope,
    nComponentsForScope,
    scopeEnum,
    scopeEnumLabels,
    serializedSchema,
    tokenCategory,
    tokenEnum,
    tokenEnumLabels,
    validateTag,
    validateTags
};
