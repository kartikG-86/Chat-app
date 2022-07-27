const socket = io();

let Username ;
let textarea = document.getElementById('textarea');
let messageArea = document.querySelector('.message-area');
let btn = document.querySelector('.btn');

function scrollDown(){
    messageArea.scrollTop = messageArea.scrollHeight;
}

let AppendMessage = (msg,type)=>{

    let maindiv = document.createElement('div');

    maindiv.classList.add('message',type);

    let markup = `
      
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>
    `;

    maindiv.innerHTML = markup;
    messageArea.appendChild(maindiv);

}

do{
  Username = prompt('Enter your name');

  let mess = {
      user:Username,
      message:`Joined the Chat`
  };

  socket.emit('message',mess);


}while(!Username);




function sendMessage(msg)
{ 
    let mess = {
        user:Username,
        message:msg.trim()
    }

    // Append 
    AppendMessage(mess,'outgoing');
    

    // send to server

    socket.emit('message',mess);
}

textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter')
    {
        sendMessage(e.target.value); 
        e.target.value = "";
        scrollDown();

    }
})

btn.addEventListener('click', function(){
    let message = textarea.value;
    sendMessage(message); 
    textarea.value = "";
    scrollDown();
})

// receive message
socket.on('message',(msg)=>{
    AppendMessage(msg,'incoming');
    scrollDown();

})