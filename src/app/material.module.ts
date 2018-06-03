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
    MatMenuModule,
    MatDialogModule} from '@angular/material';

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
        MatMenuModule,
        MatDialogModule
    ]
})
export class MaterialModule {}