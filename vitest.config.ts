import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/tests/__tests__/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/tests/**/*.ts"],
      exclude: ["src/tests/__tests__/**"],
    },
  },
});
