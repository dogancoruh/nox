import { AuthRole } from "./auth-role";

export class AuthUser {
    private _tokenInfo: any;
    private _roles: AuthRole[] = [];

    get id(): string {
        if (this._tokenInfo)
            return this._tokenInfo.sub;
        else
            return "";
    }

    get username(): string {
        if (this._tokenInfo.unique_name)
            return this._tokenInfo.unique_name;
        else
            return "";
    }

    get fullName(): string {
        if (this._tokenInfo.given_name)
            return this._tokenInfo.given_name;
        else
            return "";
    }

    get roles(): AuthRole[] {
        return this._roles;
    }

    get roleNames(): string[] {
        const result: string[] = [];

        for (let i = 0; i < this.roles.length; i++) {
            result.push(this.roles[i].name);
        }

        return result;
    }

    constructor(tokenInfo: any) {
        this._tokenInfo = tokenInfo;
        
        if (this._tokenInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
            if (Array.isArray(this._tokenInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])) {
                const roleNames = this._tokenInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                if (roleNames && roleNames.length > 0) {
                    for (let i = 0; i < roleNames.length; i++) {
                        const roleName = roleNames[i];

                        const authRole = new AuthRole();
                        authRole.name = roleName;
                        this._roles.push(authRole);
                    }
                }
            } else {
                const roleName = this._tokenInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                const authRole = new AuthRole();
                authRole.name = roleName;
                this._roles.push(authRole);
            }
        }
    }

    public hasRole(name: string): boolean {
        for (let i = 0; i < this.roles.length; i++) {
            if (this.roles[i].name == name)
                return true;
        }

        return false;
    }

    public getRole(name: string): AuthRole | undefined {
        for (let i = 0; i < this.roles.length; i++) {
            if (this.roles[i].name == name)
                return this.roles[i];
        }

        return undefined;
    }

    public getClaimAsString(name: string): string {
        const claim = this._tokenInfo[name];
        if (claim != undefined)
            return claim;
        else
            return "";
    }
}