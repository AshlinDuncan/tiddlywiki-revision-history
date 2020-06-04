// Structure of revisor tiddlers:
// $:/plugins/ashlin/revision-history/revisions/<tiddler name>|<date>|<id>|<author>
// Tagged with: $:/plugins/ashlin/revision-history/revisions/<tiddler name>
// Field: revision-date: timestamp

// Overview:
// $:/plugins/ashlin/revision-history Revision History: <tiddler name>

const baseName = "$:/plugins/ashlin/revision-history/revisions/";
const titleRegexp = new RegExp("^" + escapeRegExp(baseName) + "(.+)\\|(.+)\\|(.+)\\|(.+)$", "gi");
const tagRegexp = new RegExp("^" + escapeRegExp(baseName) + "(.+)$", "gi");
export class Revisor {
	constructor() {}

	addToHistory(name, tiddler) {
		let modified = tiddler.fields.modified;

		if (modified == null) {
			modified = tiddler.fields.created;
		}
		if (modified == null) {
			modified = new Date();
		}

		let author = tiddler.getFieldString("modifier");

		if (!author) author = "<anon>";

		let entry = new $tw.Tiddler(tiddler, {
			title: generateTitle({ name, date: modified.toUTCString(), author }),
			"revision-date": modified.getTime(),
			tags: "[[" + generateTag(name) + "]]",
			"revision-caption": generateCaption({ name, date: modified.toUTCString(), author })
		});

		$tw.wiki.addTiddler(entry);

		console.log("Added tiddler to history: ", name);
	}

	renameHistory(oldName, newName) {
		if (oldName == newName) return;
		if (!oldName.trim() || !newName.trim()) return;
		let history = this.getHistory(oldName);
		if (history.length == 0) return;

		// Loop through and generate names as necessary. In case of matching  names, this will merge, not overwrite.
		for (let title of history) {
			let tiddler = $tw.wiki.getTiddler(title);
			let { date, author } = parseTitle(title);

			let newTiddler = new $tw.Tiddler(tiddler, {
				// Retitle
				title: generateTitle({ name: newName, date, author }),
				// Retag
				tags: "[[" + generateTag(newName) + "]]",
			});

			$tw.wiki.addTiddler(newTiddler);
			$tw.wiki.deleteTiddler(title);
		}

		console.log("Renamed history from", oldName, "to", newName);
	}

	// Returns a list of tiddler names of the various versions, sorted by date
	getHistory(name) {
		return $tw.wiki.getTiddlersWithTag(generateTag(name));
	}

	// Returns whether history exists for this tiddler
	historyExists(name) {
		return this.getHistory(name).length != 0;
	}

	// Removes the history for this tiddler
	removeHistory(name) {
		if (!name.trim()) return;
		let history = this.getHistory(name);
		for (let title of history) {
			$tw.wiki.deleteTiddler(title);
		}
		console.log("Removed history: ", name);
	}
}

export function parseTitle(title) {
	let matches = [...title.matchAll(titleRegexp)][0];
	return {
		name: matches[1],
		date: matches[2],
		id: matches[3],
		author: matches[4],
	}
}

export function generateTitle({ name, date, author }) {
	let id = 0;
	let title;
	do {
		title = `${baseName}${name}|${date}|${id}|${author}`;
		id++;
	} while ($tw.wiki.tiddlerExists(title));
	return title;
}

export function generateCaption({ name, date, author }) {
	return `${name}: ${date} - ${author}`;
}

export function generateUITitle(name) {
	return `${baseName} Revision History: ${name}`;
}

export function parseTag(tag) {
	matches = tag.matchAll(tagRegexp);
	return matches[0];
}

export function generateTag(name) {
	return `${baseName}${name}`;
}

export function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}