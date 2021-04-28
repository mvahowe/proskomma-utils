const test = require('tape');
const fs = require('fs-extra');
const path = require('path');
const deepEqual = require('deep-equal');

const {
    items2aghast,
    aghast2string,
    aghast2items,
    string2aghast,
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
        } catch (err) {
            console.log(err);
        }
    },
);

test(
    `string2aghast (${testGroup})`,
    function (t) {
        try {
            t.plan(1);
            const agh = items2aghast(testItems);
            const aString = aghast2string(agh);
            const agh2 = string2aghast(aString);
            t.ok(agh2.length > 0);
        } catch (err) {
            console.log(err);
        }
    },
);

test(
    `round trip (${testGroup})`,
    function (t) {
        try {
            t.plan(2);
            const agh = items2aghast(testItems);
            const aString = aghast2string(agh);
            const agh2 = string2aghast(aString);
            const items2 = aghast2items(agh2);
            t.ok(deepEqual(agh, agh2));
            t.ok(deepEqual(testItems, items2));
            for (let n=0; n < testItems.length && n < items2.length; n++) {
                if (!deepEqual(testItems[n], items2[n])) {
                    console.log(testItems[n], items2[n]);
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
);
