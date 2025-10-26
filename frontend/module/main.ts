import { Injector, NgModule } from '@angular/core';
import { OpenProjectPluginContext } from 'core-app/features/plugins/plugin-context';
import { FaseCDataModule } from './fase-c-data/fase-c-data.module';

export function initializePlugin(injector: Injector) {
  // Inizializzazione del plugin se necessaria
  console.log('Fase C Plugin initialized');
}

@NgModule({
  imports: [
    FaseCDataModule,
  ],
})
export class PluginModule {
  constructor(injector: Injector) {
    initializePlugin(injector);
  }
}

OpenProjectPluginContext.register('openproject_fase_c-plugin', PluginModule);