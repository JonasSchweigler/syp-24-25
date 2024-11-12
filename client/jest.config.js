module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Use node environment instead of jsdom for utility function tests
  testMatch: ["<rootDir>/__tests__/**/*.test.{ts,tsx}"], // Match only .test.ts files, not .test.tsx
};
