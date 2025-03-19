export {};

declare global {
    interface Window {
        electronAPI: {
            getCameraStream: () => Promise<MediaStream>;
        };
    }
}
