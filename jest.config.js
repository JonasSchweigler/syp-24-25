module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/**/*.test.{ts,tsx}"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  // transform: {
  //   "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  // },
};
