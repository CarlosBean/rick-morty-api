import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse flex p-2 rounded-md h-48 bg-slate-200">
      <div class="rounded-xl bg-slate-400 h-36 w-32"></div>
    
      <div class="flex-1 p-3 pb-0">
        <div class="space-y-5">
          <div class="space-y-2">
            <div class="h-6 bg-slate-400 rounded-sm w-40"></div>
            <div class="h-5 bg-slate-400 rounded-sm w-20"></div>
          </div>
    
          <div class="space-y-2">
            <div class="h-3 bg-slate-400 rounded-sm w-48"></div>
            <div class="h-3 bg-slate-400 rounded-sm"></div>
          </div>
    
          <div class="space-y-2">
            <div class="h-3 bg-slate-400 rounded-sm w-28"></div>
            <div class="h-3 bg-slate-400 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SkeletonCardComponent {}