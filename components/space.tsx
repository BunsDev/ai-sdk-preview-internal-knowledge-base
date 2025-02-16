"use client";

import type { Message } from "ai";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { Files } from "@/components/files";
import { AnimatePresence, motion } from "framer-motion";
import { FileIcon } from "@/components/icons";
import { Message as PreviewMessage } from "@/components/message";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import type { Session } from "next-auth";

type Space = {
	id: string;
	name: string;
	description: string;
	owner: string;
	chatIds: string[];
};

const savedSpaces: Space[] = [
	{
		id: "1",
		name: "Space 1",
		description: "Space 1 Description",
		owner: "Space 1 Owner",
		chatIds: ["chat1", "chat2", "chat3"],
	},
	{
		id: "2",
		name: "Space 2",
		description: "Space 2 Description",
		owner: "Space 2 Owner",
		chatIds: ["chat4", "chat5", "chat6"],
	},
];

const SuggestedSpaces = ({
	id,
	append,
}: { id: string; append: (message: Message) => void }) => {
	return (
		<div className="grid sm:grid-cols-2 gap-2 w-full px-4 md:px-0 mx-auto md:max-w-[500px]">
			{savedSpaces.map((savedSpace, index) => (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.05 * index }}
					key={`${id}-${savedSpace.id}`}
					className={index > 1 ? "hidden sm:block" : "block"}
				>
					<button
						type="button"
						onClick={async () => {
							append({
								role: "user",
								content: savedSpace.name,
								id: id,
							});
						}}
						className="w-full text-left border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-lg p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex flex-col"
					>
						<span className="font-medium">{savedSpace.name}</span>
						<span className="text-zinc-500 dark:text-zinc-400">
							{savedSpace.description}
						</span>
					</button>
				</motion.div>
			))}
		</div>
	);
};

export function Space({
	id,
	initialMessages,
	session,
}: {
	id: string;
	initialMessages: Array<Message>;
	session: Session | null;
}) {
	const [selectedFilePathnames, setSelectedFilePathnames] = useState<
		Array<string>
	>([]);
	const [isFilesVisible, setIsFilesVisible] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (isMounted !== false && session?.user) {
			localStorage.setItem(
				`${session.user.email}/selected-file-pathnames`,
				JSON.stringify(selectedFilePathnames),
			);
		}
	}, [selectedFilePathnames, isMounted, session]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (session?.user) {
			setSelectedFilePathnames(
				JSON.parse(
					localStorage.getItem(
						`${session.user.email}/selected-file-pathnames`,
					) || "[]",
				),
			);
		}
	}, [session]);

	const { messages, handleSubmit, input, setInput, append } = useChat({
		body: { id, selectedFilePathnames },
		initialMessages,
		onFinish: () => {
			window.history.replaceState({}, "", `/${id}`);
		},
	});

	const [messagesContainerRef, messagesEndRef] =
		useScrollToBottom<HTMLDivElement>();

	return (
		<div className="flex flex-row justify-center pb-20 h-dvh bg-white dark:bg-zinc-900">
			<div className="flex flex-col justify-between items-center gap-4">
				<div
					ref={messagesContainerRef}
					className="flex flex-col gap-4 h-full w-dvw items-center overflow-y-scroll"
				>
					{messages.map((message, index) => (
						<PreviewMessage
							key={`${id}-${message.id}`}
							role={message.role}
							content={message.content}
						/>
					))}
					<div
						ref={messagesEndRef}
						className="flex-shrink-0 min-w-[24px] min-h-[24px]"
					/>
				</div>

				{messages.length === 0 && <SuggestedSpaces id={id} append={append} />}

				<form
					className="flex flex-row gap-2 relative items-center w-full md:max-w-[500px] max-w-[calc(100dvw-32px) px-4 md:px-0"
					onSubmit={handleSubmit}
				>
					<input
						className="bg-zinc-100 rounded-md px-2 py-1.5 flex-1 outline-none dark:bg-zinc-700 text-zinc-800 dark:text-zinc-300"
						placeholder="Send a message..."
						value={input}
						onChange={(event) => {
							setInput(event.target.value);
						}}
					/>

					<div
						className="relative text-sm bg-zinc-100 rounded-lg size-9 flex-shrink-0 flex flex-row items-center justify-center cursor-pointer hover:bg-zinc-200 dark:text-zinc-50 dark:bg-zinc-700 dark:hover:bg-zinc-800"
						onClick={() => {
							setIsFilesVisible(!isFilesVisible);
						}}
						onKeyUp={(event) => {
							if (event.key === "Enter" || event.key === " ") {
								setIsFilesVisible(!isFilesVisible);
							}
						}}
						// tabIndex={0}
						// role="button"
					>
						<FileIcon />
						<motion.div
							className="absolute text-xs -top-2 -right-2 bg-blue-500 size-5 rounded-full flex flex-row justify-center items-center border-2 dark:border-zinc-900 border-white text-blue-50"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.5 }}
						>
							{selectedFilePathnames?.length}
						</motion.div>
					</div>
				</form>
			</div>

			<AnimatePresence>
				{isFilesVisible && (
					<Files
						setIsFilesVisible={setIsFilesVisible}
						selectedFilePathnames={selectedFilePathnames}
						setSelectedFilePathnames={setSelectedFilePathnames}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
