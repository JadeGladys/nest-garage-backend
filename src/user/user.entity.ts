import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
// import { Event } from "src/events/event.entity";
import { Expose } from "class-transformer";
// import { Attendee } from "src/events/attendee.entity";
import { Vehicle } from "src/vehicles/vehicle.entity";
import { Insurance } from "src/Insurance/insurance.entity";
import { VehicleAffectation } from "src/vehicles/vehicleAffectation/vehicle-affectation.entity";
import { Role } from "src/roles/role.entity";
import { SpareParts } from "src/expenses/spareparts/spareParts.entity";
import { MaintenanceExpense } from "src/expenses/maintenance/maintenanceExpense.entity";
import { LogBook } from "src/logbook/logbook.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({unique: true})
  @Expose()
  username: string;

  @Column({unique: true})
  password: string;

  @Column()
  @Expose()
  email: string;

  @Column()
  @Expose()
  firstName: string;

  @Column()
  @Expose()
  lastName: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  @Expose()
  profile: Profile;

  // @OneToMany(() => Event, (event) => event.organiser)
  // @Expose()
  // organised: Event[];

  // @OneToMany(() => Attendee, (attendee) => attendee.user)
  // attended: Attendee[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.recordedBy)
  recorded: Vehicle[];

  @OneToMany(() => Insurance, (insurance) => insurance.recordedBy)
  insurane: Insurance[];

  @OneToMany(() => VehicleAffectation, (affectation) => affectation.recordedBy)
  affecation: VehicleAffectation[];

  @OneToMany(() => SpareParts, (sparePart) => sparePart.recordedBy)
  sparepart: SpareParts[];

  @OneToMany(() => MaintenanceExpense, (maintenanceExpense) => maintenanceExpense.recordedBy)
  maintenanceExpense: MaintenanceExpense[];

  @OneToMany(() => LogBook, (logBook) => logBook.recordedBy)
  logBook: LogBook[];

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles: Role[];
}
