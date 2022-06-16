This application was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using typescript and pwa template

## Asumptions
Few asumptions were done while solving this assignment:

1. There is always response from the server and therefore no logic was made to handle failure.
2. Both endppoints returns the stations and availability in the same order. Therefore while iterating over stations we can assume that both stations and availability has the same order and no logic was made to check if the station id matches when rearranging the response.
3. No mechanism was made for continuously fetching new data from the server. But it is something that would have to be taken into account if a true real time application for bikes availability is desired.

## Available Scripts
### `npm start`

Runs the app in development mode
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Build the app for production 

### `serve -s build`
Serves the app with a static server. 

Run this in order to test the server-worker funcionality

### `npm run test`
Run tests