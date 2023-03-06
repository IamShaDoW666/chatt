import Head from "next/head";
const Rooms = () => {
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
        <div className="cursor-pointer">Username</div>
      </section>
      <section className="flex justify-between text-neutral-700 font-semibold">
        <div className="bg-amber-200 w-1/6 p-4 flex flex-col items-center rounded-bl">
          <h1 className="text-2xl">
            Users (3) 
          </h1>
          <ul className="mt-4">
            <li>Jose</li>
            <li>Elwin</li>
            <li>Milan</li>
          </ul>
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
    )
}

export default Rooms;