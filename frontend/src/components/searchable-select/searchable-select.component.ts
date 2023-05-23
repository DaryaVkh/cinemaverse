import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TUI_DEFAULT_MATCHER, TuiFilterPipeModule, TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiDataListComponent,
  TuiDataListModule,
  tuiIsEditingKey,
  TuiPrimitiveTextfieldModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { TuiMultiSelectModule, TuiSelectModule } from '@taiga-ui/kit';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-searchable-select',
  standalone: true,
  imports: [CommonModule, TuiPrimitiveTextfieldModule, TuiDataListModule, TuiTextfieldControllerModule, TuiFilterPipeModule, TuiLetModule, TuiMultiSelectModule, TuiSelectModule],
  templateUrl: './searchable-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchableSelectComponent {
  @Input() public items!: Observable<string[]>;

  public value = '';

  public readonly filter = TUI_DEFAULT_MATCHER;

  public onArrowDown<T>(list: TuiDataListComponent<T>, event: Event): void {
    list.onFocus(event, true);
  }

  public onKeyDown(key: string, element: HTMLElement | null): void {
    if (element && tuiIsEditingKey(key)) {
      element.focus({preventScroll: true});
    }
  }
}
