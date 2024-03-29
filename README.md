# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo Features

### Seach with SYMBOL_SEARCH api

Search input to allow users to type and search symbols, these results can be selected for more functionality.

### List of raw data for prices list with TIME_SERIES_MONTHLY api

With selected symbol, monthly data is requested and displayed as a list, there results are virtually scrolled (so we don't add overhead to the application) and support sorting over data fields.

### Line chart for year by year data with TIME_SERIES_MONTHLY api

With selected symbol, monthly data is requested and displayed as a chart by year, users can select a year to visualize data (only years with data are selectable) and it defaults to current year.

### Line chart for yearly timeline with TIME_SERIES_MONTHLY api

With selected symbol, last month of year data is displayed in an animated timeline chart that progresses from the begining of historic records to current year.

## Added Packages

### `@tanstack/react-query`

Package that offers caching for data out of the box, which is ideal for `alphavantage` api consumption given that free accounts have a limit of requests per day.

### `react-virtuoso`

Package that offers virtual scrolling, needed given the large amount of raw data for monthly prices list.

### `date-fns`

Package with Date manipulation utils, useful for formating, sorting and comparison.

### `@nivo/line`

Package with line charts, useful for data visualization.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

