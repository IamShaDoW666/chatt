import EVENTS from "@/utils/events";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

const socket = io();

export interface Message {
  text: string;
  time: string;
  username: string;
  sent: boolean;
}

// interface Props {
//   messageBoxRef: React.RefObject<HTMLDivElement>,
// }

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: Message[];
  setMessages: Function;
  roomId?: string;
  rooms: Record<string, { name: string }>;
  messageBoxRef: React.RefObject<HTMLDivElement>  | null;
  showNew: Boolean;
  setShowNew: Function
}

const SocketContext = createContext<Context>({
  socket,
  setUsername: Function,
  setMessages: Function,
  rooms: {},
  messages: [],
  messageBoxRef: null,
  setShowNew: Function,
  showNew: false
});

const SocketProvider = (props: any) => {
  const [username, setUsername] = useState('Milan');
  const [roomId, setRoomId] = useState();
  const [rooms, setRooms] = useState<Record<string, { name: string }>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNew, setShowNew] = useState(false);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    };
  }, []);
  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });
  // const getRooms = async () => {
  //   let res = await fetch('https://iamshadow666-automatic-succotash-jpv7p57vp7pcvvr-5000.preview.app.github.dev/get-rooms')
  //   setRooms(res.body)
  // }
  useEffect(() => {
    setUsername(localStorage.getItem('username') || '')
    // getRooms()
    socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
      setRoomId(value);
  
      setMessages([]);
    });

    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      // messageBoxRef.current?.scroll({top: messageBoxRef.current.scrollHeight, behavior: 'smooth'})
      // setShowNew(true)
      console.log(messageBoxRef.current?.scrollHeight)
      if (!document.hasFocus()) {
        document.title = "New message...";
      }
      console.log("before");
      setMessages((prev) => [
        ...prev,
        { text: message, time, username, sent: false },
      ]);
      console.log("after: " + messages);
    });
    return () => {
      socket.off(EVENTS.SERVER.ROOM_MESSAGE);
      socket.off(EVENTS.SERVER.ROOMS)
      socket.off(EVENTS.SERVER.JOINED_ROOM)
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
        messageBoxRef,
        showNew,
        setShowNew
      }}
      {...props}
    />
  );
};

export const useSockets = () => useContext(SocketContext);

export default SocketProvider;
