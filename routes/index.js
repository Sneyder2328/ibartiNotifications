const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();


const options = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.SERVER_KEY
    }
};

async function sendNotification(type, content, tokenIdReceiver) {
    return await axios.post('https://fcm.googleapis.com/fcm/send', {
        data: {type, content},
        to: tokenIdReceiver,
        priority: 'high'
    }, options);
}

router.post('/notifications', async function (req, res, next) {
    const type = req.body.type;
    const content = req.body.content;
    const receiverTokenId = req.body.receiverTokenId;

    let result = await sendNotification(type, content, receiverTokenId);
    res.send(result.data);
});

module.exports = router;

// docs of FCM at: https://firebase.google.com/docs/cloud-messaging/http-server-ref
// https://firebase.google.com/docs/cloud-messaging/send-message
