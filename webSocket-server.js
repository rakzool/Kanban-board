import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

let clients = [];

wss.on("connection",(ws)=>{
    console.log(`client connected. Total clients : ${clients.length + 1}`);
    clients.push(ws);

   ws.on("message", (rawMessage) => {
    try{
        const message = JSON.parse(rawMessage);
        console.log("server recieved a message" , message);

        // Broadcast the message to all other clients 
        const outgoingMessage = JSON.stringify(message);
        let broadcastCount = 0;

        clients.forEach((client) => {
            if(client !== ws && client.readyState === WebSocket.OPEN){
                console.log("Broadcasting message to client");
                client.send(outgoingMessage);
                broadcastCount++;
            }
        });

        console.log(`successfully broadcasted message to ${broadcastCount} other clients`);

    }catch(error){
        console.error("Error message" , error);
        console.error(error.stack);

    }

   });

    ws.on("close",()=>{
        clients = clients.filter((client) => client !== ws);
        console.log("client is disconnected remaining clients ", clients.length);
    })

    ws.on("error",(error)=>{
        console.error("web socket error :" ,error);
        clients = clients.filter(client => client !== ws);
    });
});

wss.on("error",(error)=>{
 console.error("WebSocket Server Error : ", error);
})

console.log("web socket avaliable at ws://localhost:8080");

