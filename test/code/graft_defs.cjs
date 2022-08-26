const test = require('tape');
const { graftLocation } = require("../../src/lib/graft_defs");

const testGroup = "Graft Defs";

test(
    `Get an Id (${testGroup})`,
    async function (t) {
        try {
            t.plan(1);
            t.equal(graftLocation["footnote"], "inline");
        } catch (err) {
            console.log(err)
        }
    }
);
