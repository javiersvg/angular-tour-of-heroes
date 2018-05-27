import { NgModule } from '@angular/core';
import { 
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule} from '@angular/material';

@NgModule({
    exports : [
        MatButtonModule,
        MatTabsModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatAutocompleteModule,
        MatCardModule,
        MatToolbarModule,
        MatGridListModule,
        MatMenuModule
    ]
})
export class MaterialModule {}