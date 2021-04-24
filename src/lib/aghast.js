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

const aghast2items = aghast => [];

const aghast2string = aghast => "";

const string2aghast = str => [];

module.exports = {
    aghast2items,
    aghast2string,
    items2aghast,
    string2aghast,
}