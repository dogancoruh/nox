import { AuthClaim } from "./auth-claim";

export class AuthRole {
    name!: string;
    claims: AuthClaim[] = [];

    public hasClaim(name: string): boolean {
        for (let i = 0; i < this.claims.length; i++) {
            if (this.claims[i].type == name)
                return true;
        }

        return false;
    }

    public getClaimAsString(name: string): string {        
        for (let i = 0; i < this.claims.length; i++) {
            if (this.claims[i].type == name)
                return this.claims[i].value;
        }

        return "";
    }
}