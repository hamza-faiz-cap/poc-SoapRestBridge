"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const xml_js_1 = require("xml-js");
const SPRING_SOAP_URL = 'http://localhost:8081/ws/';
let UsersController = UsersController_1 = class UsersController {
    logger = new common_1.Logger(UsersController_1.name);
    async getAllUsers() {
        const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">\n        <soapenv:Header/>\n        <soapenv:Body>\n          <ListUsersRequest/>\n        </soapenv:Body>\n      </soapenv:Envelope>\n    `;
        try {
            this.logger.log('Sending SOAP request to list users');
            const response = await axios_1.default.post(SPRING_SOAP_URL, soapEnvelope, {
                headers: { 'Content-Type': 'text/xml', 'SOAPAction': '' },
            });
            this.logger.debug(`SOAP response: ${response.data}`);
            const result = (0, xml_js_1.xml2js)(response.data, { compact: true });
            let users = [];
            try {
                const userList = result['soap:Envelope']['soap:Body']['ns2:GetAllUsersResponse']['ns2:users'];
                if (Array.isArray(userList)) {
                    users = userList.map((u) => ({
                        id: Number(u['ns2:id']._text),
                        name: u['ns2:name']._text,
                        email: u['ns2:email']._text,
                    }));
                }
                else if (userList) {
                    users = [{
                            id: Number(userList['ns2:id']._text),
                            name: userList['ns2:name']._text,
                            email: userList['ns2:email']._text,
                        }];
                }
            }
            catch (parseErr) {
                this.logger.error('Error parsing users from SOAP response', parseErr);
            }
            return users;
        }
        catch (err) {
            this.logger.error('SOAP service error (list users)', err);
            throw new common_1.HttpException('SOAP service error', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async addUser(user) {
        const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:usr=\"http://example.com/users\">\n        <soapenv:Header/>\n        <soapenv:Body>\n          <usr:AddUserRequest>\n            <usr:name>${user.name}</usr:name>\n            <usr:email>${user.email}</usr:email>\n          </usr:AddUserRequest>\n        </soapenv:Body>\n      </soapenv:Envelope>\n    `;
        try {
            this.logger.log(`Sending SOAP request to add user: ${JSON.stringify(user)}`);
            const response = await axios_1.default.post(SPRING_SOAP_URL, soapEnvelope, {
                headers: { 'Content-Type': 'text/xml', 'SOAPAction': '' },
            });
            this.logger.debug(`SOAP response: ${response.data}`);
            const result = (0, xml_js_1.xml2js)(response.data, { compact: true });
            let addedUser = { name: user.name, email: user.email };
            try {
                const userNode = result['soap:Envelope']['soap:Body']['ns2:AddUserResponse']['ns2:user'];
                addedUser = {
                    id: Number(userNode['ns2:id']._text),
                    name: userNode['ns2:name']._text,
                    email: userNode['ns2:email']._text,
                };
            }
            catch (parseErr) {
                this.logger.error('Error parsing added user from SOAP response', parseErr);
            }
            return addedUser;
        }
        catch (err) {
            this.logger.error('SOAP service error (add user)', err);
            throw new common_1.HttpException('SOAP service error', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUser", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, common_1.Controller)('users')
], UsersController);
//# sourceMappingURL=users.controller.js.map