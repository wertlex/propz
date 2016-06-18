/**
 * Created by wert on 07.05.16.
 */

'use strict';

const   chai        = require('chai'),
        dotten      = require('../../src/apal');

const expect = chai.expect;

describe('apal', () => {
    it('should get value with "get"', () => {
        const obj = {
            one: {
                two: {
                    three: {
                        name: 'John'
                    },
                    array1: [ 1, 2, 3],
                    array2: [
                        {id: 123},
                        {id: 234}
                    ]
                }
            }
        };

        expect(dotten.get(obj, ['one', 'two', 'three'])).to.be.deep.equal({ name: "John" });
        expect(dotten.get(obj, ['one', 'two', 'three', 'name'])).to.be.equal("John");
        expect(dotten.get(obj, ['one', 'two', 'array1', 0])).to.be.equal(1);
        expect(dotten.get(obj, ['one', 'two', 'array2', 0, "id"])).to.be.equal(123);
        expect(dotten.get(obj, ['six', 'two', 'array2', 0, "id"])).to.be.undefined;
    });

    it('should return defaultValue with "get"', () => {
        const obj = {
            one: {
                two: {
                    three: {
                        name: 'John'
                    }
                }
            }
        };

        expect(dotten.get(obj, ['one1'])).to.be.undefined;
		expect(dotten.get(obj, ['one1'], "DEFAULT")).to.be.equal('DEFAULT');
		expect(dotten.get(obj, ['one', 'two2'], "DEFAULT")).to.be.equal('DEFAULT');
		expect(dotten.get(obj, ['one', 'two', 'tres'], "DEFAULT")).to.be.equal('DEFAULT');
    });

    it('should get closest value with "getClosest"', () => {
        const obj = {
            one: {
                two: {
                    three: {
                        name: 'John'
                    }
                }
            }
        };

        expect(dotten.getClosest(obj, ['one', 'two', 'three'])).to.be.deep.equal({name: 'John'});
        expect(dotten.getClosest(obj, ['one', 'two', 'three', 'name'])).to.be.equal('John');
        expect(dotten.getClosest(obj, ['one', 'two', 'three', 'name', 'details'])).to.be.equal('John');
        expect(dotten.getClosest(obj, ['uno', 'two', 'three', 'name', 'details'])).to.be.undefined;
    });

    it('should set not nested values with "set"', () => {
        const obj = {};
        dotten.set(obj, ['A'], 'a');
        dotten.set(obj, ['B'], 'b');
        dotten.set(obj, ['whatthehell'], 'really?');
        expect(obj).to.be.deep.equal({
            A: 'a',
            B: 'b',
            whatthehell: 'really?'
        });
    });

    it('should set nested values with "set"', () => {
        const obj = {};
        dotten.set(obj, ['A', 'B'], 'ab');
        dotten.set(obj, ['One', 'Two'], '12');
        dotten.set(obj, ['A', 'C'], 'ac');
        dotten.set(obj, ['whatthehell'], 'really?');
        expect(obj).to.be.deep.equal({
            A: {
                B: 'ab',
                C: 'ac'
            },
            One: {
                Two: '12'
            },
            whatthehell: 'really?'
        });
    });

    it('should set nested values in arrays with "set"', () => {
        const obj = {};
        dotten.set(obj, ['A', 'B'], 'ab');
        dotten.set(obj, ['One', 'Two'], '12');
        dotten.set(obj, ['A', 'C'], 'ac');
        dotten.set(obj, ['A', 'arr1', 0], '1st');
        dotten.set(obj, ['A', 'arr1', 1], '2nd');
        dotten.set(obj, ['arr2', 0], 'one');
        dotten.set(obj, ['arr2', 1, 'name'], 'John');
        dotten.set(obj, ['whatthehell'], 'really?');
        expect(obj).to.be.deep.equal({
            A: {
                B: 'ab',
                C: 'ac',
                arr1: [
                    '1st', '2nd'
                ]
            },
            arr2: [ 'one', { name: 'John' }],
            One: {
                Two: '12'
            },
            whatthehell: 'really?'
        });
    });
});