import { AuthClaim } from "../data/auth-claim";

export class AuthClaimHelper {
    static getClaimAsString(claim: AuthClaim): string {
        return claim.value;
    }

    static getClaimAsInt(claim: AuthClaim): number {
        return parseInt(claim.value);
    }

    static getClaimAsFloat(claim: AuthClaim): number {
        return parseFloat(claim.value);
    }

    static getClaimAsBool(claim: AuthClaim): boolean {
        return claim.value.toLowerCase() == "true";
    }
}