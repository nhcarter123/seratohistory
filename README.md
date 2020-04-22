# Serato History
Parse the complete play history from the Serato session history files.

## Install


```console
npm i seratohistory
```

## Usage
```js
const { getDefaultSeratoPath, getHistory } = require('seratohistory');

// Get the default Serato path
const seratoPath = getDefaultSeratoPath();

// Obtain the history
const history = await getHistory(seratoPath);
```

## Retrievable Fields
* date
* title
* artist
* bpm
* key
* filePath
* duration
* deck
* notes
* album
* genre
* comment
* grouping
* remixer
* label
* composer
* year