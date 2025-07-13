import React from 'react'
import Sidebar from '../Components/Sidebar';
import { useChatStore } from '../store/useChatStore';
import ChatContainer from '../Components/ChatContainer';
import NoChatSelected from '../Components/NoChatSelected';

function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[100%] bg-base-200">
      
      <div className="flex flex-col items-center justify-center pt-10 pb-5 px-5">

        <div className="bg-base-100 shadow-xl w-full max-w-8xl h-[calc(100vh-6rem)] ">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />    

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage
