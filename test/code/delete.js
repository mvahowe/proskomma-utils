const test = require('tape');

const ByteArray = require('../../src/lib/byte_array');
const { pushSuccinctTokenBytes, pushSuccinctGraftBytes, pushSuccinctScopeBytes } = require('../../src/lib/succinct');

const testGroup = 'Delete';

test(
    `Item (${testGroup})`,
    function (t) {
        try {
            t.plan(4);
            const ba = new ByteArray(1);
            pushSuccinctTokenBytes(ba, 1, 299);
            pushSuccinctGraftBytes(ba, 10, 143);
            pushSuccinctScopeBytes(ba, 3, 2, [567]);
            const firstLength = ba.byte(0) & 0x0000003F;
            const secondLength = ba.byte(firstLength) & 0x0000003F;
            const thirdLength = ba.byte(firstLength + secondLength) & 0x0000003F;
            t.equal(firstLength + secondLength + thirdLength, ba.length);
            ba.deleteItem(firstLength);
            const newFirstLength = ba.byte(0) & 0x0000003F;
            const newSecondLength = ba.byte(newFirstLength) & 0x0000003F;
            t.equal(firstLength, newFirstLength);
            t.equal(thirdLength, newSecondLength);
            t.equal(newFirstLength + newSecondLength, ba.length);
        } catch (err) {
            console.log(err);
        }
    },
);
