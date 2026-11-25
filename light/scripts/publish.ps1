param(
    [string]$PackagePath = "eduser-light-theme-0.1.9.vsix"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $PackagePath)) {
    throw "VSIX package not found: $PackagePath"
}

$secureToken = Read-Host "Azure DevOps PAT with Marketplace Manage scope" -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)

try {
    $plainToken = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    $env:VSCE_PAT = $plainToken

    npm run validate
    vsce publish --packagePath $PackagePath --allow-missing-repository
}
finally {
    Remove-Item Env:VSCE_PAT -ErrorAction SilentlyContinue

    if ($bstr -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }
}
