import { Expose } from "class-transformer";
import { User } from "src/user/user.entity";
import { Vehicle } from "src/vehicles/vehicle.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Insurance{
    @PrimaryGeneratedColumn()
    @Expose()
    insurance_ID: number;

    @Column()
    @Expose()
    InsuranceCompany: string;

    @Column()
    @Expose()
    InsurancePremium: string;

    @Column()
    @Expose()
    PremiumAmount: string;

    @Column()
    @Expose()
    StartDate: Date;

    @Column()
    @Expose()
    EndDate: Date;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.insurance)
    @JoinColumn()
    @Expose()
    vehicle: Vehicle;

    @ManyToOne(() => User, (user) => user.recorded)
    @JoinColumn()
    @Expose()
    recordedBy: User;
    // expense_ID long
}