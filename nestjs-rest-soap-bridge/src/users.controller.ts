import { Controller, Get, Post, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios from 'axios';
import { xml2js } from 'xml-js';

interface User {
  id?: number;
  name: string;
  email: string;
}

const SPRING_SOAP_URL = 'http://localhost:8081/ws/'; // Update if needed

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  @Get()
  async getAllUsers(): Promise<User[]> {
    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">\n        <soapenv:Header/>\n        <soapenv:Body>\n          <ListUsersRequest/>\n        </soapenv:Body>\n      </soapenv:Envelope>\n    `;
    try {
      this.logger.log('Sending SOAP request to list users');
      const response = await axios.post(SPRING_SOAP_URL, soapEnvelope, {
        headers: { 'Content-Type': 'text/xml', 'SOAPAction': '' },
      });
      this.logger.debug(`SOAP response: ${response.data}`);
      const result = xml2js(response.data, { compact: true });
      // Defensive mapping for users array
      let users: User[] = [];
      try {
        const userList = result['soap:Envelope']['soap:Body']['ns2:GetAllUsersResponse']['ns2:users'];
        if (Array.isArray(userList)) {
          users = userList.map((u: any) => ({
            id: Number(u['ns2:id']._text),
            name: u['ns2:name']._text,
            email: u['ns2:email']._text,
          }));
        } else if (userList) {
          users = [{
            id: Number(userList['ns2:id']._text),
            name: userList['ns2:name']._text,
            email: userList['ns2:email']._text,
          }];
        }
      } catch (parseErr) {
        this.logger.error('Error parsing users from SOAP response', parseErr);
      }
      return users;
    } catch (err) {
      this.logger.error('SOAP service error (list users)', err);
      throw new HttpException('SOAP service error', HttpStatus.BAD_GATEWAY);
    }
  }

  @Post()
  async addUser(@Body() user: User): Promise<User> {
    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:usr=\"http://example.com/users\">\n        <soapenv:Header/>\n        <soapenv:Body>\n          <usr:AddUserRequest>\n            <usr:name>${user.name}</usr:name>\n            <usr:email>${user.email}</usr:email>\n          </usr:AddUserRequest>\n        </soapenv:Body>\n      </soapenv:Envelope>\n    `;
    try {
      this.logger.log(`Sending SOAP request to add user: ${JSON.stringify(user)}`);
      const response = await axios.post(SPRING_SOAP_URL, soapEnvelope, {
        headers: { 'Content-Type': 'text/xml', 'SOAPAction': '' },
      });
      this.logger.debug(`SOAP response: ${response.data}`);
      const result = xml2js(response.data, { compact: true });
      let addedUser: User = { name: user.name, email: user.email };
      try {
        const userNode = result['soap:Envelope']['soap:Body']['ns2:AddUserResponse']['ns2:user'];
        addedUser = {
          id: Number(userNode['ns2:id']._text),
          name: userNode['ns2:name']._text,
          email: userNode['ns2:email']._text,
        };
      } catch (parseErr) {
        this.logger.error('Error parsing added user from SOAP response', parseErr);
      }
      return addedUser;
    } catch (err) {
      this.logger.error('SOAP service error (add user)', err);
      throw new HttpException('SOAP service error', HttpStatus.BAD_GATEWAY);
    }
  }
}