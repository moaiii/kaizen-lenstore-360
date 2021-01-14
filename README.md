# README
This is the repository for lenstore.co.uk/research

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).



### Build
`npm i`

Installs all dependencies.

 `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will hot-reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder, under the base url [https://www.lenstore.co.uk/research/360-eye-conditions](https://www.lenstore.co.uk/research/360-eye-conditions)
To build using a different base url, update the `homepage` variable in the `package.json` file, as well as `url` property of the `meta` object in the `index.js` file.


## Sites:
 - Live: https://www.lenstore.co.uk/research
 - Staging https://ddez4o1wthopb.cloudfront.net


## Setup
When changes are pushed to develop it is deployed to the staging url above (it can take a few minutes depending on the build)
We are with this setup using a S3 bucket with cloudfront to deploy this.
