## About
It's a chat project that was created using Create React App, Node.js, WebSocket and Firebase. The project contains the following components:
1. Login page
2. Authorization page
3. Chat page
4. Profile menu
5. Contacts add/delete modal window

## Start
1. Go to the directory `chat-app/server` and run the command `npm install`
2. Go to the directory `chat-app` and also run the command `npm install`
3. After this go to the directory `chat-app/server` and start the server (port 4200) with the command `node app.js`
4. And then go to the directory `chat-app` and start the client (port 3000) with the command `npm start`
5. The project will be available at `http://localhost:3000/`

## Features
1. Database operations are implemented on the client using Firebase (see directory `src/services`)
2. WebSocket is used to send messages and update the chat. There are different types of WebSocket messages (see file `server/services/handleClients.js`):
    1. `type: '__COMMON__'` is used for chat messaging between the user and his friend
    2. `type: '__INIT__'` is used to remember the user's client on the server
    3. `type: '__UPDATE__'` is used to notify other clients of user's changes (edit profile and add/delete contacts)
3. Receiving and sending WebSocket messages is implemented in the component `Main`. Different `useEffect()` hooks react to state changes caused by WebSocket messages
4. Almost all database operations require user's *id*. After successful *Authorization* the received *id* from *Firebase* is saved in `localStorage`
5. Every two seconds the client polls the server to determine a current status of each contact (online/offline)
6. Form validation is implemented using the lib `react-hook-form`
7. Opening the modal window blocks clicking on the outside zone with using the underlay (component `Substrate`)
8. The username has two parts (for example *Randy Marsh*). So the filter by name first tries to check for a complete match with filter's text and if it fails it searches for a match by parts of the username
9. The user notification system is implemented using the component `Alert`
10. An example of the database structure can be found in the directory `database-example` (*json* file)
