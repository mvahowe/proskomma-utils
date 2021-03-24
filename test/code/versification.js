const test = require('tape');
const fse = require('fs-extra');
const path = require('path');

const {
    vrs2json,
    reverseVersification,
    preSuccinctVerseMapping,
    succinctifyVerseMappings,
    unsuccinctifyVerseMapping,
    bookCodeIndex,
} = require("../../src/lib/versification");

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
            t.plan(18);
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
            t.ok(preSuccinct['S3Y']['1'][0][2][0].includes('DAG'))
            const reversed = reverseVersification(vrsJson);
            const preSuccinctReversed = preSuccinctVerseMapping(reversed.reverseMappedVerses);
            preSuccinctBooks = ['GEN', 'LEV', 'PSA', 'ACT', 'DAG'];
            t.equal(Object.keys(preSuccinctReversed).length, preSuccinctBooks.length);
            for (const book of preSuccinctBooks) {
                t.ok(book in preSuccinctReversed);
            }
            t.ok('5' in preSuccinctReversed['LEV']);
            t.ok('6' in preSuccinctReversed['LEV']);
            t.ok(preSuccinctReversed['DAG']['3'][0][2][0].includes('S3Y'))
            // console.log(JSON.stringify(preSuccinctReversed, null, 2));
        } catch (err) {
            console.log(err);
        }
    },
);

test(
    `succinctifyVerseMappings (${testGroup})`,
    function (t) {
        try {
            t.plan(16);
            const vrsString = fse.readFileSync(path.resolve(__dirname, '../test_data/truncated_versification.vrs')).toString();
            const vrsJson = vrs2json(vrsString);
            const succinct = succinctifyVerseMappings(vrsJson.mappedVerses);
            let succinctBooks = ['GEN', 'LEV', 'PSA', 'ACT', 'S3Y'];
            t.equal(Object.keys(succinct).length, succinctBooks.length);
            for (const book of succinctBooks) {
                t.ok(book in succinct);
            }
            t.ok('31' in succinct['GEN']);
            t.ok('32' in succinct['GEN']);
            const succinctReversed = succinctifyVerseMappings(reverseVersification(vrsJson).reverseMappedVerses);
            succinctBooks = ['GEN', 'LEV', 'PSA', 'ACT', 'DAG'];
            t.equal(Object.keys(succinctReversed).length, succinctBooks.length);
            for (const book of succinctBooks) {
                t.ok(book in succinctReversed);
            }
            t.ok('5' in succinctReversed['LEV']);
            t.ok('6' in succinctReversed['LEV']);
            // console.log(JSON.stringify(succinct, null, 2));
        } catch (err) {
            console.log(err);
        }
    },
);

test(
    `unsuccinctify forward (${testGroup})`,
    function (t) {
        try {
            t.plan(18);
            const vrsString = fse.readFileSync(path.resolve(__dirname, '../test_data/truncated_versification.vrs')).toString();
            const vrsJson = vrs2json(vrsString);
            const svm = succinctifyVerseMappings(vrsJson.mappedVerses);
            const unsuccinctS3Y = unsuccinctifyVerseMapping(svm['S3Y']['1'], 'S3Y', bookCodeIndex());
            t.equal(unsuccinctS3Y[0].fromVerseStart, 1);
            t.equal(unsuccinctS3Y[0].fromVerseEnd, 29);
            t.equal(unsuccinctS3Y[0].bookCode, 'DAG');
            t.equal(unsuccinctS3Y[0].mapping[0].ch, 3);
            t.equal(unsuccinctS3Y[0].mapping[0].verseStart, 24);
            t.equal(unsuccinctS3Y[0].mapping[0].verseEnd, 52);
            const unsuccinctACT = unsuccinctifyVerseMapping(svm['ACT']['19'], 'ACT', bookCodeIndex());
            // console.log(JSON.stringify(unsuccinctACT, null, 2));
            t.equal(unsuccinctACT[0].fromVerseStart, 40);
            t.equal(unsuccinctACT[0].fromVerseEnd, 40);
            t.equal(unsuccinctACT[0].bookCode, 'ACT');
            t.equal(unsuccinctACT[0].mapping[0].ch, 19);
            t.equal(unsuccinctACT[0].mapping[0].verseStart, 40);
            t.equal(unsuccinctACT[0].mapping[0].verseEnd, 40);
            t.equal(unsuccinctACT[1].fromVerseStart, 41);
            t.equal(unsuccinctACT[1].fromVerseEnd, 41);
            t.equal(unsuccinctACT[1].bookCode, 'ACT');
            t.equal(unsuccinctACT[1].mapping[0].ch, 19);
            t.equal(unsuccinctACT[1].mapping[0].verseStart, 40);
            t.equal(unsuccinctACT[1].mapping[0].verseEnd, 40);
        } catch (err) {
            console.log(err);
        }
    },
);

test(
    `unsuccinctify reverse (${testGroup})`,
    function (t) {
        try {
            t.plan(15);
            const vrsString = fse.readFileSync(path.resolve(__dirname, '../test_data/truncated_versification.vrs')).toString();
            const vrsJson = vrs2json(vrsString);
            const reversedJson = reverseVersification(vrsJson);
            const svm = succinctifyVerseMappings(reversedJson.reverseMappedVerses);
            const unsuccinctDAG = unsuccinctifyVerseMapping(svm['DAG']['3'], 'DAG', bookCodeIndex());
            t.equal(unsuccinctDAG[0].fromVerseStart, 24);
            t.equal(unsuccinctDAG[0].fromVerseEnd, 52);
            t.equal(unsuccinctDAG[0].bookCode, 'S3Y');
            t.equal(unsuccinctDAG[0].mapping[0].ch, 1);
            t.equal(unsuccinctDAG[0].mapping[0].verseStart, 1);
            t.equal(unsuccinctDAG[0].mapping[0].verseEnd, 29);
            const unsuccinctACT = unsuccinctifyVerseMapping(svm['ACT']['19'], 'ACT', bookCodeIndex());
            t.equal(unsuccinctACT[0].fromVerseStart, 40);
            t.equal(unsuccinctACT[0].fromVerseEnd, 40);
            t.equal(unsuccinctACT[0].bookCode, 'ACT');
            t.equal(unsuccinctACT[0].mapping[0].ch, 19);
            t.equal(unsuccinctACT[0].mapping[0].verseStart, 40);
            t.equal(unsuccinctACT[0].mapping[0].verseEnd, 40);
            t.equal(unsuccinctACT[0].mapping[1].ch, 19);
            t.equal(unsuccinctACT[0].mapping[1].verseStart, 41);
            t.equal(unsuccinctACT[0].mapping[1].verseEnd, 41);
        } catch (err) {
            console.log(err);
        }
    },
);
