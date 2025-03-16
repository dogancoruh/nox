import { Component, EventEmitter, Injector, Input, Output } from "@angular/core";
import { NoxDataAdapterComponent } from "./nox-data-adapter.component";
import { Observable, zip } from "rxjs";
import { NoxDataAdapterObservableInfo } from "../data/nox-data-adapter-observable-info";
import { NoxDataAdapterErrorInfo } from "../data/nox-data-adapter-error-info";
import { NoxDataAdapterGetDataEvent } from "../events/nox-data-adapter-get-data-event";
import { NoxDataAdapterGetDataSuccessEvent } from "../events/nox-data-adapter-get-data-success-event";
import { NoxDataAdapterGetDataFailEvent } from "../events/nox-data-adapter-get-data-fail-event";
import { NoxDataAdapterSetDataEvent } from "../events/nox-data-adapter-set-data-event";
import { NoxDataAdapterSetDataSuccessEvent } from "../events/nox-data-adapter-set-data-success-event";
import { NoxDataAdapterSetDataFailEvent } from "../events/nox-data-adapter-set-data-fail-event";
import { NoxServerDataAdapterComponent } from "./nox-server-data-adapter";

@Component({
    selector: 'nox-generic-data-adapter',
    template: ""
})
export class NoxGenericDataAdapterComponent extends NoxServerDataAdapterComponent {
    @Input() onSetDataSuccessRouterLink: string = "";

    @Output() onGetData: EventEmitter<NoxDataAdapterGetDataEvent> = new EventEmitter<NoxDataAdapterGetDataEvent>();
    @Output() onGetDataSuccess: EventEmitter<NoxDataAdapterGetDataSuccessEvent> = new EventEmitter<NoxDataAdapterGetDataSuccessEvent>();
    @Output() onGetDataFail: EventEmitter<NoxDataAdapterGetDataFailEvent> = new EventEmitter<NoxDataAdapterGetDataFailEvent>();

    @Output() onSetData: EventEmitter<NoxDataAdapterSetDataEvent> = new EventEmitter<NoxDataAdapterSetDataEvent>();
    @Output() onSetDataSuccess: EventEmitter<NoxDataAdapterSetDataSuccessEvent> = new EventEmitter<NoxDataAdapterSetDataSuccessEvent>();
    @Output() onSetDataFail: EventEmitter<NoxDataAdapterSetDataFailEvent> = new EventEmitter<NoxDataAdapterSetDataFailEvent>();

    constructor(override injector: Injector) {
        super(injector);
    }

    ngAfterViewInit(): void {
        if (this.autoGetData)
            this.getData();
    }

    getData(): void {
        this.onShowSpinner.emit();

        const getDataEvent: NoxDataAdapterGetDataEvent = new NoxDataAdapterGetDataEvent();

        this.onGetData.emit(getDataEvent);

        // populate observables into an array for zip function
        const observables$: Observable<any>[] = [];

        getDataEvent.secondaryObservableInfos.forEach((observableInfo: NoxDataAdapterObservableInfo<any>) => {
            observables$.push(observableInfo.observable$);
        });

        if (getDataEvent.primaryObservable$)
            observables$.push(getDataEvent.primaryObservable$);

        if (observables$.length > 0) {
            this.subscription = zip(observables$).subscribe((results: any[]) => {
                this.subscription?.unsubscribe();

                const secondaryResults: any = {};

                let index: number = 0;
                getDataEvent.secondaryObservableInfos.forEach((observableInfo: NoxDataAdapterObservableInfo<any>) => {
                    secondaryResults[observableInfo.name] = results[index];
                    index++;
                });

                let primaryResult: any = undefined;
                if (results.length > getDataEvent.secondaryObservableInfos.length)
                    primaryResult = results[results.length - 1];

                this.onHideSpinner.emit();

                const onGetDataSuccessEvent = new NoxDataAdapterGetDataSuccessEvent();
                onGetDataSuccessEvent.secondaryResults = secondaryResults;
                onGetDataSuccessEvent.primaryResult = primaryResult;
                this.onGetDataSuccess.emit(onGetDataSuccessEvent);
            }, (error: any) => {
                this.onHideSpinner.emit();

                const onGetDataFailEvent = new NoxDataAdapterGetDataFailEvent();
                onGetDataFailEvent.error = error;
                this.onGetDataFail.emit(onGetDataFailEvent);
            });
        } else {
            this.onHideSpinner.emit();
            throw new Error("No observable defined for data adapter onGetData");
        }
    }

    setData(data: any) {
        this.onShowSpinner.emit();

        const setDataEvent = new NoxDataAdapterSetDataEvent();
        setDataEvent.data = data;

        this.onSetData.emit(setDataEvent);

        if (setDataEvent.result$) {
            if (this.subscription)
                this.subscription.unsubscribe();

            this.subscription = setDataEvent.result$.subscribe((result: any) => {
                this.onHideSpinner.emit();
                this.onSetDataSuccess.emit();

                // navigate to given url if success link is defined
                if (this.onSetDataSuccessRouterLink)
                    this.router.navigate([this.onSetDataSuccessRouterLink]);
            }, (error: any) => {
                this.onHideSpinner.emit();

                const onSetDataFailEvent = new NoxDataAdapterSetDataFailEvent();
                onSetDataFailEvent.error = error;
                this.onSetDataFail.emit(onSetDataFailEvent);
            });
        } else {
            throw new Error("No observable defined for data adapter onSetData");
        }
    }
}