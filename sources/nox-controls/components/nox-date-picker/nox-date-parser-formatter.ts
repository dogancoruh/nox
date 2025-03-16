import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { NoxConfigurationService } from "../../../nox-core/services/nox-configuration.service";
import { DateTime } from "luxon";

@Injectable()
export class NoxDateParserFormatter extends NgbDateParserFormatter {
	constructor(private configurationService: NoxConfigurationService) {
		super();
	}

	parse(value: string): NgbDateStruct | null {
		var date = DateTime.fromFormat(value, this.configurationService.dateDisplayFormat);
		if (date) {
			return {
				day: date.day,
				month: date.month,
				year: date.year
			};
		}
		return null;
	}

	format(dateStruct: NgbDateStruct | null): string {
		if (dateStruct) {
			var date = DateTime.fromObject({
				day: dateStruct.day,
				month: dateStruct.month,
				year: dateStruct.year
			})
			return date.toFormat(this.configurationService.dateDisplayFormat);
		} else {
			return "";
		}
	}
}