# poc-SoaprestBridge

This repository contains three interconnected projects:

## 1. Spring Boot SOAP Service (`springboot-soap-users`)
Provides SOAP endpoints for adding and retrieving users (fields: id, name, email).
Default port: `8081` (SOAP endpoint: http://localhost:8081/ws)

**Run commands:**
```powershell
cd springboot-soap-users
mvn spring-boot:run
```

## 2. NestJS REST-SOAP Bridge (`nestjs-rest-soap-bridge`)
Acts as a REST-to-SOAP bridge, connecting the Angular frontend (REST) to the Spring Boot backend (SOAP).
Default port: `3000` (REST endpoint: http://localhost:3000)

**Run commands:**
```powershell
cd nestjs-rest-soap-bridge
npm install
npm run start
```

## 3. Angular Frontend (`angular-users`)
Allows users to add and list users via REST API calls.
Default port: `4200` (Frontend: http://localhost:4200)

**Run commands:**
```powershell
cd angular-users
npm install
ng serve
```

---

## Project Structure
- `springboot-soap-users/` - Spring Boot SOAP backend
- `nestjs-rest-soap-bridge/` - NestJS REST-SOAP bridge
- `angular-users/` - Angular frontend

## Usage
1. Start the Spring Boot SOAP service (`http://localhost:8081/ws`).
2. Start the NestJS bridge (`http://localhost:3000`).
3. Start the Angular frontend (`http://localhost:4200`).
4. Access the Angular app in your browser at http://localhost:4200.

## Notes
- Ensure each service runs in a separate terminal window.
- The Angular app communicates with the NestJS bridge, which in turn interacts with the Spring Boot SOAP backend.
