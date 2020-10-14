var app = require('express')();
var http = require('http').Server(app);

const io = require('socket.io')(http);
const botImage = 'https://i.ibb.co/w760FKV/bot.png';
const PORT = process.env.PORT || 5000;
io.on('connection', socket => {
    socket.emit('msg', {
        img: botImage,
        msg: 'Welcome To Realtime Chat'
    });

    socket.on('chatMessage', msg => {
        io.emit('msg', msg);
    });
    socket.on('disconnect', () => {
        io.emit('msg', {
            img: botImage,
            msg: 'Someone Left The Chat,Very Sad :('
        })
    });

    socket.on('newUser', msg => {
        socket.broadcast.emit('msg', {
            img: botImage,
            msg: `${msg.mail} joined The Chat`

        })
    });

})










http.listen(PORT, function () {
    console.log('Server Started');
});