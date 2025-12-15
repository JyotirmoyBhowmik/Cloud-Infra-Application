# Initialize Cloud Governance Platform
# This script performs first-time setup including tenant and admin user creation

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Cloud Governance Platform - Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$API_URL = "http://localhost:3001"
$ADMIN_EMAIL = "admin@company.com"
$TENANT_NAME = "Default Organization"
$BILLING_GROUP = "Enterprise"

# Function to test API connectivity
function Test-ApiConnection {
    Write-Host "[INFO] Testing API connectivity..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "$API_URL/tenants" -Method GET -ErrorAction Stop
        Write-Host "[SUCCESS] API is accessible" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "[ERROR] Cannot connect to API at $API_URL" -ForegroundColor Red
        Write-Host "[ERROR] Make sure the API is running: cd apps\api && npm run start:dev" -ForegroundColor Red
        return $false
    }
}

# Function to test database connectivity
function Test-DatabaseConnection {
    Write-Host "[INFO] Testing database connectivity..." -ForegroundColor Yellow
    try {
        $result = docker exec governance_db pg_isready -U admin -d governance_platform 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[SUCCESS] Database is accessible" -ForegroundColor Green
            return $true
        }
        else {
            Write-Host "[ERROR] Database is not ready" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "[ERROR] Docker is not running or database container not found" -ForegroundColor Red
        Write-Host "[ERROR] Run: docker-compose up -d" -ForegroundColor Red
        return $false
    }
}

# Function to check if tenant exists
function Test-TenantExists {
    try {
        $tenants = Invoke-RestMethod -Uri "$API_URL/tenants" -Method GET
        if ($tenants.Count -gt 0) {
            Write-Host "[INFO] Found $($tenants.Count) existing tenant(s)" -ForegroundColor Yellow
            foreach ($tenant in $tenants) {
                Write-Host "  - $($tenant.name) (ID: $($tenant.id))" -ForegroundColor Gray
            }
            return $true
        }
        return $false
    }
    catch {
        Write-Host "[ERROR] Failed to check existing tenants" -ForegroundColor Red
        return $false
    }
}

# Function to create tenant with admin user
function New-TenantWithAdmin {
    param(
        [string]$TenantName,
        [string]$AdminEmail,
        [string]$BillingGroup
    )
    
    Write-Host "[INFO] Creating tenant: $TenantName" -ForegroundColor Yellow
    Write-Host "[INFO] Admin user: $AdminEmail" -ForegroundColor Yellow
    
    $body = @{
        name = $TenantName
        billing_group = $BillingGroup
        data_retention_days = 365
        userId = $AdminEmail
    } | ConvertTo-Json
    
    try {
        $tenant = Invoke-RestMethod -Uri "$API_URL/tenants/onboard" `
            -Method POST `
            -Body $body `
            -ContentType "application/json" `
            -ErrorAction Stop
        
        Write-Host "[SUCCESS] Tenant created successfully!" -ForegroundColor Green
        Write-Host "  Tenant ID: $($tenant.id)" -ForegroundColor Gray
        Write-Host "  Name: $($tenant.name)" -ForegroundColor Gray
        Write-Host "  Billing Group: $($tenant.billing_group)" -ForegroundColor Gray
        
        return $tenant
    }
    catch {
        Write-Host "[ERROR] Failed to create tenant" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        return $null
    }
}

# Function to verify admin permissions
function Test-AdminPermissions {
    param(
        [string]$UserId,
        [string]$TenantId
    )
    
    Write-Host "[INFO] Verifying admin permissions..." -ForegroundColor Yellow
    
    try {
        $permissions = Invoke-RestMethod -Uri "$API_URL/rbac/permissions?userId=$UserId&tenantId=$TenantId" `
            -Method GET `
            -ErrorAction Stop
        
        if ($permissions.Count -gt 0) {
            Write-Host "[SUCCESS] Admin has $($permissions.Count) permissions:" -ForegroundColor Green
            foreach ($perm in $permissions) {
                Write-Host "  ✓ $perm" -ForegroundColor Gray
            }
            return $true
        }
        else {
            Write-Host "[WARNING] No permissions found for admin user" -ForegroundColor Yellow
            return $false
        }
    }
    catch {
        Write-Host "[ERROR] Failed to verify permissions" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        return $false
    }
}

# Function to display database stats
function Show-DatabaseStats {
    Write-Host "[INFO] Database Statistics:" -ForegroundColor Yellow
    
    $queries = @{
        "Tenants" = "SELECT COUNT(*) FROM tenant"
        "Roles" = "SELECT COUNT(*) FROM role"
        "User-Role Assignments" = "SELECT COUNT(*) FROM user_role"
        "Cloud Accounts" = "SELECT COUNT(*) FROM cloud_account"
    }
    
    foreach ($item in $queries.GetEnumerator()) {
        try {
            $result = docker exec governance_db psql -U admin -d governance_platform -t -c $item.Value 2>$null
            $count = [int]$result.Trim()
            Write-Host "  $($item.Key): $count" -ForegroundColor Gray
        }
        catch {
            Write-Host "  $($item.Key): Error" -ForegroundColor Red
        }
    }
}

# Main execution
Write-Host "Step 1: Pre-flight Checks" -ForegroundColor Cyan
Write-Host "-------------------------" -ForegroundColor Cyan

if (-not (Test-DatabaseConnection)) {
    Write-Host ""
    Write-Host "[FAILED] Database is not accessible. Please start Docker services." -ForegroundColor Red
    Write-Host "Run: docker-compose up -d" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-ApiConnection)) {
    Write-Host ""
    Write-Host "[FAILED] API is not accessible. Please start the API server." -ForegroundColor Red
    Write-Host "Run: cd apps\api && npm run start:dev" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Step 2: Tenant Setup" -ForegroundColor Cyan
Write-Host "-------------------" -ForegroundColor Cyan

$existingTenants = Test-TenantExists

if ($existingTenants) {
    Write-Host ""
    $response = Read-Host "Tenant(s) already exist. Create another? (y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "[INFO] Skipping tenant creation" -ForegroundColor Yellow
        
        # Get first tenant for verification
        $tenants = Invoke-RestMethod -Uri "$API_URL/tenants" -Method GET
        $tenant = $tenants[0]
        
        Write-Host ""
        Write-Host "Step 3: Verification" -ForegroundColor Cyan
        Write-Host "-------------------" -ForegroundColor Cyan
        Test-AdminPermissions -UserId $ADMIN_EMAIL -TenantId $tenant.id
        
        Write-Host ""
        Show-DatabaseStats
        
        Write-Host ""
        Write-Host "[INFO] Setup verification complete" -ForegroundColor Green
        exit 0
    }
    
    # Prompt for new tenant details
    Write-Host ""
    $TENANT_NAME = Read-Host "Enter tenant name"
    $ADMIN_EMAIL = Read-Host "Enter admin email"
    $BILLING_GROUP = Read-Host "Enter billing group (optional)"
}

$tenant = New-TenantWithAdmin -TenantName $TENANT_NAME -AdminEmail $ADMIN_EMAIL -BillingGroup $BILLING_GROUP

if ($null -eq $tenant) {
    Write-Host ""
    Write-Host "[FAILED] Setup incomplete" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Verification" -ForegroundColor Cyan
Write-Host "-------------------" -ForegroundColor Cyan

$permissionsOk = Test-AdminPermissions -UserId $ADMIN_EMAIL -TenantId $tenant.id

Write-Host ""
Show-DatabaseStats

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tenant ID: $($tenant.id)" -ForegroundColor White
Write-Host "Admin User: $ADMIN_EMAIL" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Start the frontend: cd apps\web && npm run dev" -ForegroundColor Gray
Write-Host "2. Open browser: http://localhost:3000" -ForegroundColor Gray
Write-Host "3. Add cloud accounts via Settings" -ForegroundColor Gray
Write-Host ""
