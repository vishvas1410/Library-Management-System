import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'node', // Use Node.js environment for testing

   setupFilesAfterEnv: ['<rootDir>/config/db.ts'],

  // Define the root directories for test files and source files
  roots: ['<rootDir>/src', '<rootDir>/tests'],

  // Match test files specifically located in the 'tests' folder
  testMatch: ['<rootDir>/tests/**/*.(spec|test).ts'],

  // Enable code coverage
  collectCoverage: true,
  
  maxWorkers:1,

  testTimeout:10000,
  // Collect coverage from 'src' and 'model' folders, excluding 'dist'
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '<rootDir>/model/**/*.ts',
    '!<rootDir>/dist/**',
  ],

  // Specify the formats for coverage reports
  coverageReporters: ['text', 'lcov'],

  // Ignore 'dist' folder from test discovery
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
