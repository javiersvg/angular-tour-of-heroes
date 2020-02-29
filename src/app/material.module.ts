import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

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
        MatDialogModule,
        MatBottomSheetModule
    ]
})
export class MaterialModule {}
