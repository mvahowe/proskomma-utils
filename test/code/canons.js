const test = require('tape');
const { ptBooks, ptBookArray } = require("../../src/lib/canons");

const testGroup = "Generate ID";

test(
    `Get an Id (${testGroup})`,
    async function (t) {
        try {
            t.plan(ptBookArray.length * 2);
            console.log(ptBookArray);
            for (const ptBook of ptBookArray) {
                t.ok(ptBook.code in ptBooks);
                t.equal(ptBook.code, ptBooks[ptBook.code].code);
            }
        } catch (err) {
            console.log(err)
        }
    }
);
