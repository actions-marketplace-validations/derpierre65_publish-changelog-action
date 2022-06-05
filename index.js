const core = require('@actions/core');
const publisher = require('./lib/publisher');

(async () => {
	try {
		await publisher({
			changelog: core.getInput('changelog'),
			webhookUrl: core.getInput('webhook-url'),
			versionFormat: core.getInput('format-version'),
			typeFormat: core.getInput('format-type'),
			changeFormat: core.getInput('format-change'),
			formatDate: core.getInput('format-date'),
		});
	}
	catch (error) {
		core.setFailed(error.message);
	}
})();