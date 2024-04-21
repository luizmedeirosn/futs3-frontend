import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { GameModeRequestDTO } from 'src/app/models/dto/gamemode/request/GameModeRequestDTO';
import { PositionMinDTO } from 'src/app/models/dto/position/response/PositionMinDTO';
import { EnumPositionEventsCrud } from 'src/app/models/enums/EnumPositionEventsCrud';
import { GameModeService } from 'src/app/services/gamemode/gamemode.service';
import { PositionService } from 'src/app/services/position/position.service';
import { SavePositionFormComponent } from '../../position-forms/save-position-form/save-position-form.component';
import { CustomDialogService } from '../../../../services/custom-dialog/custom-dialog.service';
import { EditPositionFormComponent } from '../../position-forms/edit-position-form/edit-position-form.component';
import { ChangesOnService } from 'src/app/shared/services/changes-on/changes-on.service';
import Page from "../../../../../models/dto/generics/response/Page";

@Component({
    selector: 'app-save-gamemode-form',
    templateUrl: './save-gamemode-form.component.html',
    styleUrls: []
})
export class SaveGamemodeFormComponent implements OnInit, OnDestroy {

    private readonly $destroy: Subject<void> = new Subject();
    private readonly toastLife: number = 2000;

    public positions!: Array<PositionMinDTO>;
    public positionsOff: Array<PositionMinDTO> = [];

    public newGameModeForm: any = this.formBuilder.group({
        formationName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: ['', [Validators.maxLength(2000)]],
    });

    public addPositionForm = this.formBuilder.group({
        position: ['', Validators.required],
    });

    public dynamicDialogRef!: DynamicDialogRef;

    public constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private positionService: PositionService,
        private gameModeService: GameModeService,
        private customDialogService: CustomDialogService,
        private changesOnService: ChangesOnService,
    ) { }

    public ngOnInit(): void {
        this.setPositionsWithApi();
    }

    private setPositionsWithApi(): void {
        this.positionService.findAll()
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (positionsPage: Page<PositionMinDTO>) => {
                    this.positions = positionsPage.content.filter(p => !this.positionsOff.some(off => off.id === p.id));
                },
                error: (err) => {
                    console.log(err);
                }
            });
    }

    public handleCreatePositionEvent(): void {
        this.dynamicDialogRef = this.customDialogService.open(
            SavePositionFormComponent,
            {
                position: 'top',
                header: EnumPositionEventsCrud.ADD.valueOf(),
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
            });

        this.dynamicDialogRef.onClose
            .pipe(takeUntil(this.$destroy))
            .subscribe(() => this.setPositionsWithApi());
    }

    public handleEditPositionEvent(id: number) {
        this.dynamicDialogRef = this.customDialogService.open(
            EditPositionFormComponent,
            {
                position: 'top',
                header: EnumPositionEventsCrud.EDIT.valueOf(),
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
                data: {
                    $event: EnumPositionEventsCrud.EDIT,
                    selectedPositionId: id
                }
            });

        this.dynamicDialogRef.onClose
            .pipe(takeUntil(this.$destroy))
            .subscribe(() => this.setPositionsWithApi());
    }

    public handleAddPosition(): void {
        const position = this.addPositionForm.value?.position as PositionMinDTO | undefined;

        if (position) {
            this.positionsOff.push(position);
            this.positionsOff.sort((p1, p2) =>
                p1.name.toUpperCase().localeCompare(p2.name.toUpperCase())
            );

            const positionId: number = this.positions.filter((p) => p.id === position.id)[0].id;
            this.positions = this.positions.filter(p => p.id !== positionId);
        }
        this.addPositionForm.reset();
    }

    public handleDeletePosition($event: number): void {
        const position: PositionMinDTO | undefined = this.positionsOff.find((p) => p.id === $event);
        position && this.positions.push(position);
        this.positionsOff = position && this.positionsOff.filter(p => p.id !== position.id) || [];
        this.positionsOff.sort((p1, p2) =>
            p1.name.toUpperCase().localeCompare(p2.name.toUpperCase())
        );
    }

    public handleSubmitSaveGameModeForm(): void {
        if (this.newGameModeForm.valid && this.newGameModeForm.value) {
            const gameModeRequest: GameModeRequestDTO = {
                formationName: this.newGameModeForm.value.formationName as string,
                description: this.newGameModeForm.value.description as string,
                positions: this.positionsOff.map(p => p.id)
            }

            this.gameModeService.save(gameModeRequest)
                .pipe(takeUntil(this.$destroy))
                .subscribe({
                    next: () => {
                        this.changesOnService.setChangesOn(true);
                        this.messageService.clear();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Game mode registered successfully!',
                            life: this.toastLife
                        });
                    },
                    error: (err) => {
                        this.changesOnService.setChangesOn(false);
                        this.messageService.clear();
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Invalid registration!',
                            life: this.toastLife
                        });
                        console.log(err);
                    }
                });
        }

        this.newGameModeForm.reset();
        this.addPositionForm.reset();

        this.positionsOff.forEach(e => this.positions.push(e));
        this.positionsOff.sort((p1, p2) =>
            p1.name.toUpperCase().localeCompare(p2.name.toUpperCase())
        ); this.positionsOff = [];
    }

    public ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }

}
