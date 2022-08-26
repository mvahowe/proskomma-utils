const test = require('tape');
const { generateId } = require("../../src/lib/generate_id");

const testGroup = "Generate ID";

test(
    `Get an Id (${testGroup})`,
    async function (t) {
        try {
            t.plan(1);
            const id = generateId();
            t.equal(id.length, 12);
        } catch (err) {
            console.log(err)
        }
    }
);
