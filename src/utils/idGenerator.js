const { idGenerator: idGeneratorConfig } = require('../config');

const CHARACTERS_LENGTH = idGeneratorConfig.characters.length;

function generateShortUrlId() {
    let result = '';
    for (let i = 0; i < idGeneratorConfig.idLength; i++) {
        result += idGeneratorConfig.characters.charAt(Math.floor(Math.random() * CHARACTERS_LENGTH));
    }
    return result;
}

module.exports = {
    generateShortUrlId
};