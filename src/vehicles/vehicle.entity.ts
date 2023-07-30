import { Expose } from "class-transformer";
import { Insurance } from "src/Insurance/insurance.entity";
import { User } from "src/user/user.entity";
import { VehicleAffectation } from "src/vehicles/vehicleAffectation/vehicle-affectation.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MaintenanceExpense } from '../expenses/maintenance/maintenanceExpense.entity';
import { LogBook } from "src/logbook/logbook.entity";

@Entity()
export class Vehicle{
    @PrimaryGeneratedColumn()
    vehicle_ID: number;

    @Column()
    @Expose()
    VIN: string;

    @Column()
    @Expose()
    Registration_NO: string;

    @Column()
    @Expose()
    Manufacturer: string;

    @Column()
    @Expose()
    Brand: string;

    @Column()
    @Expose()
    Functionality: string;

    @Column()
    @Expose()
    Milleage: string;

    @Column()
    @Expose()
    Insurance: string;

    @Column()
    @Expose()
    description: string;

    @Column()
    @Expose()
    status: string;

    @OneToMany(() => Insurance, (insurance) => insurance.vehicle,{
        cascade: true
    })
    @Expose()
    insurance: Insurance[];

    @OneToMany(() => VehicleAffectation, (affectation) => affectation.vehicle,{
        cascade: true
    })
    @Expose()
    affectation: VehicleAffectation[];

    @OneToMany(() => MaintenanceExpense, (maintenanceExpense) => maintenanceExpense.vehicle,{
        cascade: true
    })
    @Expose()
    maintenanceExpense: MaintenanceExpense[];

    @OneToMany(() => LogBook, (logBook) => logBook.vehicle,{
        cascade: true
    })
    @Expose()
    logBook: LogBook[];

    @ManyToOne(() => User, (user) => user.recorded)
    @JoinColumn({name: 'recordedByID'})
    @Expose()
    recordedBy: User;

    @Column({ nullable: true })
    recordedByID: number;
}