import { useSockets } from "@/context/socket.context";
import EVENTS from "@/utils/events";
import Head from "next/head";
import { useRef } from "react";
import { BiExit } from "react-icons/bi";
const Rooms = () => {
  const { socket, username, setUsername, rooms, roomId } = useSockets();
  const roomRef = useRef<HTMLInputElement>(null)
  const logout = () => {
    setUsername("");
    localStorage.removeItem("username");
    window.location.href = "/";
  };
  const createRoom = () => {
    if (roomRef.current?.value === '') {
      alert('Please enter a room name')
      return;
    }

    socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName: roomRef.current?.value})
    window.location.href = '/chat'
  }
  function handleJoinRoom(key: string) {
    if (key === roomId) return;
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key)
    window.location.href = '/chat'
  }
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
          <div className="cursor-pointer">{username}</div>
          <button
            onClick={logout}
            className="hover:bg-neutral-700 transition-all duration-200 hover:text-amber-300 rounded active:bg-amber-400"
          >
            <BiExit size={32} />
          </button>
        </div>
      </section>
      <section className="flex justify-between text-neutral-700 font-semibold">
        <div className="bg-amber-200 w-1/6 p-4 flex flex-col items-center rounded-bl">
          <h1 className="text-2xl">Rooms</h1>
          <div className="mt-4">
          {Object.keys(rooms).map((key) => {
            console.log(key, rooms[key])
          return (
            <div key={key}>
              <button
              className="bg-red-400 rounded shadow hover:bg-red-300 active:bg-red-400"
                disabled={key === roomId}
                title={`Join ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
              >
                {rooms[key].name}
              </button>
            </div>
          );
        })}
          </div>
        </div>
        <div className="bg-white w-5/6 max-h-72 overflow-y-auto rounded-br relative">
        <div>
          <label className="block">Room Name</label>
          <input
            ref={roomRef}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-amber-600"
          />
        </div>
        <button
          onClick={createRoom}
          className="px-4 py-2 mt-8 rounded transition duration-300 bg-amber-300 hover:bg-neutral-700/30 hover:text-white active:bg-amber-300"
        >
          Create
        </button>
        </div>
        {/* <div ref={messageBoxRef} className="bg-white w-5/6 max-h-72 overflow-y-auto rounded-br relative">
          {showNew && <div className="absolute bottom-2 w-full text-center bg-amber-400/50 p-2 shadow text-xs text-gray-600/80">New Message</div>}
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
        </div> */}
      </section>
    </main>
  );
};

export default Rooms;
