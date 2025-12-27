const QRCode = require('qrcode');

// util function to generate QR code from given text.
async function generateQRCode(payLoad) {
  if (!payLoad || typeof payLoad !== 'string') {
    throw new Error('payLoad must be a string');
  }
  try {
    const qrCodeDataURL = await QRCode.toDataURL(payLoad, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 300
    });
    return qrCodeDataURL;
  } catch (err) {
    console.error('error while generating QR code : ', err.message);
    throw err;
  };
};

module.exports = generateQRCode;
