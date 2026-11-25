# Publishing EDUSER Light Theme

This extension is ready to publish through `vsce`.

## Current package

- Extension id: `eduser.eduser-light-theme`
- Display name: `EDUSER Light Theme`
- Version: `0.1.9`
- VSIX: `eduser-light-theme-0.1.9.vsix`

## Requirements

1. A Visual Studio Marketplace publisher with id `eduser`.
2. An Azure DevOps Personal Access Token with:
   - Organization: All accessible organizations
   - Scopes: Marketplace > Manage

Official docs:

- https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- https://code.visualstudio.com/api/extension-guides/color-theme

## Validate

```bash
npm run validate
```

## Package

```bash
vsce package --allow-missing-repository
```

## Publish with PAT

Use one of these methods.

### Recommended: local secure prompt

```powershell
.\scripts\publish.ps1
```

The script asks for the PAT with a hidden PowerShell prompt, validates JSON, publishes the generated VSIX, then removes `VSCE_PAT` from the session.

### Option A: Login once

```bash
vsce login eduser
vsce publish --allow-missing-repository
```

### Option B: Publish the generated VSIX

```bash
vsce publish --packagePath eduser-light-theme-0.1.9.vsix --allow-missing-repository -p <YOUR_PAT>
```

### Option C: Environment variable

```bash
$env:VSCE_PAT = "<YOUR_PAT>"
vsce publish --packagePath eduser-light-theme-0.1.9.vsix --allow-missing-repository
Remove-Item Env:VSCE_PAT
```

Do not commit or share the PAT.
