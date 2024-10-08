import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditParameterFormComponent } from './components/forms/parameter-forms/edit-parameter-form/edit-parameter-form.component';

import { ButtonModule } from 'primeng/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FormControlAlertComponent } from './components/forms/form-control-alert/form-control-alert.component';
import { DeleteGamemodeFormComponent } from './components/forms/gamemode-forms/delete-gamemode-form/delete-gamemode-form.component';
import { EditGamemodeFormComponent } from './components/forms/gamemode-forms/edit-gamemode-form/edit-gamemode-form.component';
import { SaveGamemodeFormComponent } from './components/forms/gamemode-forms/save-gamemode-form/save-gamemode-form.component';
import { DeleteParameterFormComponent } from './components/forms/parameter-forms/delete-parameter-form/delete-parameter-form.component';
import { SaveParameterFormComponent } from './components/forms/parameter-forms/save-parameter-form/save-parameter-form.component';
import { DeletePlayerFormComponent } from './components/forms/player-forms/delete-players-form/delete-player-form.component';
import { EditPlayerFormComponent } from './components/forms/player-forms/edit-player-form/edit-player-form.component';
import { SavePlayerFormComponent } from './components/forms/player-forms/save-player-form/save-player-form.component';
import { DeletePositionFormComponent } from './components/forms/position-forms/delete-position-form/delete-position-form.component';
import { EditPositionFormComponent } from './components/forms/position-forms/edit-position-form/edit-position-form.component';
import { SavePositionFormComponent } from './components/forms/position-forms/save-position-form/save-position-form.component';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [
    SidebarNavigationComponent,
    ShortenPipe,
    FormControlAlertComponent,
    SavePlayerFormComponent,
    EditPlayerFormComponent,
    DeletePlayerFormComponent,
    SaveParameterFormComponent,
    EditParameterFormComponent,
    DeleteParameterFormComponent,
    SavePositionFormComponent,
    EditPositionFormComponent,
    DeletePositionFormComponent,
    SaveGamemodeFormComponent,
    EditGamemodeFormComponent,
    DeleteGamemodeFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SidebarModule,
    PanelMenuModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    CardModule,
    ProgressBarModule,
    InputTextareaModule,
    RippleModule,
  ],
  exports: [SidebarNavigationComponent, ShortenPipe, FormControlAlertComponent],
})
export class SharedModule {}
