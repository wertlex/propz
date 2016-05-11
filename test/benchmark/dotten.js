/**
 * Created by wert on 11.05.16.
 */

const   Benchmark       = require('benchmark'),
        dotten          = require('../../src/dotten');

const input = {
    _id:         "572604ba5e3cac390e764464",
    email:      "reference@mail.com",
    firstName:  "Petr",
    lastName:   "Pustota",
    verification:   {
        status: { email:false, sms:false, identity: { city: "NY"}}
    },
    blocked: false
};

const json = new Benchmark.Suite('');
json
    .add('direct access 1st level', () => {
        input['firstName']
    })
    .add('dotten.get 1st level', () => {
        dotten.get(input, ['firstName']);
    })
    .add('dotten.get 2nd level', () => {
        dotten.get(input, ['verification', 'status']);
    })
    .add('dotten.get 3rd level', () => {
        dotten.get(input, ['verification', 'status', 'email']);
    })
    .add('dotten.get 4th level', () => {
        dotten.get(input, ['verification', 'status', 'identity', 'city']);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ async: false });