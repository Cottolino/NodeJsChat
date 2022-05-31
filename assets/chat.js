window.onload = function(){
    var messages = [];
    var utenti = [];
    var dates = [];
    var socket = io.connect('http://localhost:3000');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var utente = document.getElementById("utente");
    
    

    socket.on('message', (data)=>{
        //alert(data);
        if(data.message){
            messages.push(data.message);
            utenti.push(data.utente);
            dates.push(data.h);
            var html = '';
            for (let i = 0; i < messages.length; i++) {
                html += dates[i]+ ":" + utenti[i] + ":" + messages[i] + '<br />';
            }
            //  html += '<br>';
            content.innerHTML = html;
            //$("#content").append(html);
            //$("#utente").append(data.utente);

        }
        else{
            console.log("Errore:", data);
        }
    });

    sendButton.onclick = function(){
        var text = field.value;
        var date = new Date();
        var utente1 = utente.innerHTML;
        socket.emit('send', { message: text, utente: utente1, h: date
    });
        
    };
}