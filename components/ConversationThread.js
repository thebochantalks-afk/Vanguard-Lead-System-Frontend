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
      <div className="flex flex-col items-center justify-center h-[500px] bg-surface rounded-xl border border-border">
        <p className="text-muted">No messages yet.</p>
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef}
      className="flex flex-col h-[500px] overflow-y-auto bg-surface rounded-xl border border-border p-4 space-y-4"
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
                'rounded-2xl px-4 py-2 text-sm',
                isOutbound 
                  ? 'bg-accent text-white rounded-tr-none' 
                  : 'bg-border text-primary rounded-tl-none'
              )}
            >
              {msg.body || msg.content}
            </div>
            <span className="text-[10px] text-muted mt-1 px-1">
              {new Date(msg.created_at || msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        );
      })}
    </div>
  );
}
