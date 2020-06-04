# Revision History for TiddlyWiki
A bare-bones TiddlyWiki plugin to provide revision history for saved Tiddlers.

[View Demo](https://ashlinduncan.github.io/tiddlywiki-revision-history/)

## Installation

**Quick Install (recommended)**: Visit the [Demo](https://ashlinduncan.github.io/tiddlywiki-revision-history/) and follow the quick-install instructions there.

**Building:**
* Clone the git repo
* Run `npm install`
* Run `npm run build-plugin`.
* Then, import the generated `.tid` file from ./build into your project, either by drag-and-drop or another import strategy.

## Usage
Once a Tiddler has been edited, Revision History will intercept edits and save the old version as system Tiddlers. To view a listing of revisions, click the "Info" button on a Tiddler, and go to the "Revisions" tab.

Only Tiddlers with a "text" field will have revision history available. System and Shadow Tiddlers are also excluded.

If a Tiddler is deleted, the revision history remains (although the deleted version is not included). It can be found in system Tiddlers through advanced search, or retrieved by adding a Tiddler of the same title, revising it, and then checking revision history.

In larger projects, space may become an issue. There is currently no limit on how many revision Tiddlers can be generated.

**An Important Note**: This plugin overrides the `navigator.js` from `$:/core` in order to provide a single hook that exposes access to the draft. This plugin requires that access in order to support carrying revision history across renames. Ideally, this hook could be added to TiddlyWiki, or perhaps there is a better solution already implemented. Basically, watch out for incompatabilities.

## Future Improvements
Although I don't actively develop this project, some possible future improvements:
* Better handling for deleted Tiddlers: when a Tiddler is removed, save its revision history, or, by a config option, delete the entire revision history.
* Allow clearing revision history after x amount of entries per Tiddler
* Find a better option than overwriting `navigator.js` for hook support. Possibly, getting a draft hook into the main TiddlyWiki repository.
* Improve the version view. Rather than just opening an old Tiddler, it should provide diff support and the ability to restore from a version.
