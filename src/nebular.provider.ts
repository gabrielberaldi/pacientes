import { importProvidersFrom } from '@angular/core';
import { NbDatepickerModule, NbDialogModule, NbGlobalPhysicalPosition, NbMenuModule, NbSidebarModule, NbThemeModule, NbToastrConfig, NbToastrModule } from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function provideNebular() {
  return importProvidersFrom(
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot({ position: NbGlobalPhysicalPosition.BOTTOM_LEFT, duration: 3000, preventDuplicates: true } as NbToastrConfig),
    NbDateFnsDateModule.forRoot({ 
      parseOptions: { locale: ptBR },
      formatOptions: { locale: ptBR }, 
      format: 'dd/MM/yyyy',
    }),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot()
  );
}