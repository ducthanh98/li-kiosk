export {};

declare global {
    interface Window {
        electronAPI: {
            logMessage: (level,message) => void;

        };
    }
}
