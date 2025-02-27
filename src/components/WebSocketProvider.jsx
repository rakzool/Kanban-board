import { createContext, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTask, moveTask,addComment } from "../store/Reducers/BoardSlice";

export const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {

    const socketURL = "ws://localhost:8080";

    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();

    const connectWebSocket = useCallback(() => {
        console.log("Attempting to connect to websocket .... ");
        const ws = new WebSocket(socketURL);

        ws.onopen = () => {
            console.log("websocket connected successfully ");
            setSocket(ws);
        }

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("recieved message :", data);
                switch (data.type) {
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
                    case "ADD_TASK":
                      console.log("Processing ADD_TASK:", data);
                      if (data.task?.id && data.task?.title && data.columnId) {
                        dispatch(addTask({ 
                          columnId: data.columnId,
                          title: data.task.title,
                          description: data.task.description,
                          taskId: data.task.id,
                          fromWebSocket: true
                        }));
                      } else {
                        console.error("Invalid ADD_TASK data:", data);
                      }
                      break;
                    case "ADD_COMMENT":
                      console.log("Processing ADD_COMMENT:", data);
                      if (data.taskId && data.comment && data.commentId) {
                        dispatch(addComment({
                          taskId: data.taskId,
                          comment: data.comment,
                          commentId: data.commentId,
                          timestamp: data.timestamp,
                          fromWebSocket: true
                        }));
                      } else {
                        console.error("Invalid ADD_COMMENT data:", data);
                      }
                      break;
                    default:
                      console.log("Unknown message type:", data.type);
                  }

            } catch (error) {
                console.error("Error processing WebSocket message", error);
                console.error(error.stack);
            }
        };

        ws.onclose = (event) => {
            console.log("websocket disconnected", event.code, event.reason);
            setSocket(null);
            setTimeout(connectWebSocket, 3000);
        };

        ws.onerror = (error) => {
            console.error("web Socket error : ", error);
        }

        return ws;
    }, [dispatch]);

    useEffect(() => {
        let ws = null;

        // Only create a new connection if we don't have one
        if (!socket) {
            ws = connectWebSocket();
        }

        return () => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                console.log("cleaning up websocket connection...");
                ws.close();
            }
        };
    }, [connectWebSocket, socket]);


    return (
        <WebSocketContext.Provider value={socket} >
            {children}
        </WebSocketContext.Provider>
    );
}

export default WebSocketProvider;