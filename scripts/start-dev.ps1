$ErrorActionPreference = "Stop"

Push-Location $PSScriptRoot
try {
    .\start-mysql.ps1
} finally {
    Pop-Location
}

Push-Location (Split-Path $PSScriptRoot -Parent)
try {
    node app.js
} finally {
    Pop-Location
}