"use strict";
// 📁 playwright.config.ts
// ⚙️ Configuración mejorada con timeouts aumentados
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
exports.default = (0, test_1.defineConfig)({
    timeout: 120000, // ✅ Aumentado a 2 minutos
    retries: 1,
    testDir: './tests',
    globalSetup: require.resolve('./global-setup.ts'),
    // 🔧 Configuración para múltiples proyectos
    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
        },
        {
            name: 'suite-auth',
            testMatch: '**/suite/**/*.spec.ts',
            use: {
                ...test_1.devices['Desktop Chrome'],
                storageState: 'auth/auth.json'
            },
            dependencies: ['setup']
        },
        {
            name: 'citas',
            testMatch: '**/citas/**/*.spec.ts',
            use: {
                ...test_1.devices['Desktop Chrome'],
                storageState: 'auth/auth.json'
            }
        },
        {
            name: 'idc',
            testMatch: '**/idc/**/*.spec.ts',
            use: {
                ...test_1.devices['Desktop Chrome'],
                storageState: 'auth/auth.json'
            }
        },
        {
            name: 'citas-web-publico', // ✅ NUEVO: Para Canal Web que no requiere login Suite
            testMatch: '**/citas/canal-web/**/*.spec.ts',
            use: {
                ...test_1.devices['Desktop Chrome'],
                // ❌ NO usar storageState para Canal Web
            }
        }
    ],
    use: {
        baseURL: 'https://encuestas.sidesys.ar',
        headless: false, // ✅ Cambiado a false para ver qué pasa
        locale: 'es-ES',
        viewport: { width: 1920, height: 1080 },
        actionTimeout: 30000, // ✅ Aumentado a 30 segundos
        navigationTimeout: 60000, // ✅ Aumentado a 60 segundos
        ignoreHTTPSErrors: true,
        trace: 'on-first-retry',
        video: 'on-first-retry',
        screenshot: 'on',
    },
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
        ['list'],
        ['json', { outputFile: 'test-results/json-results.json' }]
    ],
    reportSlowTests: {
        max: 5,
        threshold: 30000 // ✅ Aumentado a 30 segundos
    }
});
//# sourceMappingURL=playwright.config.js.map