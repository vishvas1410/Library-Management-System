import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Use Node.js environment for testing
  roots: ['<rootDir>/src'], // Directory where your tests are located
  testMatch: ['**/?(*.)+(spec|test).ts'], // Match test files
  collectCoverage: true, // Enable code coverage
  collectCoverageFrom: ['src/**/*.ts'], // Specify which files to collect coverage from
  coverageReporters: ['text', 'lcov'], // Coverage report formats
};

export default config;
