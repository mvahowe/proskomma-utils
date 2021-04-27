const xre = require('xregexp');

const printableRegexes = [
    ['wordLike', xre('([\\p{Letter}\\p{Number}\\p{Mark}\\u2060]{1,127})')],
    ['lineSpace', xre('([\\p{Separator}]{1,127})')],
    ['punctuation', xre('([\\p{Punctuation}+®])')],
];
const mainRegex = xre.union(printableRegexes.map(pr => pr[1]));


const openChapter = (ret, ch) => {
    ret.push({
        type: 'scope',
        subType: 'start',
        payload: `chapter/${ch}`
    });
}

const closeChapter = (ret, ch) => {
    ret.push({
        type: 'scope',
        subType: 'end',
        payload: `chapter/${ch}`
    });
}

const numbersFromVerseRange = vr => {
    if (vr.includes('-')) {
        const [fromV, toV] = vr.split('-').map(v => parseInt(v));
        return Array.from(Array((toV - fromV) + 1).keys()).map(v => v + fromV);
    } else {
        return [parseInt(vr)];
    }
}

const openVerseRange = (ret, vr) => {
    numbersFromVerseRange(vr).forEach(
        v => ret.push({
            type: 'scope',
            subType: 'start',
            payload: `verse/${v}`
        }),
    );
    ret.push({
        type: 'scope',
        subType: 'start',
        payload: `verses/${vr}`
    });
}

const closeVerseRange = (ret, vr) => {
    ret.push({
        type: 'scope',
        subType: 'end',
        payload: `verses/${vr}`
    });
    numbersFromVerseRange(vr).forEach(
        v => ret.push({
            type: 'scope',
            subType: 'end',
            payload: `verse/${v}`
        }),
    );
}

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
    let indents = [];
    const indented = [];
    let chapter = "";
    let verses = "";
    for (const [n, a] of aghast.entries()) {
        // If more indented than indents, require new indent, else no new indent
        const previousIndent = indents[0] || 0;
        if (indented.length > indents.length) {
            if (a[0] <= previousIndent) {
                throw new Error(`Required indent not found at line ${n}`);
            }
            indents.unshift(a[0]);
        } else {
            if (a[0] > previousIndent) {
                throw new Error(`Unexpected indent at line ${n}`);
            }
        }
        // check for decreased indent
        if (a[0] < previousIndent) {
            let done = false;
            while (!done && indented.length > 0) {
                indents.shift();
                const closingIndented = indented.shift();
                ret.push({
                    type: 'scope',
                    subType: 'end',
                    payload: `span/${closingIndented}`
                });
                if ((indents[0] || 0) === a[0]) {
                    done = true;
                }
            }
        }
        switch (a[1]) {
            case 'chapter':
                if (chapter !== '') {
                    if (verses !== '') {
                        closeVerseRange(ret, verses);
                        verses = '';
                    }
                    closeChapter(ret, chapter);
                }
                chapter = a[2];
                openChapter(ret, chapter);
                verses = "";
                break;
            case 'verses':
                if (verses !== '') {
                    closeVerseRange(ret, verses);
                }
                verses = a[2];
                openVerseRange(ret, verses);
                break;
            case 'graft':
                ret.push({
                    type: 'graft',
                    subType: a[2],
                    payload: a[3],
                });
                break;
            case 'tokens':
                const tokenArray = xre.match(a[2], mainRegex, 'all');
                for (const token of tokenArray) {
                    for (const [tSubtype, tRegex] of printableRegexes) {
                        if (xre.test(token, tRegex, 0, true)) {
                            ret.push({
                                type: 'token',
                                subType: tSubtype,
                                payload: token,
                            });
                            break;
                        }
                    }
                }
                break;
            case 'charTag':
                ret.push({
                    type: 'scope',
                    subType: 'start',
                    payload: `span/${a[2]}`
                });
                indented.unshift(a[2]);
                break;
        }
    }
    while (indented.length > 0) {
        indents.shift();
        const closingIndented = indented.shift();
        ret.push({
            type: 'scope',
            subType: 'end',
            payload: `span/${closingIndented}`
        });
    }
    if (verses !== '') {
        closeVerseRange(ret, verses);
    }
    if (chapter !== '') {
        closeChapter(ret, chapter);
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