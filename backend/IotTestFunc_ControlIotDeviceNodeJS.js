
console.log('Loading function');
var aws = require('aws-sdk');
 
var endpoint  = 'a3i29lc4oae1iw.iot.ap-northeast-1.amazonaws.com';
var thing__name_old = 'test_vm_ubuntu_2';
 
exports.handler = function(event, context, callback) {
    // AWS IoT Data API�ɐڑ�
    var iotdata = new aws.IotData( { endpoint: endpoint } );
    // �f�o�C�X�V���h�E���擾
    var params = { thing__name_old: thing__name_old };
    var rsp={};
    iotdata.getThingShadow(params, function (err, data) {
        if (!err) {
            // �V���h�E�h�L�������g���猻�݂̐ݒ���擾
            var payload = JSON.parse(data.payload);
            console.log(payload);
            console.log(payload);
            rsp = payload;
            console.log(rsp);
            context.done(null, rsp);
        }
    });
};