class InvalidUrlError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidUrlError";        
    }
}

class UnknownShortUrlError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnknownShortUrlError";        
    }
}

module.exports = {
    InvalidUrlError,
    UnknownShortUrlError
}