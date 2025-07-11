# .NET Installation and REST API Setup Guide

## 1. Install .NET SDK

### Windows
1. Download .NET SDK from https://dotnet.microsoft.com/download
2. Run the installer and follow the setup wizard
3. Verify installation:
```bash
dotnet --version
```

### macOS
```bash
# Using Homebrew
brew install dotnet

# Or download installer from Microsoft website
```

### Linux (Ubuntu/Debian)
```bash
# Add Microsoft package repository
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

# Install .NET SDK
sudo apt-get update
sudo apt-get install -y dotnet-sdk-8.0
```

### Linux (CentOS/RHEL/Fedora)
```bash
# Add Microsoft package repository
sudo rpm -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm

# Install .NET SDK
sudo yum install dotnet-sdk-8.0
```

## 2. Create REST API Project

### Create new Web API project
```bash
# Create new directory
mkdir MyRestApi
cd MyRestApi

# Create Web API project
dotnet new webapi -n MyRestApi
cd MyRestApi

# Restore packages
dotnet restore
```

### Add Entity Framework packages
```bash
# Add Entity Framework Core
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design

# For PostgreSQL (alternative)
# dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

# For SQLite (alternative)
# dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

## 3. Project Structure
```
MyRestApi/
├── Controllers/
│   ├── WeatherForecastController.cs
│   └── ProductsController.cs
├── Models/
│   ├── Product.cs
│   └── ApplicationDbContext.cs
├── Program.cs
├── appsettings.json
└── MyRestApi.csproj
```

## 4. Configuration

### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyRestApiDB;Trusted_Connection=true;TrustServerCertificate=true;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### Program.cs
```csharp
using Microsoft.EntityFrameworkCore;
using MyRestApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

## 5. Database Setup

### Run Entity Framework migrations
```bash
# Create initial migration
dotnet ef migrations add InitialCreate

# Update database
dotnet ef database update
```

### For PostgreSQL connection string
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=MyRestApiDB;Username=postgres;Password=password123"
}
```

## 6. Run the Application

```bash
# Run the application
dotnet run

# Or with hot reload (development)
dotnet watch run
```

The API will be available at:
- HTTPS: https://localhost:7xxx
- HTTP: http://localhost:5xxx
- Swagger UI: https://localhost:7xxx/swagger

## 7. Useful Commands

```bash
# Check .NET version
dotnet --version

# List installed SDKs
dotnet --list-sdks

# Create new project templates
dotnet new --list

# Add package
dotnet add package PackageName

# Remove package
dotnet remove package PackageName

# Clean build
dotnet clean

# Build project
dotnet build

# Run tests
dotnet test

# Publish application
dotnet publish -c Release -o ./publish
```

## 8. Development Tools

### Recommended Extensions (VS Code)
- C# for Visual Studio Code
- .NET Extension Pack
- REST Client or Thunder Client
- GitLens

### IDE Options
- **Visual Studio** (Windows/Mac) - Full IDE
- **Visual Studio Code** - Lightweight, cross-platform
- **JetBrains Rider** - Cross-platform .NET IDE

## 9. Next Steps

1. **Add authentication**: JWT, Identity, OAuth
2. **Add validation**: Data annotations, FluentValidation
3. **Add logging**: Serilog, NLog
4. **Add caching**: Redis, MemoryCache
5. **Add documentation**: Swagger/OpenAPI
6. **Add testing**: xUnit, NUnit, MSTest
7. **Add containerization**: Docker, Kubernetes

## 10. Troubleshooting

### Common Issues
- **Port conflicts**: Change ports in launchSettings.json
- **Database connection**: Verify connection string and database server
- **Package restore**: Run `dotnet restore`
- **Migration issues**: Check model changes and database state

### Verify Installation
```bash
dotnet --info
```

This command shows detailed information about your .NET installation.