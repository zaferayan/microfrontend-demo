type EventHandler = (data?: unknown) => void;
declare global {
    interface Window {
        __MF_DEMO_EVENT_BUS__?: EventBus;
    }
}
export declare class EventBus {
    private handlers;
    on(event: string, handler: EventHandler): () => void;
    emit(event: string, data?: unknown): void;
}
export declare const eventBus: EventBus;
export {};
