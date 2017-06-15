/**
 * Created by wert on 07.05.16.
 */

'use strict';

const   chai        = require('chai'),
        propz      = require('../../src/propz');

const expect = chai.expect;

describe('propz', () => {
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

        expect(propz.get(obj, ['one', 'two', 'three'])).to.be.deep.equal({ name: "John" });
        expect(propz.get(obj, ['one', 'two', 'three', 'name'])).to.be.equal("John");
        expect(propz.get(obj, ['one', 'two', 'array1', 0])).to.be.equal(1);
        expect(propz.get(obj, ['one', 'two', 'array2', 0, "id"])).to.be.equal(123);
        expect(propz.get(obj, ['six', 'two', 'array2', 0, "id"])).to.be.undefined;
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

        expect(propz.get(obj, ['one1'])).to.be.undefined;
		expect(propz.get(obj, ['one1'], "DEFAULT")).to.be.equal('DEFAULT');
		expect(propz.get(obj, ['one', 'two2'], "DEFAULT")).to.be.equal('DEFAULT');
		expect(propz.get(obj, ['one', 'two', 'tres'], "DEFAULT")).to.be.equal('DEFAULT');
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

        expect(propz.getClosest(obj, ['one', 'two', 'three'])).to.be.deep.equal({name: 'John'});
        expect(propz.getClosest(obj, ['one', 'two', 'three', 'name'])).to.be.equal('John');
        expect(propz.getClosest(obj, ['one', 'two', 'three', 'name', 'details'])).to.be.equal('John');
        expect(propz.getClosest(obj, ['uno', 'two', 'three', 'name', 'details'])).to.be.undefined;
    });

    it('should set not nested values with "set"', () => {
        const obj = {};
        propz.set(obj, ['A'], 'a');
        propz.set(obj, ['B'], 'b');
        propz.set(obj, ['whatthehell'], 'really?');
        expect(obj).to.be.deep.equal({
            A: 'a',
            B: 'b',
            whatthehell: 'really?'
        });
    });

    it('should set nested values with "set"', () => {
        const obj = {};
        propz.set(obj, ['A', 'B'], 'ab');
        propz.set(obj, ['One', 'Two'], '12');
        propz.set(obj, ['A', 'C'], 'ac');
        propz.set(obj, ['whatthehell'], 'really?');
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
        propz.set(obj, ['A', 'B'], 'ab');
        propz.set(obj, ['One', 'Two'], '12');
        propz.set(obj, ['A', 'C'], 'ac');
        propz.set(obj, ['A', 'arr1', 0], '1st');
        propz.set(obj, ['A', 'arr1', 1], '2nd');
        propz.set(obj, ['arr2', 0], 'one');
        propz.set(obj, ['arr2', 1, 'name'], 'John');
        propz.set(obj, ['whatthehell'], 'really?');
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

    it('should get all paths for plain object with getDeepKeys', () => {
        const obj = {
            one: 'one',
            two: 'two'
        };

        const result = propz.getDeepKeys(obj);
        expect(result).to.be.deep.equal([['one'], ['two']]);
    });

	it('should get int paths for plain array with getDeepKeys', () => {
		const arrObj = ['a', 'b', 'c'];

		const result = propz.getDeepKeys(arrObj);
		expect(result).to.be.deep.equal([
			[0],
			[1],
			[2]
		]);
	});

    it('should get all paths for nested object with getDeepKeys', () => {
		const obj = {
			one: 'one',
			two: 'two',
			nested: {
				three:	3,
				four:	'four'
			},
			simpleArr: [1, 2],
			complexArr: [
				{ a: '1' }
			]
		};

		const result = propz.getDeepKeys(obj);
		expect(result).to.be.deep.equal([
			['one'],
			['two'],
			['nested', 'three'],
			['nested', 'four'],
			['simpleArr', 0],
			['simpleArr', 1],
			['complexArr', 0, 'a']
		]);
	});
});