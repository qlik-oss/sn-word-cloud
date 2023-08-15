# sn-word-cloud
A word cloud chart aimed to be used in nebula.js built using d3 and d3-cloud.

This extension is part of the extension bundles for Qlik Sense. The repository is maintained and moderated by Qlik R&D.
## Requirements

Requires `@nebula.js/stardust` version `2.0.0` or later.

## Installing

If you use npm: `npm install @nebula.js/sn-word-cloud`.

You can also load through the script tag directly from [https://unpkg.com](https://unpkg.com/@nebula.js/sn-word-cloud).

## Usage

```js
import { embed } from '@nebula.js/stardust';
import word from '@nebula.js/sn-word-cloud';

// 'app' is an enigma app model
const nuked = embed(app, {
  types: [
    {
      // register word cloud - qlik-word-cloud is the default name in sense
      name: 'qlik-word-cloud',
      load: () => Promise.resolve(wordcloud),
    },
  ],
});

// Rendering a simple word cloud
nuked.render({
  element: document.querySelector('.wordCloud'),
  type: 'qlik-word-cloud',
  fields: ['WordsField', '=Sum(SizeField)'],
  properties: {
    title: 'Word cloud',
  },
});
```

## License

`@nebula.js/sn-word-cloud` is [MIT licensed](./LICENSE).

## Original author

[github.com/cleveranjos](https://github.com/cleveranjos)