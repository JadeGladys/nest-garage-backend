import { Expose } from "class-transformer";
import { User } from "src/user/user.entity";
import { Vehicle } from "src/vehicles/vehicle.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehicleAffectation{
    @PrimaryGeneratedColumn()
    affectation_ID: number;

    @Column()
    @Expose()
    StartDate: Date;

    @Column()
    @Expose()
    EndDate: Date;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.affectation)
    @JoinColumn({name: 'vehicle'})
    @Expose()
    vehicleID: Vehicle;

    @Column({ nullable: true })
    vehicle: number;
    
    @ManyToOne(() => User, (user) => user.affecation)
    @JoinColumn()
    @Expose()
    recordedByID: User;

    @Column({ nullable: true })
    recordedBy: number;
}