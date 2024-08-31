# Library Management System (LMS)

## Overview

The Library Management System (LMS) is a TypeScript-based application designed to manage books in a library. It includes functionalities for adding books, borrowing, returning, and viewing available books. The system utilizes MongoDB with Mongoose and adheres to Test-Driven Development (TDD) principles.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Running Tests](#running-tests)

## Features

- Add new books to the library
- Borrow and return books
- View all available books
- Retrieve total books including borrowed ones
- Unit tests with TDD practices

## Technologies

- **TypeScript**: The programming language used for the application
- **Node.js**: JavaScript runtime environment
- **MongoDB**: NoSQL database for storing book data
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and For Designing Schema For Books
- **Jest**: Testing framework

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) instance (local or remote)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/vishvas1410/Library-Management-System.git
   
2. **install the Dependancy**

   ```bash
   npm install

### Running Tests

1. **Run Unit Tests**
    -To execute all unit tests using Jest, run below command:

   ```bash
   npm test 

2. **Check Test Coverage**
    -To view test coverage details, run:

   ```bash
   npm run test:coverage
