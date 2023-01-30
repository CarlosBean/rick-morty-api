import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex h-48 animate-pulse rounded-md bg-slate-200 p-2">
      <div class="h-36 w-32 rounded-xl bg-slate-400"></div>

      <div class="flex-1 p-3 pb-0">
        <div class="space-y-5">
          <div class="space-y-2">
            <div class="h-6 w-40 rounded-sm bg-slate-400"></div>
            <div class="h-5 w-20 rounded-sm bg-slate-400"></div>
          </div>

          <div class="space-y-2">
            <div class="h-3 w-48 rounded-sm bg-slate-400"></div>
            <div class="h-3 rounded-sm bg-slate-400"></div>
          </div>

          <div class="space-y-2">
            <div class="h-3 w-28 rounded-sm bg-slate-400"></div>
            <div class="h-3 rounded-sm bg-slate-400"></div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SkeletonCardComponent {}
