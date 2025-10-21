import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { I18nService } from 'core-app/core/i18n/i18n.service';
import { ToastService } from 'core-app/shared/components/toaster/toast.service';
import { CurrentProjectService } from 'core-app/core/current-project/current-project.service';

interface FaseCData {
  id?: number;
  project_id: number;
  collaudo_impianto?: string;
  libretto_impianto?: string;
  dichiarazione_ce?: string;
  contratto_manutenzione?: string;
  incarico_ente_certificato?: string;
  numero_matricola?: string;
  fine_lavori_pratica?: string;
  variazione_catastale?: string;
  can_edit: boolean;
}

@Component({
  selector: 'fase-c-data',
  templateUrl: './fase-c-data.component.html',
  styleUrls: ['./fase-c-data.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaseCDataComponent implements OnInit {
  public data: FaseCData | null = null;
  public loading = true;
  public saving = false;
  public projectId: string;

  public fields = [
    { key: 'collaudo_impianto', label: 'fase_c.collaudo_impianto' },
    { key: 'libretto_impianto', label: 'fase_c.libretto_impianto' },
    { key: 'dichiarazione_ce', label: 'fase_c.dichiarazione_ce' },
    { key: 'contratto_manutenzione', label: 'fase_c.contratto_manutenzione' },
    { key: 'incarico_ente_certificato', label: 'fase_c.incarico_ente_certificato' },
    { key: 'numero_matricola', label: 'fase_c.numero_matricola' },
    { key: 'fine_lavori_pratica', label: 'fase_c.fine_lavori_pratica' },
    { key: 'variazione_catastale', label: 'fase_c.variazione_catastale' },
  ];

  constructor(
    private http: HttpClient,
    private i18n: I18nService,
    private toastService: ToastService,
    private currentProject: CurrentProjectService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.projectId = this.currentProject.id || '';
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    const url = `/projects/${this.projectId}/fase_c_data`;

    this.http.get<FaseCData>(url).subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Error loading Fase C data:', error);
        this.loading = false;
        this.cdRef.detectChanges();
      },
    });
  }

  public save(): void {
    if (!this.data || this.saving) {
      return;
    }

    this.saving = true;
    const url = `/projects/${this.projectId}/fase_c_data`;

    this.http.put<FaseCData>(url, { fase_c_datum: this.data }).subscribe({
      next: (data) => {
        this.data = data;
        this.saving = false;
        this.toastService.addSuccess(this.i18n.t('js.fase_c.saved_successfully'));
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Error saving Fase C data:', error);
        this.saving = false;
        this.toastService.addError(this.i18n.t('js.fase_c.save_error'));
        this.cdRef.detectChanges();
      },
    });
  }

  public canEdit(): boolean {
    return this.data?.can_edit || false;
  }

  public getText(key: string): string {
    return this.i18n.t(`js.${key}`);
  }
}