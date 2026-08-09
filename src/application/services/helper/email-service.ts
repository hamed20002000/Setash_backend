import { Injectable } from '@nestjs/common';
import { totp } from 'otplib';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OtpService {
  private transporter;
 
  constructor( private configService: ConfigService) {
    // Configure nodemailer with your email service credentials
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider (e.g., Gmail, Outlook, etc.)
      auth: {
        user: configService.get<string>('EMAIL','matesbridge.api@gmail.com'), // Replace with your email
        pass: configService.get<string>('EMAIL_PASS','jxwn gtho jzro xoyg'), // Replace with your email password or app-specific password
      },
    });

    // Configure otplib
    totp.options = { digits: 4, step: 300 }; // 300 seconds = 5 minutes
  }

  // Generate OTP using otplib
  generateOtp(secret: string): string {
    return totp.generate(secret);
  }

  // Validate OTP
  validateOtp(token: string, secret: string): boolean {
    return totp.verify({ token, secret });
  }

  // Send OTP via email
  async sendOtpEmail(email: string, otp: string): Promise<void> {
    let subject = this.configService.get<string>('OTP_EMAIL_SUBJECT','"Your code is: {{OTP_CODE}}"');
    const otpExpirationMinutes = this.configService.get<string>('OTP_EXPIRATION_MINUTES','2');
    let body = this.configService.get<string>('OTP_EMAIL_BODY','Hello <strong>{{USERNAME}}</strong>,<br>Your code is:<strong> {{OTP_CODE}}</strong>.<br>This code will expire in <strong>{{OTP_EXPIRATION_MINUTES}}</strong> minutes.<br><br>If you did not request this code, please contact us at support@matesbridge.com.<br><br>Thank you,<br>The MatesBridge Team');

    subject=subject.replace('{{OTP_CODE}}', otp);
    // Replace placeholders
    body = body
      .replace('{{USERNAME}}', email)
      .replace('{{OTP_CODE}}', otp)
      .replace('{{OTP_EXPIRATION_MINUTES}}', otpExpirationMinutes.toString());

    const mailOptions = {
      from: this.configService.get<string>('EMAIL','matesbridge.api@gmail.com'), // Replace with your email
      to: email,
      subject: subject,
      html: body,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

@Injectable()
export class EmailService {
  private transporter;
 
  constructor( private configService: ConfigService) {
    // Configure nodemailer with your email service credentials
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider (e.g., Gmail, Outlook, etc.)
      auth: {
        user: configService.get<string>('EMAIL','matesbridge.api@gmail.com'), // Replace with your email
        pass: configService.get<string>('EMAIL_PASS','jxwn gtho jzro xoyg'), // Replace with your email password or app-specific password
      },
    });

    // Configure otplib
    totp.options = { digits: 4, step: 300 }; // 300 seconds = 5 minutes
  }
  async sendForgetPasswordEmail(email: string,token:string): Promise<void> {
    let subject = this.configService.get<string>('FORGET_EMAIL_SUBJECT','Reset Password');
    const expirationMinutes = this.configService.get<string>('FORGET_EXPIRATION_MINUTES','30');
    let body = this.configService.get<string>('FORGET_EMAIL_BODY','Hello <strong>{{USERNAME}}</strong>,<br>You can rest yout password whit bellow link:<strong> {{FORGET_LINK}}</strong>.<br>This Link will expire in <strong>{{FORGET_EXPIRATION_MINUTES}}</strong> minutes.<br><br>If you did not request this code, please contact us at support@matesbridge.com.<br><br>Thank you,<br>The MatesBridge Team');
     var link=this.configService.get<string>('FORGET_URL','https://matesbridge.com:8080/reset-password');
    subject=subject.replace('{{FORGET_LINK}}', link);
    // Replace placeholders
    body = body
      .replace('{{USERNAME}}', email)
      .replace('{{FORGET_LINK}}', link+`?token=${token}`)
      .replace('{{FORGET_EXPIRATION_MINUTES}}', expirationMinutes.toString());

    const mailOptions = {
      from: this.configService.get<string>('EMAIL','matesbridge.api@gmail.com'), // Replace with your email
      to: email,
      subject: subject,
      html: body,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

