export class EventBus {
    constructor() {
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    on(event, handler) {
        const listeners = this.handlers.get(event) ?? new Set();
        listeners.add(handler);
        this.handlers.set(event, listeners);
        return () => {
            listeners.delete(handler);
            if (listeners.size === 0) {
                this.handlers.delete(event);
            }
        };
    }
    emit(event, data) {
        this.handlers.get(event)?.forEach((handler) => handler(data));
    }
}
const globalWindow = typeof window !== 'undefined' ? window : undefined;
export const eventBus = globalWindow?.__MF_DEMO_EVENT_BUS__ ?? new EventBus();
if (globalWindow && !globalWindow.__MF_DEMO_EVENT_BUS__) {
    globalWindow.__MF_DEMO_EVENT_BUS__ = eventBus;
}
