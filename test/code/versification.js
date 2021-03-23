const test = require('tape');
const fse = require('fs-extra');
const path = require('path');

const { vrs2json, reverseVersification, preSuccinctVerseMapping } = require("../../src/lib/versification");

const testGroup = 'Versification';

test(
    `vrs2json (${testGroup})`,
    function (t) {
        try {
            t.plan(1);
            const vrsString = fse.readFileSync(path.resolve(__dirname, '../test_data/truncated_versification.vrs')).toString();
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
            const vrsString = fse.readFileSync(path.resolve(__dirname, '../test_data/truncated_versification.vrs')).toString();
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

test(
    `preSuccinctVerseMapping (${testGroup})`,
    function (t) {
        try {
            t.plan(16);
            const vrsString = fse.readFileSync(path.resolve(__dirname, '../test_data/truncated_versification.vrs')).toString();
            const vrsJson = vrs2json(vrsString);
            const preSuccinct = preSuccinctVerseMapping(vrsJson.mappedVerses);
            let preSuccinctBooks = ['GEN', 'LEV', 'PSA', 'ACT', 'S3Y'];
            t.equal(Object.keys(preSuccinct).length, preSuccinctBooks.length);
            for (const book of preSuccinctBooks) {
                t.ok(book in preSuccinct);
            }
            t.ok('31' in preSuccinct['GEN']);
            t.ok('32' in preSuccinct['GEN']);
            const reversed = reverseVersification(vrsJson);
            const preSuccinctReversed = preSuccinctVerseMapping(reversed.reverseMappedVerses);
            preSuccinctBooks = ['GEN', 'LEV', 'PSA', 'ACT', 'DAG'];
            t.equal(Object.keys(preSuccinctReversed).length, preSuccinctBooks.length);
            for (const book of preSuccinctBooks) {
                t.ok(book in preSuccinctReversed);
            }
            t.ok('5' in preSuccinctReversed['LEV']);
            t.ok('6' in preSuccinctReversed['LEV']);
            // console.log(JSON.stringify(preSuccinctReversed, null, 2));
        } catch (err) {
            console.log(err);
        }
    },
);

