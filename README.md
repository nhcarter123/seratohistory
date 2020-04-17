# Serato History
Parse the complete play history from the Serato session history files.

## Usage

Install it via

```console
npm i seratohistory
```

```
const { getDefaultSeratoPath, getHistory } = require('seratohistory'); // Import.

const seratoPath = getDefaultSeratoPath(); // Get the default Serato path.

const history = await getSeratoHistory(seratoPath); // Obtain the history.
```