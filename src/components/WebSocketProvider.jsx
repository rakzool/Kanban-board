import { createContext,useEffect,useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTask,moveTask } from "../store/Reducers/BoardSlice";

export const WebSocketContext = createContext(null);

 const WebSocketProvider = ({children}) => {

    const socketURL = "ws://localhost:8080";

    const [socket,setSocket] = useState(null);
    const dispatch = useDispatch();

    const connectWebSocket = useCallback(() => {
        console.log("Attempting to connect to websocket .... ");
        const ws = new WebSocket(socketURL);

        ws.onopen = () => {
            console.log("websocket connected succesfully ");
            setSocket(ws);
        }

        ws.onmessage = (event) => {
            try{
                const data = JSON.parse(event.data);
                console.log("recieved message :" ,data);
                switch(data.type){
                    case "MOVE_TASK" :
                        console.log("Processing MOVE_TASK : ", data);
                        if(data.taskId && data.newColumnID){
                            dispatch(moveTask({
                                taskID: data.taskId,
                                newColumnID: data.newColumnID,
                            }));
                        }else{
                            console.error("Invalid MOVE_TASK data :" , data);
                        }
                        break;
                    case "ADD_TASK" :
                        console.log("Processing ADD_TASK : ", data);
                        if(data.task?.id && data.task?.title && data.columnID){
                            dispatch(addTask({
                                columnID: data.columnID,
                                taskId : data.task.id,
                                title : data.task.title
                            }))
                        }else{
                            console.error("Invalid ADD_TASK data :" , data);
                        }
                        break;
                    default: console.log("unknownb message type : " ,data.type);
                }

            }catch(error){
                console.error("Error processing WebSocket message",error);
                console.error(error.stack);
            }
        };

        ws.onclose = (event) => {
            console.log("websocket disconnected",event.code,event.reason);
            setSocket(null);
            setTimeout(connectWebSocket,3000);
        };

        ws.onerror = (error) => {
            console.error("web Socket error : ",error);
        }

        return ws;
    },[dispatch]);

    useEffect(() => {
        const ws = connectWebSocket();

        // clean up function when the component unmounts
        return () => {
            console.log("cleaing up websocket connection...");
            if(ws && ws.readyState === WebSocket.OPEN){
                ws.close();
            }
        };
    },[connectWebSocket])


    return (
        <WebSocketContext.Provider value={socket} >
            {children}
        </WebSocketContext.Provider>
    );
}

export default WebSocketProvider;