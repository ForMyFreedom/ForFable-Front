export {};

declare global {
    interface Window {
        env: {
            API_URL: string;
            APP_ICON: string;
            TO_IGNORE_USER_ID: string;
        };
    }
}