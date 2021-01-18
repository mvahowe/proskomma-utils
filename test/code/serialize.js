const test = require('tape');
const fs = require('fs-extra')
const path = require('path');
const Validator = require('jsonschema').Validator;

const serializedSchema = require(path.resolve(__dirname, '../../src/schema/proskomma_serialized_0_2.json'));

const testGroup = "Validate Schema";

test(
    `Validate valid document (${testGroup})`,
    async function (t) {
        try {
            t.plan(2);
            const serialized = fs.readJsonSync(path.resolve(__dirname, "../test_data/serialize_example.json"));
            t.ok(serialized);
            const validationReport = new Validator().validate(serialized, serializedSchema);
            t.equal(validationReport.errors.length, 0);
        } catch (err) {
            console.log(err)
        }
    }
);
