$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"
$env:npm_config_audit = "false"

function Read-SecretValue {
    param([Parameter(Mandatory = $true)][string]$Prompt)

    $secureValue = Read-Host -Prompt $Prompt -AsSecureString
    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureValue)
    try {
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
        $secureValue.Dispose()
    }
}

if (-not (Test-Path ".netlify\state.json")) {
    throw "This folder is not linked to the Netsorax Netlify site. Run the script from the project root."
}

$pooledUrl = Read-SecretValue "Neon pooled URL (input hidden)"
$directUrl = Read-SecretValue "Neon direct, unpooled URL (input hidden)"

if ($pooledUrl -notmatch '^postgres(ql)?://') {
    throw "Netlify DATABASE_URL must be a PostgreSQL URL."
}
if ($directUrl -notmatch '^postgres(ql)?://') {
    throw "Netlify DIRECT_URL must be a PostgreSQL URL."
}

try {
    $env:DATABASE_URL = $pooledUrl
    $env:DIRECT_URL = $directUrl
    $pooledUrl = $null
    $directUrl = $null

    Write-Host "Applying production PostgreSQL migrations..."
    npm run db:deploy
    if ($LASTEXITCODE -ne 0) {
        throw "The PostgreSQL migration failed. No deployment was started."
    }

    Write-Host "Building and deploying to Netlify..."
    npx --yes netlify-cli@27.12.1 deploy --prod --context production --message "Netsorax production deployment"
    if ($LASTEXITCODE -ne 0) {
        throw "The Netlify deployment failed."
    }
}
finally {
    Remove-Item Env:DATABASE_URL -ErrorAction SilentlyContinue
    Remove-Item Env:DIRECT_URL -ErrorAction SilentlyContinue
    $pooledUrl = $null
    $directUrl = $null
}
