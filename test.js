/**
 * Created by ktran on 24.03.14.
 */
var kexcel = require('./');

var fs = require('fs');
var Q = require('q');

Q.nfcall( kexcel.open, 'export.xlsx')
    .then(function(kexcel){
        try{
            var newsheet = kexcel.duplicateSheet(kexcel.sheets[0],'testduplicate');
            newsheet.replaceRow(12,{A12:'bla2'});
            kexcel.sheets[0].replaceRow(12, {A12: 'bla'});
            var output = fs.createWriteStream(__dirname + '/tester.xlsx');
            kexcel.pipe(output,function(){
                console.log('done!');
            });
        }catch(e){
            console.log(e.stack);
        }
    });