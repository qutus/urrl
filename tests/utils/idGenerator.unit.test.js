describe('idGenerator', () => {
    describe('with default config', () => {
        it('should return a 6 length id(GMSYfl) with mocked specific values Math.random function', () => {
            jest.resetModules();
            const { generateShortUrlId } = require('../../src/utils/idGenerator');
    
            jest.spyOn(global.Math, 'random')
                .mockReturnValueOnce(0.1)
                .mockReturnValueOnce(0.2)
                .mockReturnValueOnce(0.3)
                .mockReturnValueOnce(0.4)
                .mockReturnValueOnce(0.5)
                .mockReturnValueOnce(0.6);
    
            expect(generateShortUrlId(6)).toEqual("GMSYfl");
    
            jest.spyOn(global.Math, 'random').mockRestore();
        });
    
        it('should return a 6 length id(GNUbio) with mocked specific values Math.random function', () => {
            jest.resetModules();
            const { generateShortUrlId } = require('../../src/utils/idGenerator');
    
            jest.spyOn(global.Math, 'random')
                .mockReturnValueOnce(0.11)
                .mockReturnValueOnce(0.22)
                .mockReturnValueOnce(0.33)
                .mockReturnValueOnce(0.44)
                .mockReturnValueOnce(0.55)
                .mockReturnValueOnce(0.66);
    
            expect(generateShortUrlId(6)).toEqual("GNUbio");
    
            jest.spyOn(global.Math, 'random').mockRestore();
        });
    
        it('should return a 6 length id(NUbGoi) with mocked specific values Math.random function', () => {
            jest.resetModules();
            const { generateShortUrlId } = require('../../src/utils/idGenerator');
    
            jest.spyOn(global.Math, 'random')
                .mockReturnValueOnce(0.22)
                .mockReturnValueOnce(0.33)
                .mockReturnValueOnce(0.44)
                .mockReturnValueOnce(0.11)
                .mockReturnValueOnce(0.66)
                .mockReturnValueOnce(0.55);
    
            expect(generateShortUrlId(6)).toEqual("NUbGoi");
    
            jest.spyOn(global.Math, 'random').mockRestore();
        });
    });

    describe('with mocked id length', () => {
        it('should return a 2 length id(NU) with mocked specific values Math.random function', () => {
            jest.resetModules();
            jest.mock('../../src/config', () => ({ 
                idGenerator: { 
                    ...jest.requireActual('../../src/config').idGenerator, 
                    idLength: 2 
                }
            }));
            const { generateShortUrlId } = require('../../src/utils/idGenerator');
    
            jest.spyOn(global.Math, 'random')
                .mockReturnValueOnce(0.22)
                .mockReturnValueOnce(0.33);
    
            expect(generateShortUrlId(2)).toEqual("NU");
    
            jest.spyOn(global.Math, 'random').mockRestore();
        });
    
        it('should return a 10 length id(Ni9n9Ni9n9) with mocked specific values Math.random function', () => {
            jest.resetModules();
            jest.mock('../../src/config', () => ({ 
                idGenerator: { 
                    ...jest.requireActual('../../src/config').idGenerator, 
                    idLength: 10 
                }
            }));
            const { generateShortUrlId } = require('../../src/utils/idGenerator');
    
            jest.spyOn(global.Math, 'random')
                .mockReturnValueOnce(0.22)
                .mockReturnValueOnce(0.56)
                .mockReturnValueOnce(0.987)
                .mockReturnValueOnce(0.64)
                .mockReturnValueOnce(0.987)
                .mockReturnValueOnce(0.22)
                .mockReturnValueOnce(0.56)
                .mockReturnValueOnce(0.987)
                .mockReturnValueOnce(0.64)
                .mockReturnValueOnce(0.987);
    
            expect(generateShortUrlId(10)).toEqual("Ni9n9Ni9n9");
    
            jest.spyOn(global.Math, 'random').mockRestore();
        });
    });

    describe('with mocked characters', () => {
        it('should return a 6 length id(abacac) with mocked specific values Math.random function', () => {
            jest.resetModules();
            jest.mock('../../src/config', () => ({ 
                idGenerator: { 
                    ...jest.requireActual('../../src/config').idGenerator, 
                    characters: "abcd"
                }
            }));
            const { generateShortUrlId } = require('../../src/utils/idGenerator');
    
            jest.spyOn(global.Math, 'random')
                .mockReturnValueOnce(0.22)
                .mockReturnValueOnce(0.33)
                .mockReturnValueOnce(0.12)
                .mockReturnValueOnce(0.63)
                .mockReturnValueOnce(0.22)
                .mockReturnValueOnce(0.73);
    
            expect(generateShortUrlId(2)).toEqual("abacac");
    
            jest.spyOn(global.Math, 'random').mockRestore();
        });

        it('should return a 6 length id(221#2%) with mocked specific values Math.random function', () => {
            jest.resetModules();
            jest.mock('../../src/config', () => ({ 
                idGenerator: { 
                    ...jest.requireActual('../../src/config').idGenerator, 
                    characters: "123#%€"
                }
            }));
            const { generateShortUrlId } = require('../../src/utils/idGenerator');
    
            jest.spyOn(global.Math, 'random')
                .mockReturnValueOnce(0.22)
                .mockReturnValueOnce(0.33)
                .mockReturnValueOnce(0.12)
                .mockReturnValueOnce(0.63)
                .mockReturnValueOnce(0.22)
                .mockReturnValueOnce(0.73);
    
            expect(generateShortUrlId(2)).toEqual("221#2%");
    
            jest.spyOn(global.Math, 'random').mockRestore();
        });
    });
});