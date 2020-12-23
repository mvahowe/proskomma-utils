const test = require('tape');
const fs = require('fs-extra');
const path = require('path');
const ByteArray = require("../../src/lib/byte_array");
const { unpackEnum } = require("../../src/lib/succinct");
const { inspectEnum, inspectSuccinct } = require("../../src/schema/inspect_succinct");

const testGroup = "Inspect";

const serialized = fs.readJsonSync(path.resolve(__dirname, "../test_data/serialize_example.json"));

test(
    `enum array (${testGroup})`,
    async function (t) {
        try {
            t.plan(Object.keys(serialized.enums).length);
            for (const enumString of Object.values(serialized.enums)) {
                const ba = new ByteArray();
                ba.fromBase64(enumString);
                const enumArray = unpackEnum(ba);
                t.ok(enumArray);
            }
        } catch (err) {
            console.log(err)
        }
    }
);

test(
    `enum entries (${testGroup})`,
    async function (t) {
        try {
            t.plan(Object.keys(serialized.enums).length);
            for (const [category, enumString] of Object.entries(serialized.enums)) {
                const inspected = inspectEnum(enumString);
                // console.log("***", category, "***");
                // console.log(inspected);
                t.ok(inspected);
            }
        } catch (err) {
            console.log(err)
        }
    }
);

test(
    `succinct (${testGroup})`,
    async function (t) {
        try {
            t.plan(10);
            const doc = Object.values(serialized.docs)[0];
            const mainSequence = doc.sequences[doc.mainId];
            for (const block of mainSequence.blocks) {
                for (const [category, succinct] of Object.entries(block)) {
                    const inspected = inspectSuccinct(succinct, serialized.enums);
                    // console.log("***", category, "***");
                    // console.log(inspected);
                    t.ok(inspected);
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
);