import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

export class NoxRouterHelper {
    public static async removeQueryParams(router: Router, activatedRoute: ActivatedRoute, location: Location, ...keys: string[]) {
        if (keys && keys.length > 0) {
            const oldQueryParams = activatedRoute.snapshot.queryParams;
            const newQueryParams: any = {};

            for (let propertyKey in oldQueryParams) {
                if (!keys.includes(propertyKey))
                    newQueryParams[propertyKey] = oldQueryParams[propertyKey];
            }

            await router.navigate([], {
                relativeTo: activatedRoute,
                queryParams: newQueryParams
            });
        }
    }
}