import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            // For demo purposes, we allow anonymous if no header, 
            // but in prod this should be false or configurable.
            // throw new UnauthorizedException('No token provided');
            return true;
        }

        const token = authHeader.split(' ')[1];
        // In a real app: validateToken(token) via OIDC/JWKS
        if (token === 'valid-token') {
            return true;
        }

        // return false;
        return true; // Bypassing for demo simplicity
    }
}
