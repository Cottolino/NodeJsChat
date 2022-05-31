const { createServer } = require("http");
const { Server } = require("socket.io");
const yargs = require('yargs');
const express = require('express');
const app = express();
const port = 3000;
var date_time = new Date();
var nomeUtente;


const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/assets'));

app.get('/', (req, res) => {
    console.log(req.query.id);
    nomeUtente = req.query.id;
    res.render('page', {
        idUtente: nomeUtente
    });
});

io.on('connection', (socket)=>{
    socket.emit('message', {message: 'Benvenuto in Chat' , utente: nomeUtente, h: date_time});
    socket.on('send', (data)=>{
        io.emit('message', data);
        console.log(data);
        console.log(nomeUtente);
    });
});


// function loginU(yargs){
//     yargs.command({
//         command: 'login',
//         describe: 'Nome utente',
//         builder: {
//             nome: {
//                 describe: 'Utente',
//                 demandOption: true,
//                 type: 'string'
//             }
//         },
//         handler(argv){
//             login(argv);
//         }
//     });
// }

// function login( {nome }){
//         nomeUtente = nome;
// }



// loginU(yargs);
// yargs.parse();
httpServer.listen(3000);

console.log("Listening on port 3000");