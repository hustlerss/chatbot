import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  Square,
} from "lucide-react";

import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  ErrorPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useThread,
} from "@assistant-ui/react";

import type { FC } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import * as m from "motion/react-m";

import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { ToolFallback } from "@/components/assistant-ui/tool-fallback";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import {
  ComposerAddAttachment,
  ComposerAttachments,
  UserMessageAttachments,
} from "@/components/assistant-ui/attachment";

import { cn } from "@/lib/utils";

export const Thread: FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <ThreadPrimitive.Root
          className="flex h-full flex-col"
          style={{
            ["--thread-max-width" as string]: "100%",
          }}
        >
          <ThreadPrimitive.Viewport className="relative flex flex-1 flex-col overflow-x-auto overflow-y-scroll">
            <ThreadPrimitive.If empty>
              <ThreadWelcome />
            </ThreadPrimitive.If>

            <ThreadPrimitive.Messages
              components={{
                UserMessage,
                EditComposer,
                AssistantMessage,
              }}
            />

            <ThreadPrimitive.If empty={false}>
              <div className="min-h-8 grow" />
            </ThreadPrimitive.If>
          </ThreadPrimitive.Viewport>
          
          <Composer />
        </ThreadPrimitive.Root>
      </MotionConfig>
    </LazyMotion>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="absolute bottom-20 right-6 z-10 self-center rounded-full p-4 disabled:invisible bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <div className="flex w-full flex-grow flex-col">
      <div className="flex w-full flex-grow flex-col items-center justify-center">
        <div className="flex size-full flex-col justify-center px-8 text-center">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-2xl font-light text-white mb-4"
          >
            👋 Hello! I'm Startup Sensei, your AI business mentor.
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg"
          >
            I can help you with funding, product development, marketing, legal issues, and team building.
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-4 text-sm"
          >
            What would you like to discuss today?
          </m.div>
        </div>
      </div>
    </div>
  );
};

const Composer: FC = () => {
  const { status } = useThread();

  return (
    <div className="border-t border-slate-700 p-4 bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex space-x-4">
          <div className="flex-1">
            <ComposerPrimitive.Root className="w-full">
              <ComposerPrimitive.Input
                placeholder="Ask about startup funding, product development, marketing, legal issues..."
                className="w-full h-20 p-4 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none"
                rows={3}
              />
            </ComposerPrimitive.Root>
          </div>
          <ComposerAction status={status} />
        </div>
        <div className="text-center mt-3 text-slate-500 text-xs">
          <div>💡 Press Enter to send • Shift+Enter for new line</div>
        </div>
      </div>
      <ThreadScrollToBottom />
    </div>
  );
};

const ComposerAction: FC<{ status: string }> = ({ status }) => {
  if (status === 'running') {
    return (
      <ComposerPrimitive.Cancel asChild>
        <Button
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium h-20 self-end text-white transition-colors"
          aria-label="Stop generating"
        >
          STOP
        </Button>
      </ComposerPrimitive.Cancel>
    );
  }

  return (
    <ComposerPrimitive.Send asChild>
      <Button
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium h-20 self-end disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
        aria-label="Send message"
      >
        SEND
      </Button>
    </ComposerPrimitive.Send>
  );
};

const MessageError: FC = () => {
  return (
    <MessagePrimitive.Error>
      <ErrorPrimitive.Root className="mt-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
        <ErrorPrimitive.Message />
      </ErrorPrimitive.Root>
    </MessagePrimitive.Error>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root asChild>
      <div
        className="w-full py-4 animate-in duration-150 ease-out fade-in slide-in-from-bottom-1"
        data-role="assistant"
      >
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-xl p-4 bg-slate-800/50 border border-slate-700 text-slate-200">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-slate-400">STARTUP SENSEI</span>
              <span className="text-xs text-slate-500 ml-2">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              <MessagePrimitive.Parts
                components={{
                  Text: MarkdownText,
                  tools: { Fallback: ToolFallback },
                }}
              />
            </div>
            <MessageError />
            <div className="mt-2 flex">
              <BranchPicker />
              <AssistantActionBar />
            </div>
          </div>
        </div>
      </div>
    </MessagePrimitive.Root>
  );
};

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      className="flex gap-1 text-slate-400"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton 
          tooltip="Copy"
          className="hover:bg-slate-700 rounded-lg p-2"
        >
          <MessagePrimitive.If copied>
            <CheckIcon className="size-4" />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon className="size-4" />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton 
          tooltip="Refresh"
          className="hover:bg-slate-700 rounded-lg p-2"
        >
          <RefreshCwIcon className="size-4" />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root asChild>
      <div
        className="w-full py-4 animate-in duration-150 ease-out fade-in slide-in-from-bottom-1"
        data-role="user"
      >
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-xl p-4 bg-blue-500/20 border border-blue-500/30 text-white">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-slate-300">YOU</span>
              <span className="text-xs text-slate-500 ml-2">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              <MessagePrimitive.Parts />
            </div>
            <div className="mt-2 flex justify-end">
              <UserActionBar />
            </div>
          </div>
        </div>
      </div>
    </MessagePrimitive.Root>
  );
};

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="flex gap-1 text-slate-400"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton 
          tooltip="Edit"
          className="hover:bg-slate-700 rounded-lg p-2"
        >
          <PencilIcon className="size-4" />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

const EditComposer: FC = () => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-end">
        <ComposerPrimitive.Root className="max-w-[80%] w-full">
          <ComposerPrimitive.Input
            className="w-full min-h-[100px] p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl text-white text-sm resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex gap-2 mt-2 justify-end">
            <ComposerPrimitive.Cancel asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-slate-300 border-slate-600 hover:bg-slate-700"
                aria-label="Cancel edit"
              >
                Cancel
              </Button>
            </ComposerPrimitive.Cancel>
            <ComposerPrimitive.Send asChild>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                aria-label="Update message"
              >
                Update
              </Button>
            </ComposerPrimitive.Send>
          </div>
        </ComposerPrimitive.Root>
      </div>
    </div>
  );
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn(
        "inline-flex items-center text-xs text-slate-400 bg-slate-700/50 rounded-lg p-1",
        className,
      )}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton 
          tooltip="Previous"
          className="hover:bg-slate-600 rounded p-1"
        >
          <ChevronLeftIcon className="size-3" />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="mx-2 font-medium text-slate-300">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton 
          tooltip="Next"
          className="hover:bg-slate-600 rounded p-1"
        >
          <ChevronRightIcon className="size-3" />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};