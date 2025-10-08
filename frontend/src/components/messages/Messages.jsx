import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessage";


const Messages = () => {
	const {messages, loading} = useGetMessages();
	useListenMessages();
	 console.log(messages)
	  const lastMessageRef =useRef()
	  
	  useEffect(()=>{
		setTimeout(()=>{
			lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
		},100)
	  },[messages])


	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length > 0 && messages.map((message)=>(
				<Message key={message._id} message={message}/>
			))}
			
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;
