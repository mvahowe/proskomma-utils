const test = require('tape');
const fs = require('fs-extra');
const path = require('path');

const {
    items2aghast,
    aghast2string,
    aghast2items,
} = require('../../src/lib/aghast');

const testItems = fs.readJsonSync(path.resolve(__dirname, "../test_data/web_rut_items.json"));

const testGroup = 'Aghast';

test(
    `items2aghast (${testGroup})`,
    function (t) {
        try {
            t.plan(1);
            const agh = items2aghast(testItems);
            t.ok(agh.length > 0);
            // console.log(agh);
        } catch (err) {
            console.log(err);
        }
    },
);

test(
    `aghast2items (${testGroup})`,
    function (t) {
        try {
            t.plan(1);
            const agh = items2aghast(testItems);
            const aItems = aghast2items(agh);
            t.ok(aItems.length > 0);
            // console.log(JSON.stringify(aItems, null, 2));
        } catch (err) {
            console.log(err);
        }
    },
);

test(
    `aghast2string (${testGroup})`,
    function (t) {
        try {
            t.plan(1);
            const agh = items2aghast(testItems);
            const aString = aghast2string(agh);
            t.ok(aString.length > 0);
            // console.log(aString);
        } catch (err) {
            console.log(err);
        }
    },
);
