const publisher = require('./../lib/publisher');

publisher({
	changelog: './test/CHANGELOG.md',
	webhookUrl: '',
	versionFormat: '**{{version}} - {{date}}**',
	typeFormat: '*{{type}}*',
	changeFormat: '• {{text}}',
	formatDate: 'Y-m-d',
});