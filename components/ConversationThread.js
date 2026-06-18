import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';

export default function ConversationThread({ messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] glass-card p-6 m-4">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-3">
          <svg className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-sm text-muted">No messages yet</p>
        <p className="text-xs text-muted/50 mt-1">Conversation history will appear here</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex flex-col h-[500px] overflow-y-auto p-4 space-y-4"
    >
      {messages.map((msg, idx) => {
        const isOutbound = msg.direction === 'outbound';
        return (
          <div
            key={idx}
            className={clsx(
              'flex flex-col max-w-[80%]',
              isOutbound ? 'self-end items-end' : 'self-start items-start'
            )}
          >
            <div
              className={clsx(
                'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                isOutbound
                  ? 'bg-gradient-premium text-white rounded-tr-sm shadow-lg shadow-accent/20'
                  : 'bg-white/[0.06] text-primary rounded-tl-sm border border-white/[0.08]'
              )}
            >
              {msg.body || msg.content}
            </div>
            <span className="text-2xs text-muted mt-1 px-1">
              {new Date(msg.created_at || msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        );
      })}

      {/* AI typing indicator */}
      <div className="self-start items-start flex flex-col">
        <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-white/[0.06] border border-white/[0.08]">
          <div className="flex space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-muted animate-pulse-soft" />
            <span className="h-2 w-2 rounded-full bg-muted animate-pulse-soft" style={{ animationDelay: '0.3s' }} />
            <span className="h-2 w-2 rounded-full bg-muted animate-pulse-soft" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}