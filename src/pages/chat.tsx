import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { BiExit } from "react-icons/bi";
import { useSockets } from "@/context/socket.context";
import Message from "@/components/Message";
import EVENTS from "@/utils/events";
import Link from "next/link";

interface Message {
  text: string;
  time: string;
  username: string;
}

export default function Chat() {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    socket,
    roomId,
    username,
    setMessages,
    messages,
    messageBoxRef,
    showNew,
    setShowNew,
  } = useSockets();
  const sendMessage = () => {
    const txt = inputRef.current?.value;
    if (txt === "") {
      return;
    }
    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
      roomId,
      message: text,
      username,
    });
    const date = new Date();
    setMessages((prev: Message[]) => [
      ...prev,
      {
        text,
        time: `${date.getHours()}:${date.getMinutes()}`,
        username: "You",
        sent: true,
      },
    ]);
    setText("");
  };


  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (text != "") {
        sendMessage();
      }
    }
  };

  const leaveRoom = () => {
    console.log('Leave room')
  }

  useEffect(() => {
    if (localStorage.getItem('username') === '' || !localStorage.getItem('username')) {
      window.location.href = '/'
    }
    inputRef.current?.focus();
  }, []);
  return (
    <main className="max-w-6xl mx-auto h-screen py-16 relative">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-amber-300 p-4 rounded-t-xl w-full flex justify-between items-center">
        <h1 className="text-4xl font-bold cursor-pointer">Chatt</h1>
        <div className="flex justify-between gap-x-4 items-center">
        <div className="cursor-pointer">{ username }</div>
        <Link href={'/rooms'} onClick={leaveRoom} className="hover:bg-neutral-700 transition-all duration-200 hover:text-amber-300 rounded active:bg-amber-400"><BiExit size={32}/></Link>
        </div>
      </section>
      <section className="flex justify-between text-neutral-700 font-semibold">
        <div className="bg-amber-200 w-1/6 p-4 flex flex-col items-center rounded-bl">
          <h1 className="text-2xl">
            Users (3) <HiUsers />
          </h1>
          {/* <span className="w-full p-[1px] bg-neutral-700"></span> */}
          <ul className="mt-4">
            <li>Jose</li>
            <li>Elwin</li>
            <li>Milan</li>
          </ul>
        </div>
        <div
          ref={messageBoxRef}
          className="bg-white w-5/6 max-h-72 overflow-y-auto rounded-br relative"
        >
          {showNew && (
            <div className="absolute bottom-2 w-full text-center bg-amber-400/50 p-2 shadow text-xs text-gray-600/80">
              New Message
            </div>
          )}
          <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col my-5">
              {messages?.map((message, idx) => (
                <Message
                  sent={message.sent}
                  text={message.text}
                  key={idx}
                  idx={idx.toString()}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 px-4 flex justify-center gap-2 items-center">
        <input
          ref={inputRef}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
          value={text}
          className="w-full h-12 bg-gray-300 py-2 px-3 rounded-xl"
          type="text"
          placeholder="Type here..."
        />
        <button
          onClick={() => sendMessage()}
          className="bg-amber-300 p-4 rounded shadow-lg hover:shadow-none transition-all duration-500 hover:bg-slate-500 hover:text-white active:bg-amber-300"
        >
          <IoSend size={22} />
        </button>
      </section>
    </main>
  );
}
