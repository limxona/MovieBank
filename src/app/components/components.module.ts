import { NgModule } from "@angular/core";
import { LoadingIconComponent } from './loading-icon/loading-icon.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [LoadingIconComponent],
    exports: [LoadingIconComponent],
    imports: [
        CommonModule,
        IonicModule
       ],
})
export class ComponentsModule {}