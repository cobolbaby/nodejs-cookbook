/**
 * QrcodeController
 *
 * @description :: Server-side logic for managing Qrcodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const QRCode = require('qrcode');

function createQrcode(req, res) {
    let encodeStr = req.param('id') || 'hello world!!!';
    // let encodeStr = createQrcodeData(encodeStr);
    return QRCode.toFileStream(res, encodeStr, {
        type: 'image/png'
    });
}

exports.createQrcode = createQrcode;
