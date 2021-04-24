const test = require('tape');
const fs = require('fs-extra');
const path = require('path');

const { items2aghast } = require('../../src/lib/aghast');

const testItems = fs.readJsonSync(path.resolve(__dirname, "../test_data/web_rut_items.json"));

const testGroup = 'Aghast';

test(
    `items2aghast (${testGroup})`,
    function (t) {
        try {
            t.plan(1);
            const agh = items2aghast(testItems);
            t.ok(agh.length > 0);
            console.log(agh);
        } catch (err) {
            console.log(err);
        }
    },
);
