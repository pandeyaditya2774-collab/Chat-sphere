# ChatSphere

A premium dark real-time chat interface built with Express and Socket.IO.

## Run it

1. Extract the ZIP and open the `chatsphere` folder in VS Code.
2. Open Terminal in that folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open **http://localhost:8080** in your browser.
6. Open the same URL in another browser tab/device to test live messages and online users.

## What is included

- `server.js` — your original Socket.IO server events are retained, with additive chat broadcasting and online-user updates.
- `public/index.html` — app layout.
- `public/styles.css` — responsive premium dark styling.
- `public/app.js` — Socket.IO client behavior.
- `package.json` — start scripts and dependencies.

## Socket events

Original events retained:
- Client → server: `kuchbhi`
- Server → client: `gyankibaat`, `join`, `announcement`

Additional events:
- Server → all clients: `chat-message`
- Server → all clients: `user-count`

## Notes

- Messages are broadcast live but are not stored in a database. Restarting the server clears the conversation.
- There is no login/authentication yet. Display names are user-selected and should not be treated as verified identities.
- The app uses the Socket.IO client served by your own Express server at `/socket.io/socket.io.js`.
