# EDUSER Light Theme

Professional clean white VS Code light theme for the EDUSER ecosystem.

The theme is tuned for education and software development workflows where readability, strong contrast and predictable syntax grouping matter. SQL, HTML, CSS, JavaScript and Python token colors are configured separately.

## Features

- Clean white editor and workbench background
- EDUSER blue-red accent palette
- High-contrast cursor, selection and current line colors
- Separate syntax groups for SQL, HTML, CSS, JavaScript and Python
- Light UI styling for Activity Bar, Sidebar, Title Bar, Status Bar and Panel

## Installation

### From VSIX

1. Download the `.vsix` package.
2. In VS Code, open **Extensions**.
3. Select **Install from VSIX...**.
4. Choose **EDUSER Light Theme** from the Color Theme picker.

### From Marketplace

After publishing, install it from the Visual Studio Marketplace by searching for **EDUSER Light Theme**.

## Publishing

Install the VS Code extension publishing tool:

```bash
npm install -g @vscode/vsce
```

Validate the package:

```bash
npm run validate
```

Create a local VSIX package:

```bash
vsce package
```

Publish to Marketplace:

```bash
vsce login eduser
vsce publish
```

The publisher id in `package.json` is currently `eduser`. If your Marketplace publisher id is different, update the `publisher` field before publishing.

## Recommended personal settings

These are user preferences and are not forced by the theme:

```json
{
  "workbench.iconTheme": "material-icon-theme",
  "editor.fontFamily": "'Consolas', 'Open Sans', 'Roboto Mono', 'Ubuntu Mono', 'Monaspace Neon', monospace",
  "editor.fontSize": 16,
  "editor.fontWeight": "500",
  "editor.lineHeight": 1.2,
  "editor.semanticHighlighting.enabled": true
}
```

## License

MIT
