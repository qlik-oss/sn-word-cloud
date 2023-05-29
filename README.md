# @nebula.js/sn-word-cloud
The word cloud is built using d3 and d3-cloud. It was originally forked from cleveranjos/br.com.clever.wordcloud and has since been converted to use Nebula.

This extension is part of the extension bundles for Qlik Sense. The repository is maintained and moderated by Qlik R&D.

## Legacy build
The chart before Nebula conversion and dependency updates can be found on the release/legacy branch.

Feel free to fork and suggest pull requests for improvements and bug fixes. Changes will be moderated and reviewed before inclusion in future bundle versions. Please note that emphasis is on backward compatibility, i.e. breaking changes will most likely not be approved.

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
  element: document.querySelector('.wordcloud'),
  type: 'qlik-word-cloud',
  fields: ['WordsField', '=Sum(SizeField)'],
  properties: {
    title: 'Word cloud',
  },
});
```
# Original author

[github.com/cleveranjos](https://github.com/cleveranjos)

## License

`@nebula.js/sn-word-cloud` is [MIT licensed](./LICENSE).