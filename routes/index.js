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

async function sendNotification(title, description, photo, channel, tokenIdReceiver) {
    return await axios.post('https://fcm.googleapis.com/fcm/send', {
        data: {title, description, photo, channel},
        to: tokenIdReceiver,
        priority: 'high'
    }, options);
}

router.post('/notifications', async function (req, res, next) {
    const title = req.body.title;
    const description = req.body.description;
    const receiverTokenId = req.body.receiverTokenId;
    const photo = req.body.photo;
    const channel = req.body.channel;

    let result = await sendNotification(title, description, photo, channel, receiverTokenId);
    res.send(result.data);
});

module.exports = router;

// docs of FCM at: https://firebase.google.com/docs/cloud-messaging/http-server-ref
// https://firebase.google.com/docs/cloud-messaging/send-message
