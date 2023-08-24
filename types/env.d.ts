declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOARD_HOST_URL: string;
        }
    }
}
