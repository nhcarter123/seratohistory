# Serato History
Parse the complete play history from the Serato session history files.

## Usage

Install it via

```console
npm i seratohistory
```

```
// Import.
const { getDefaultSeratoPath, getHistory } = require('seratohistory');

// Get the default Serato path.
const seratoPath = getDefaultSeratoPath();

// Obtain the history.
const history = await getSeratoHistory(seratoPath);
```