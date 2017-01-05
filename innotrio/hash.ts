//@flow
/**
 * Created by g.konnov on 04.01.2017.
 */
let crypto = require('crypto');

module.exports = class Hash {
    static getSha256(value: string): string {
        return crypto.createHash('sha256').update(value).digest('hex');
    }
};