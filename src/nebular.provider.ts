import { importProvidersFrom } from '@angular/core';
import { NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';

export function provideNebular() {
  return importProvidersFrom(
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
  );
}