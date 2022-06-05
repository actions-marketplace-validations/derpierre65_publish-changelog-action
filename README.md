# Publish Changelog Action

This action send the latest changelog to given webhook url. 

## Inputs
### `webhook-url`
**Required** The webhook url that to be called.
### `changelog`
File location for the CHANGELOG.md file. Default `./CHANGELOG.md`.
### `format-date`
Format for a date. Default `Y-m-d`.
### `format-version`
Format for the version line (available variables: `version` and `date`). Default `**{{version}} - {{date}}**`.
### `format-type`
Format for the type of change (added, changed, fixed, ...). Default `*{{type}}*`.
### `format-change`
Format for a line of change. Default `• {{text}}`.

## Example usage

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v2

  - uses: derpierre65/publish-changelog-action@v1
    with:
      webhook-url: ${{ secrets.PUBLISH_CHANGELOG_WEBHOOK_URL }}
```

Will generate this:

```text
**1.0.0 - 2022-01-25**
*Added*
• Added Feature

*Fixed*
• Fixed Feature
```

## Example usage with changed options

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v2

  - uses: derpierre65/publish-changelog-action@v1
    with:
      webhook-url: ${{ secrets.PUBLISH_CHANGELOG_WEBHOOK_URL }}
      changelog: './CHANGELOG_PUBLIC.md' 
      format-date: 'Y.m.d'
      format-version: 'New version {{version}} is now available ({{date}})'
      format-type: '{{type}}:'
      format-change: '- {{text}}'
```

Will generate this:

```text
New version 1.0.0 is now available (2022.01.25)
Added:
- Added Feature

Fixed:
- Fixed Feature
```