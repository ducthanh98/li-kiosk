import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { EcoChargeConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class LiKioskApiModule {
    public static forRoot(configurationFactory: () => EcoChargeConfiguration): ModuleWithProviders<LiKioskApiModule> {
        return {
            ngModule: LiKioskApiModule,
            providers: [ { provide: EcoChargeConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: LiKioskApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('LiKioskApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
