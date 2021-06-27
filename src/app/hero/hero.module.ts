import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HTTP_API_PATH_CONFIG, BACKEND_CONFIG, USING_BACKEND, USING_API_ENDPOINT, HTTP_API_ENDPOINT_CONFIG, SHOULD_INTERCEPT_HERO_HTTP_REQUEST } from './config';
import { HeroDataService } from './services/hero-data.service';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeroComponent } from './components/hero/hero.component';
import { HeroRoutingModule } from './hero-routing.module';
import { HTTPAPIPathConfigService } from './services/api-path-config.service';
import { heroDataServiceFactory } from './factories/hero-data-service-factory';
import { BackendConfigService } from './services/backend-config.service';
import { httpAPIBackendConfigFactory } from './factories/http-api-backend-config-factory';
import { HttpAPIBackendConfigService } from './services/api-backend-config.service';
import { MockHeroResponseInterceptor } from './interceptors/mock-hero-response.interceptor';


@NgModule({
  declarations: [HeroListComponent, HeroComponent],
  imports: [
    CommonModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    HttpClientModule,
    HeroRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_API_PATH_CONFIG,
      useFactory: httpAPIBackendConfigFactory,
      deps: [HttpAPIBackendConfigService],
    },
    HttpAPIBackendConfigService,
    {
      provide: HeroDataService,
      useFactory: heroDataServiceFactory,
      deps: [
        BackendConfigService,
        HttpClient,
        HTTPAPIPathConfigService,
      ]
    },
    HTTPAPIPathConfigService,
    BackendConfigService,
    { provide: BACKEND_CONFIG, useValue: USING_BACKEND, },
    { provide: USING_BACKEND, useValue: USING_BACKEND, },
    { provide: HTTP_API_ENDPOINT_CONFIG, useValue: USING_API_ENDPOINT, },
    { provide: USING_API_ENDPOINT, useValue: USING_API_ENDPOINT, },
    { provide: HTTP_INTERCEPTORS, useClass: MockHeroResponseInterceptor, multi: true },
    { provide: SHOULD_INTERCEPT_HERO_HTTP_REQUEST, useValue: SHOULD_INTERCEPT_HERO_HTTP_REQUEST, },
  ],
})
export class HeroModule {}
