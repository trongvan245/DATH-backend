import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayLoad } from "src/common/model/jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "thisismysecret",
    });
  }
  async validate(payload: JwtPayLoad) {
    // console.log(payload);
    return payload;
    // return { userId: payload.sub, email: payload.email };
  }
}
