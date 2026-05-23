$ErrorActionPreference = "Stop"

$containerName = "gestor-mysql"

function Test-ContainerExists {
    param([string]$Name)

    return [bool](docker ps -a --format "{{.Names}}" | Where-Object { $_ -eq $Name })
}

function Test-ContainerRunning {
    param([string]$Name)

    return [bool](docker ps --format "{{.Names}}" | Where-Object { $_ -eq $Name })
}

function Wait-ForMySql {
    param([string]$Name)

    $attempts = 30
    while ($attempts -gt 0) {
        $ping = docker exec $Name mysqladmin ping -h 127.0.0.1 -u gestor -pgestor --silent 2>$null

        if ($LASTEXITCODE -eq 0) {
            return
        }

        Start-Sleep -Seconds 1
        $attempts--
    }

    throw "MySQL no respondió a tiempo dentro del contenedor $Name."
}

if (Test-ContainerExists -Name $containerName) {
    if (-not (Test-ContainerRunning -Name $containerName)) {
        docker start $containerName | Out-Null
    }
} else {
    docker compose up -d db | Out-Null
}

Wait-ForMySql -Name $containerName
Write-Host "MySQL listo en el contenedor $containerName."