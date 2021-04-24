const items2aghast = items => {
    const ret = [];
    let indent = 0;
    let tokenPayloads = [];
    const maybePushTokens = () => {
        if (tokenPayloads.length > 0) {
            ret.push([
                indent,
                'tokens',
                tokenPayloads
                    .join('')
                    .replace(/\s+/g, ' ')
            ]);
            tokenPayloads = [];
        }
    }
    for (const item of items) {
        switch (item.type) {
            case 'token':
                tokenPayloads.push(item.payload);
                break;
            case 'scope':
                maybePushTokens();
                const scopeBits = item.payload.split('/');
                if (item.subType === 'start') {
                    if (['chapter', 'verses'].includes(scopeBits[0])) {
                        ret.push([indent, scopeBits[0], scopeBits[1]]);
                    } else if (scopeBits[0] === 'span') {
                        ret.push([indent, 'charTag', scopeBits[1]]);
                        indent++;
                    }
                } else {   // end
                    if (scopeBits[0] === 'span') {
                        indent = Math.max(indent - 1, 0);
                    }
                }
                break;
            case 'graft':
                maybePushTokens();
                ret.push([indent, 'graft', item.subType, item.payload]);
                break;
            default:
                break;
        }
    }
    maybePushTokens();
    return ret;
};

const aghast2items = aghast => {
    const ret = [];
    let indent = 0;
    const stack = [];
    let chapter = "";
    let verses = "";
    for (const a of aghast) {
        // check for decreased indent
        switch (a[1]) {
            case 'chapter':
                if (chapter !== '') {
                    ret.push({
                        type: 'scope',
                        subType: 'end',
                        payload: `chapter/${chapter}`
                    });
                }
                chapter = a[2];
                ret.push({
                    type: 'scope',
                    subType: 'start',
                    payload: `chapter/${chapter}`
                });
                break;
        }
    }
    if (chapter !== '') {
        ret.push({
            type: 'scope',
            subType: 'end',
            payload: `chapter/${chapter}`
        });
    }
    return ret;
};

const aghast2string = aghast => {
    const quoteString = str => `'${str.replace(/'/g, '\\\'')}'`;
    const ret = [];
    for (const a of aghast) {
        switch (a[1]) {
            case 'tokens':
                ret.push(`${' '.repeat(a[0] * 4)}${quoteString(a[2])}`);
                break;
            case 'chapter':
                ret.push(`${' '.repeat(a[0] * 4)}<c ${a[2]}>`);
                break;
            case 'verses':
                ret.push(`${' '.repeat(a[0] * 4)}<v ${a[2]}>`);
                break;
            case 'charTag':
                ret.push(`${' '.repeat(a[0] * 4)}<${a[2]}>`);
                break;
            case 'graft':
                ret.push(`${' '.repeat(a[0] * 4)}=> ${a[2]} (${a[3]})`);
                break;
            default:
                throw new Error(`Unexpected aghast element '${a[1]}'`);
        }
    }
    return ret.join('\n');
};

const string2aghast = str => [];

module.exports = {
    aghast2items,
    aghast2string,
    items2aghast,
    string2aghast,
}