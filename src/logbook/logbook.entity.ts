import { Expose } from "class-transformer";
import { User } from "src/user/user.entity";
import { Vehicle } from "src/vehicles/vehicle.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LogBook{
    @PrimaryGeneratedColumn()
    logbook_ID: number;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.logBook)
    @JoinColumn()
    @Expose()
    vehicle: Vehicle;
    
    @Column()
    @Expose()
    description: string;

    @Column()
    @Expose()
    current_Address: string;

    @ManyToOne(() => User, (user) => user.recorded)
    @JoinColumn()
    @Expose()
    recordedBy: User;
}