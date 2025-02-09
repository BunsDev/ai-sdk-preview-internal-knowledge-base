import { Chat } from "@/components/chat";
import { generateId } from "ai";
import { auth } from "@/app/(auth)/auth";
import { notFound, redirect } from "next/navigation";
import { Space } from "@/components/space";

export default async function Spaces() {      
const session = await auth();

if (!session) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <h1>Spaces</h1>
        <Space id={generateId()} 
            initialMessages={[]} 
            session={session} 
        />
      </div>
    </div>
  );
}