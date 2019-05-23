/* Core */
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

/* Components */
import { LoadingIconComponent } from './loading-icon/loading-icon.component';

@NgModule({
    declarations: [LoadingIconComponent],
    exports: [LoadingIconComponent],
    imports: [
        CommonModule,
        IonicModule
       ],
})
export class ComponentsModule {}