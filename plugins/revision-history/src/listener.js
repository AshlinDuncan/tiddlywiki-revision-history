"use strict";
import { Revisor, generateTag } from './revisor.js';

// Constructs a revisor and listens for changes to put in it
export function startup() {
	let revisor = new Revisor();
	$tw.hooks.addHook("th-saving-draft", (draft, newTiddler) => {
		// Not overwriting anything; no revision necessary!
		let oldTitle = draft.getFieldString("draft.of");
		if (!oldTitle) return newTiddler;
    	let oldTiddler = $tw.wiki.getTiddler(oldTitle);
    	if (!oldTiddler) return newTiddler;

    	let newTitle = newTiddler.getFieldString("title");

		if ($tw.wiki.isSystemTiddler(newTitle)) return newTiddler;
		if ($tw.wiki.isShadowTiddler(newTitle)) return newTiddler;
		if ($tw.wiki.isSystemTiddler(oldTitle)) return newTiddler;
		if ($tw.wiki.isShadowTiddler(oldTitle)) return newTiddler;

    	if (oldTitle != newTitle) {
    		revisor.renameHistory(oldTitle, newTitle);
    	}

    	// If we're overwriting...
    	if (oldTitle != newTitle && $tw.wiki.tiddlerExists(newTitle)) {
    		revisor.addToHistory(newTitle, $tw.wiki.getTiddler(newTitle));
    	}

    	let newText = newTiddler.getFieldString("text");
    	let oldText = oldTiddler.getFieldString("text");

    	// No textual changes!
    	if (oldText == newText) {
    		return newTiddler;
    	}

    	revisor.addToHistory(newTitle, oldTiddler);
    	newTiddler = new $tw.Tiddler(newTiddler, { "revision-tag": generateTag(newTitle)});

    	return newTiddler; 
	});
}