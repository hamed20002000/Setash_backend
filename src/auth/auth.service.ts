import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { use } from 'passport';
import { env } from 'process';
import { PasswordService } from 'src/application/services/helper/password.service';
import { UserSpecification } from 'src/application/specifications/user/user-specifications';
import { Users } from 'src/domain/entities/Users';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { JwtPayload, userLoginResultDto } from 'src/presentation/dtos/auth/jwt-payload.dto';
import { LoginDto } from 'src/presentation/dtos/auth/login-dto';
import { FindOptionsRelations } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userRepository: UserRepository, private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) { }

  async login(user: LoginDto) {
    var check = await this.validateUser(user);
    if (!check.isAuthenticate) {
      return check;
    }
    const payload = new JwtPayload(check.user);
    const plainObjectPayload = Object.assign({}, payload);
       if (plainObjectPayload.role.length===0) {
       throw new HttpException("User has no active roles", HttpStatus.UNAUTHORIZED);
    }
    check.access_token = this.jwtService.sign(plainObjectPayload);
    check.user = null;
    return check;
  }
  async loginWithGoogle(email: string) {
    var check = await this.validateUserLogginByGoogle(email);
    if (!check.isAuthenticate) {
      return check;
    }
    const payload = new JwtPayload(check.user);
    const plainObjectPayload = Object.assign({}, payload);
    check.access_token = this.jwtService.sign(plainObjectPayload);
    check.user = null;
    return check;
  }
  async loginWithApple(email: string) {
    var check = await this.validateUserLogginByApple(email);
    if (!check.isAuthenticate) {
      return check;
    }
    const payload = new JwtPayload(check.user);
    const plainObjectPayload = Object.assign({}, payload);
    check.access_token = this.jwtService.sign(plainObjectPayload);
    check.user = null;
    return check;
  }
  async loginForResetPassword(user: LoginDto) {
    var check = await this.validateUserLogginForResetPassword(user.username);
    if (!check.isAuthenticate) {
      return check;
    }
    const payload = new JwtPayload(check.user);
    const plainObjectPayload = Object.assign({}, payload);
    check.access_token = this.jwtService.sign(plainObjectPayload);
    check.user = null;
    return check;
  }
  async generateTokenWithoutLogin(user: Users) {

    const payload = new JwtPayload(user);
    const plainObjectPayload = Object.assign({}, payload);
 
    var access_token = this.jwtService.sign(plainObjectPayload);

    return access_token;
  }
  async validateUser(checkUser: LoginDto): Promise<userLoginResultDto> {

    var result = new userLoginResultDto();
    const specification = new UserSpecification(checkUser.username); // Create a UserSpecification with username and password
    const findOptionsRelation: FindOptionsRelations<Users> = {
      userRoles: {
        role: true,  // This tells TypeORM to load the 'role' relation in userRoles
      },
    };
    const user = await this.userRepository.findWithSpecification(specification, null, null,
      findOptionsRelation,
    );  // Query the user from the database using UserRepository


    if (user && user[0]?.recordStatus == recordStatus.Active) {
      var checkPass = await this.passwordService.comparePasswords(checkUser.password, user[0].password);
      if (checkPass) {
        result.isAuthenticate = true;
        result.user = user[0];
        
        return result;  // Return user if password matches
      }
      else {
        result.isAuthenticate = false;
        result.user = null;
        result.message = "Username or Password is not corrected!";
        return result;  // Return user if password matches
      }
    }
    result.isAuthenticate = false;
    result.user = null;
    result.message = "User is not exist or is inactive!";
    return result;  // Return null if user not found or password doesn't match
  }
  async validateUserLogginByGoogle(email: string): Promise<userLoginResultDto> {

    var result = new userLoginResultDto();
    const specification = new UserSpecification(email); // Create a UserSpecification with username and password
    const findOptionsRelation: FindOptionsRelations<Users> = {
      userRoles: {
        role: true,  // This tells TypeORM to load the 'role' relation in userRoles
      },
    };
    const user = await this.userRepository.findWithSpecification(specification, null, null,
      findOptionsRelation,
    );  // Query the user from the database using UserRepository


    if (user && user[0]?.recordStatus == recordStatus.Active) {

      result.isAuthenticate = true;
      result.user = user[0];
     
      return result;  // Return user if password matches

    }
    result.isAuthenticate = false;
    result.user = null;
    result.message = "User is not exist or is inactive!";
    return result;  // Return null if user not found or password doesn't match
  }
  async validateUserLogginByApple(email: string): Promise<userLoginResultDto> {

    var result = new userLoginResultDto();
    const specification = new UserSpecification(email); // Create a UserSpecification with username and password
    const findOptionsRelation: FindOptionsRelations<Users> = {
      userRoles: {
        role: true,  // This tells TypeORM to load the 'role' relation in userRoles
      },
    };
    const user = await this.userRepository.findWithSpecification(specification, null, null,
      findOptionsRelation,
    );  // Query the user from the database using UserRepository


    if (user && user[0]?.recordStatus == recordStatus.Active) {

      result.isAuthenticate = true;
      result.user = user[0];
     
      return result;  // Return user if password matches

    }
    result.isAuthenticate = false;
    result.user = null;
    result.message = "User is not exist or is inactive!";
    return result;  // Return null if user not found or password doesn't match
  }

  async validateUserLogginForResetPassword(username: string): Promise<userLoginResultDto> {

    var result = new userLoginResultDto();
    const specification = new UserSpecification(username); // Create a UserSpecification with username and password
    const findOptionsRelation: FindOptionsRelations<Users> = {
      userRoles: {
        role: true,  // This tells TypeORM to load the 'role' relation in userRoles
      },
    };
    const user = await this.userRepository.findWithSpecification(specification, null, null,
      findOptionsRelation,
    );  // Query the user from the database using UserRepository


    if (user && user[0]?.recordStatus == recordStatus.Active) {

      result.isAuthenticate = true;
      result.user = user[0];
      return result;  // Return user if password matches

    }
    result.isAuthenticate = false;
    result.user = null;
    result.message = "User is not exist or is inactive!";
    return result;  // Return null if user not found or password doesn't match
  }
  parseJwt(token: string): any {
    try {
      // Decode the JWT payload without verifying
      const decoded = this.jwtService.decode(token);
      return decoded;
    } catch (error) {
      throw new Error('Failed to parse JWT');
    }
  }

  async verifyJwt(token: string): Promise<any> {
    try {
      // Verify the JWT with a secret or public key
      const verified = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY', 'ad;,pwqdpoqwkdopkwqopdqwpdkqwd65165dw1q5d1wqd;wq,dqwdASDwqd'), // Use your actual secret
      });
      return verified;
    } catch (error) {
      throw new Error('Invalid or expired JWT');
    }
  }

  generateGoogleAuthUrl(heardAboutUs: string): string {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?` +
      `response_type=code&` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&` + // Using the redirect URI from .env
      `scope=email profile&` +  // Requested Google OAuth scopes
      `state=${encodeURIComponent(heardAboutUs)}`;

    return googleAuthUrl;
  }
  private readonly client = new OAuth2Client(this.configService.get<string>('GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID)); // Replace with your Client ID

  async verifyGoogleToken(token: string) {
    try {
      const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = await response.json();
   

      if (!payload) {
        throw new Error('Invalid token payload');
      }

      // Extract user info
      const userInfo = {
        id: payload.sub,
        email: payload.email,
        emailVerified: payload.email_verified,
        name: payload.name,
        givenName: payload.given_name,
        familyName: payload.family_name,
        picture: payload.picture,
      };

      return userInfo;
    } catch (error) {
      throw new Error(`Error verifying Google token: ${error.message}`);
    }
  }
}
