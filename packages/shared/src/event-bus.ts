// This file provides a window-backed singleton event bus for microfrontends.
type EventHandler = (data?: unknown) => void;

declare global {
  interface Window {
    __MF_DEMO_EVENT_BUS__?: EventBus;
  }
}

export class EventBus {
  private handlers = new Map<string, Set<EventHandler>>();

  on(event: string, handler: EventHandler): () => void {
    const listeners = this.handlers.get(event) ?? new Set<EventHandler>();
    listeners.add(handler);
    this.handlers.set(event, listeners);

    return () => {
      listeners.delete(handler);
      if (listeners.size === 0) {
        this.handlers.delete(event);
      }
    };
  }

  emit(event: string, data?: unknown): void {
    this.handlers.get(event)?.forEach((handler) => handler(data));
  }
}

const globalWindow = typeof window !== 'undefined' ? window : undefined;

export const eventBus = globalWindow?.__MF_DEMO_EVENT_BUS__ ?? new EventBus();

if (globalWindow && !globalWindow.__MF_DEMO_EVENT_BUS__) {
  globalWindow.__MF_DEMO_EVENT_BUS__ = eventBus;
}
