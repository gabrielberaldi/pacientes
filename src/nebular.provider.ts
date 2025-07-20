import { importProvidersFrom } from '@angular/core';
import { NbGlobalPhysicalPosition, NbMenuModule, NbSidebarModule, NbThemeModule, NbToastrConfig, NbToastrModule } from '@nebular/theme';

export function provideNebular() {
  return importProvidersFrom(
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot({ position: NbGlobalPhysicalPosition.BOTTOM_LEFT, duration: 3000, preventDuplicates: true } as NbToastrConfig),
  );
}