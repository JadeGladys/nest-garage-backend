import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SpareParts } from '../spareparts/spareParts.entity';
import { User } from "src/user/user.entity";
import { Vehicle } from "src/vehicles/vehicle.entity";

@Entity()
export class MaintenanceExpense{
    @PrimaryGeneratedColumn()
    MaintenanceExpense_ID: number;

    @ManyToOne(() => SpareParts, (spareParts) => spareParts.expense)
    @JoinColumn()
    @Expose()
    SparePart: SpareParts;

    @Column({ nullable: true })
    @Expose()
    MaintenanceDetails: string;

    @Column()
    @Expose()
    TotalPrice: number;

    @Column()
    @Expose()
    TransactionDate: Date;
    //expense_ID: number;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.maintenanceExpense)
    @JoinColumn()
    @Expose()
    vehicle: Vehicle;
    
    @ManyToOne(() => User, (user) => user.recorded)
    @JoinColumn()
    @Expose()
    recordedBy: User;

}