// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminRolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        /* const request = context.switchToHttp().getRequest();
        const user = request.user; // Get the user object from the request

        if (!user || user.role !== 'admin') {

            throw new ForbiddenException('You do not have the required role to access this resource');
        }
        if (user.username == user.email && !user.emailConfirmed) {
            throw new ForbiddenException('user is not verified!');
        }

        if (user.username == user.phone && !user.phoneConfirmed) {
            throw new ForbiddenException('user is not verified!');
        }
 */
        return true;
    }
}

@Injectable()
export class AdminAndClientRolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
       /*  const request = context.switchToHttp().getRequest();
        const user = request.user; // Get the user object from the request

        if (!user || user.role !== 'admin' && user.role !== 'client') {

            throw new ForbiddenException('You do not have the required role to access this resource');
        }
        if (user.username == user.email && !user.emailConfirmed) {
            throw new ForbiddenException('user is not verified!');
        }

        if (user.username == user.phone && !user.phoneConfirmed) {
            throw new ForbiddenException('user is not verified!');
        } */

        return true;
    }
}

