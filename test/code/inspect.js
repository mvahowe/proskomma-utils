const test = require('tape');
const fs = require('fs-extra');
const path = require('path');
const { inspectEnum } = require("../../src/schema/inspect_succinct");

const testGroup = "Inspect";

test(
    `enum (${testGroup})`,
    async function (t) {
        try {
            const serialized = fs.readJsonSync(path.resolve(__dirname, "../test_data/serialize_example.json"));
            t.plan(Object.keys(serialized.enums).length);
            for (const enumString of Object.values(serialized.enums)) {
                const inspected = inspectEnum(enumString);
                t.ok(inspected);
            }
        } catch (err) {
            console.log(err)
        }
    }
);