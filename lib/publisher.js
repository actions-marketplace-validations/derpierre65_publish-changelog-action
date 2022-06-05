const fs = require('fs');
const formatDate = require('./date');
const changelogParser = require('@release-notes/changelog-parser');
const axios = require('axios');

function replaceString(template, variables) {
	return template.replace(/{{\s?([a-z_]*)\s?}}/gi, (match, variable) => variables[variable] || '');
}

module.exports = function (options) {
	const changelog = fs.readFileSync(options.changelog).toString();
	const releaseNotes = changelogParser.parse(changelog);
	const json = releaseNotes.toJSON();
	const content = [];

	for (const version of json.releases) {
		if (version.version.toLowerCase() !== 'unreleased') {
			const versionData = {
				version: version.version.replace(/-/g, ' '),
				date: formatDate(version.date, 'Y-m-d'),
			};

			content.push(replaceString(options.versionFormat, versionData));

			for (const key of Object.keys(version)) {
				if (key === 'version' || key === 'date') {
					continue;
				}

				content.push(replaceString(options.typeFormat, {
					type: key.substring(0, 1).toUpperCase() + key.substring(1),
				}));

				for (const entry of version[key]) {
					content.push(replaceString(options.changeFormat, {
						text: entry,
					}));
				}

				content.push('');
			}

			break;
		}
	}

	while (content[content.length - 1] === '') {
		content.pop();
	}

	if (!options.webhookUrl) {
		return Promise.resolve(content.join('\n'));
	}

	return axios.post(options.webhookUrl, {
		content: content.join('\n'),
	});
};