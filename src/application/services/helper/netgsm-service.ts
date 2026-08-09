import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { create } from 'xmlbuilder2';

@Injectable()
export class NetgsmService {
  private readonly logger = new Logger(NetgsmService.name);
 /*  createSmsXml(code: string, phoneNumber: string): string {
    code=code +" is your Matesbridge confirmation code. Don’t share it with anyone.";
    // Construct the XML using xmlbuilder2
    const xml = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('mainbody')
        .ele('header')
          .ele('company', { dil: 'TR' }).txt('Netgsm').up()
          .ele('usercode').txt('8503077530').up()
          .ele('password').txt('9D@FF95').up()
          .ele('type').txt('1:n').up()
          .ele('appkey').txt('faad275de9b6a3247290b3b34430f000').up()
          .ele('msgheader').txt('Matesbridge').up()
        .up()
        .ele('body')
          .ele('msg').txt(`<![CDATA[${code}]]>`).up()
          .ele('no').txt(phoneNumber.slice(-11)).up()
        .up()
      .end({ prettyPrint: true });

    return xml;
  } */
     createSmsXml(code: string, phoneNumber: string): string {
      code = `${code} is your Matesbridge confirmation code. Do not share it with anyone.`;
    
      // Construct the XML using xmlbuilder2
      const xml = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('mainbody')
          .ele('header')
            .ele('company', { dil: 'TR' }).txt('Netgsm').up()
            .ele('usercode').txt('8503077530').up()
            .ele('password').txt('9D@FF95').up()
            .ele('type').txt('1:n').up()
            .ele('appkey').txt('faad275de9b6a3247290b3b34430f000').up()
            .ele('msgheader').txt('Matesbridge').up()
          .up()
          .ele('body')
            .ele('msg').txt(`<![CDATA[${code}]]>`).up()
            .ele('no').txt(phoneNumber).up() // Extract last 11 digits of the phone number
          .up()
        .end({ prettyPrint: true });
    
      return xml;
    }
    async sendSms(xmlData: string): Promise<any> {
    try {
      const response = await axios.post('https://api.netgsm.com.tr/sms/send/otp', xmlData, {
        headers: { 'Content-Type': 'application/xml' },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }
}
