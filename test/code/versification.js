const test = require('tape');
const fse = require('fs-extra');
const path = require('path');

const { vrs2json, reverseVersification } = require("../../src/lib/versification");

const testGroup = 'Versification';

test(
    `vrs2json (${testGroup})`,
    function (t) {
        try {
            t.plan(1);
            const vrsString = fse.readFileSync(path.resolve(__dirname, '../test_data/versification.vrs')).toString();
            const vrsJson = vrs2json(vrsString);
            // console.log(JSON.stringify(vrsJson));
            t.ok(Object.keys(vrsJson.mappedVerses).length > 0);
        } catch (err) {
            console.log(err);
        }
    },
);

test(
    `reverseVersification (${testGroup})`,
    function (t) {
        try {
            const vrsString = fse.readFileSync(path.resolve(__dirname, '../test_data/versification.vrs')).toString();
            const vrsJson = vrs2json(vrsString);
            const vrsJsonLength = Object.keys(vrsJson.mappedVerses).length;
            t.plan(2 * vrsJsonLength);
            // console.log(JSON.stringify(vrsJson, null, 2));
            const reversed = reverseVersification(vrsJson);
            // console.log(JSON.stringify(reversed, null, 2));
            for (const [key, value] of (Object.entries(vrsJson.mappedVerses))) {
                t.ok(value in reversed.reverseMappedVerses);
                t.ok(reversed.reverseMappedVerses[vrsJson.mappedVerses[key]].includes(key));
            }
        } catch (err) {
            console.log(err);
        }
    },
);
