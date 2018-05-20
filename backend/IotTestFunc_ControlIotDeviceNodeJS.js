
console.log('Loading function');
var aws = require('aws-sdk');
 
var endpoint  = 'a3i29lc4oae1iw.iot.ap-northeast-1.amazonaws.com';
var thing__name_old = 'test_vm_ubuntu_2';
 
exports.handler = function(event, context, callback) {
    // AWS IoT Data APIに接続
    var iotdata = new aws.IotData( { endpoint: endpoint } );
    // デバイスシャドウを取得
    var params = { thing__name_old: thing__name_old };
    var rsp={};
    iotdata.getThingShadow(params, function (err, data) {
        if (!err) {
            // シャドウドキュメントから現在の設定を取得
            var payload = JSON.parse(data.payload);
            console.log(payload);
            console.log(payload);
            rsp = payload;
            console.log(rsp);
            context.done(null, rsp);
        }
    });
};