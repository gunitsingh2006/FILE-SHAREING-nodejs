# Password-Protected File Sharing API

A simple file-sharing application built using **Node.js, Express.js, MongoDB, and Multer**. It allows users to upload files and share them through unique links. Users can optionally protect their files with a password.

## Features
- Upload files using Multer.
- Generate unique shareable links.
- Optional password protection using Bcrypt.
- Secure password verification before downloading.
- Track file download counts.
- Store file metadata in MongoDB.

## Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- Multer
- Bcrypt
- EJS

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   DATABASE_URL=mongodb://127.0.0.1:27017/file-sharing
   PORT=3000
   ```

4. Start the application:
   ```bash
   npm start
   ```

5. Open in your browser:
   ```text
   http://localhost:3000
   ```

## Usage
1. Upload a file.
2. Optionally set a password.
3. Generate and copy the shareable link.
4. Open the link to download the file.
5. Enter the password if the file is protected.

**Note:** MongoDB must be running locally before starting the application.
