const test = require('tape');
const fse = require('fs-extra');
const path = require('path');

const { vrs2json } = require("../../src/lib/versification");

const testGroup = 'Versification';

test(
    `vrs2json (${testGroup})`,
    function (t) {
        try {
            t.plan(1);
            const vrsString = fse.readFileSync(path.resolve(__dirname, '../test_data/versification.vrs')).toString();
            const vrsJson = vrs2json(vrsString);
            // console.log(JSON.stringify(vrsJson));
            t.ok(Object.keys(vrsJson).length > 0);
        } catch (err) {
            console.log(err);
        }
    },
);
