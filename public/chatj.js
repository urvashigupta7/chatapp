 var socket=io.connect("https://urvashig-urvashi07.c9users.io/");
             var message=document.getElementById('message');
             var handle=document.getElementById('handle');
           var btn=document.getElementById('send');
            var output=document.getElementById('output');
            var feedback=document.getElementById('feedback');
            var friend=document.getElementById('friend');
            socket.emit('join',{handle:handle.value,friend:friend.value});
            socket.on('join',function(data) {
                output.innerHTML+='<div style="color: #aaa"><p><em>'+data.handle + " joined"+'</em></p></div>'
            })
            socket.on('left',function(data) {
                output.innerHTML+='<p>' +"a user disconnected"+'</p>'
            })
            
            message.addEventListener('keypress',function()
            {
                socket.emit('typing',{handle:handle.value,friend:friend.value});
            })
            
             message.addEventListener('focus',function()
            {
                 socket.emit('typing',{handle:handle.value,friend:friend.value});
            })
           
           
           
            btn.addEventListener('click',function()
            {
                socket.emit('chat',{
                    message:message.value,
                    handle:handle.value,
                    friend:friend.value,
                    id:socket.id
                });
                
                message.value=" ";
            });
            
            socket.on('typing',function(data) {
                
                feedback.innerHTML='<p><em>'+data.handle+"  is typing..."+ '</em></p>'
               
            })
            socket.on('chat',function(data)
            {
             feedback.innerHTML="";
                output.innerHTML+='<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
            });