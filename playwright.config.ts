import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: 'tests',
    testMatch: /(.+\.)?(test|spec)\.[jt]s/,
    webServer: {
        command: 'pnpm run build && pnpm run preview',
        port: 4173
    }
};

export default config;
