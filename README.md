# Revision History for TiddlyWiki
A bare-bones TiddlyWiki plugin to provide revision history for saved Tiddlers.

## Installation

**Quick Install (recommended)**: Visit the Demo and follow the quick-install instructions there.

**Building:** Clone the git repo, go to the src directory, and run `npm install` and then `npm run build-plugin`. Then, import the generated `.tid` file from ./build into your project.

## Usage
Once a tiddler has been edited, Revision History will intercept edits and save the old version as system tiddlers. To view a listing of revisions, click the "Info" button on a tiddler, and go to the "Revisions" tab.

Only tiddlers with a "text" field will have revision history available.

If a tiddler is deleted, the revision history remains (although the deleted version is not included). It can be found in system tiddlers through advanced search, or retrieved by adding a tiddler of the same title, revising it, and then checking revision history.

In larger projects, space may become an issue. There is currently no limit on how many revision tiddlers can be generated.

**An Important Note**: This plugin overrides the `navigator.js` from `$:/core` in order to provide a single hook that exposes access to the draft. This plugin requires that access in order to support carrying revision history across renames. Ideally, this hook could be added to TiddlyWiki, or perhaps there is a better solution already implemented.

## Future Improvements
Although I don't actively develop this project, some possible future improvements:
* Better handling for deleted tiddlers: when a tiddler is removed, save its revision history, or, by a config option, delete the entire revision history.
* Allow clearing revision history after x amount of entries per tiddler
* Find a better option than overwriting `navigator.js` for hook support. Possibly, getting a draft hook into the main TiddlyWiki repository.
