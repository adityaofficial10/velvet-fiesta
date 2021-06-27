const db = require('../database/index');
const firebase = require('firebase-admin');
const { v4 } = require('uuid');

module.exports = {
    joinRoom: async function(room_id, user_id) {
        let roomRef = db.collection('rooms').doc(room_id);
        await roomRef.update({
            members: firebase.firestore.FieldValue.arrayUnion(user_id)
        });
    },
    leaveRoom: async function(room_id, user_id) {
        let roomRef = db.collection('rooms').doc(room_id);
        await roomRef.update({
            members: firebase.firestore.FieldValue.arrayRemove(user_id)
        });
    }
};