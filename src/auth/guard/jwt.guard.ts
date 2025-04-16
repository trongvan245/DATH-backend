import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(" ")[1]; // Assuming Bearer token format
    const isPublic = this.reflector.getAllAndOverride("isPublic", [context.getHandler(), context.getClass()]);

    if (isPublic) return true;

    // Extract token from request headers
    return super.canActivate(context);
  }
}
