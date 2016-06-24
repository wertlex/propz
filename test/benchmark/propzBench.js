/**
 * Created by wert on 11.05.16.
 */

const   Benchmark       = require('benchmark'),
        propz          	= require('../../src/propz'),
        dotty			= require('dotty');

const input = {
    _id:       	"572604ba5e3cac390e764464",
    email:      "reference@mail.com",
    firstName:  "Petr",
    lastName:   "Pustota",
    verification:   {
        status: { email:false, sms:false, identity: { city: "NY"}}
    },
    blocked: false
};

const jsonGet = new Benchmark.Suite('');
jsonGet
    .add('direct access 1st level', () => {
        input['firstName'];
    })
    .add('propz.get 1st level', () => {
        propz.get(input, ['firstName']);
    })
	.add('dotty.get 1st level', () => {
		dotty.get(input, ['firstName']);
	})
    .add('propz.get 2nd level', () => {
        propz.get(input, ['verification', 'status']);
    })
	.add('dotty.get 2nd level', () => {
		dotty.get(input, ['verification', 'status']);
	})
    .add('propz.get 3rd level', () => {
        propz.get(input, ['verification', 'status', 'email']);
    })
	.add('dotty.get 3rd level', () => {
		dotty.get(input, ['verification', 'status', 'email']);
	})
    .add('propz.get 4th level', () => {
        propz.get(input, ['verification', 'status', 'identity', 'city']);
    })
	.add('dotty.get 4th level', () => {
		dotty.get(input, ['verification', 'status', 'identity', 'city']);
	})
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ async: false });


const jsonSet = new Benchmark.Suite('JsonSet');
jsonSet
    .add('direct set', () => {
        input['firstName'] = "John";
    })
    .add('propz.set 1st level', () => {
        propz.set(input, ['firstName'], 'John');
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ async: false });