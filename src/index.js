import serializedSchema from './schema/proskomma_serialized_0_2.json';
import { inspectEnum } from './schema/inspect_succinct';
import {
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
} from './lib/succinct';
import ByteArray from './lib/byte_array';
import { ptBooks, ptBookArray } from './lib/canons';
import {generateId} from './lib/generate_id';
import {graftLocation} from './lib/graft_defs';
import {
    itemEnum,
    itemEnumLabels,
    itemArray2Object,
    itemObject2Array,
    itemArrays2Objects,
    itemObjects2Arrays,
} from './lib/item_defs';
import { scopeEnum, scopeEnumLabels, labelForScope, nComponentsForScope } from "./lib/scope_defs";
import {validateTags, validateTag, addTag, removeTag} from './lib/tags';
import { tokenEnum, tokenEnumLabels, tokenCategory } from './lib/token_defs';
import { enumStringIndex, enumRegexIndexTuples } from './lib/enums';
import {
    vrs2json,
    reverseVersification,
    preSuccinctVerseMapping,
    succinctifyVerseMapping,
    succinctifyVerseMappings,
    unsuccinctifyVerseMapping,
    mapVerse,
} from './lib/versification';
import {
    aghast2items,
    aghast2string,
    items2aghast,
    string2aghast,
} from './lib/aghast';
import parserConstants from './lib/parser_constant_defs';

export {
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
    ptBookArray,
    ptBooks,
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
