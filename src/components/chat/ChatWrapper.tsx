'use client'

import { trpc } from '@/app/_trpc/client'
import ChatInput from './ChatInput'
import Messages from './Messages'
import { ChevronLeft, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { ChatContextProvider } from './ChatContext'
import { PLANS } from '@/config/stripe'

interface ChatWrapperProps {
  chatId: string;
}

const ChatWrapper = ({ chatId }: ChatWrapperProps) => {
  return (
    <ChatContextProvider chatId={chatId}>
      <div className="relative min-h-full flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 justify-between flex flex-col">
          <Messages chatId={chatId} />
        </div>

        <ChatInput />
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper
