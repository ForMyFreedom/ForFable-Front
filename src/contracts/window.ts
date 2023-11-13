export {};

declare global {
    interface Window {
        env: {
            API_URL: string;
            APP_ICON: string;
            MAX_IMAGE_SIZE_MB: number;
        };
    }
}