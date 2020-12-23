const test = require('tape');
const fs = require('fs-extra');
const path = require('path');
const { inspectEnum, inspectSuccinct } = require("../../src/schema/inspect_succinct");

const testGroup = "Inspect";

test(
    `enum (${testGroup})`,
    async function (t) {
        try {
            const serialized = fs.readJsonSync(path.resolve(__dirname, "../test_data/serialize_example.json"));
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
            const serialized = fs.readJsonSync(path.resolve(__dirname, "../test_data/serialize_example.json"));
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