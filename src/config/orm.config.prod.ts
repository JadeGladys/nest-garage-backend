import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Profile } from '../user/profile.entity';
import { User } from '../user/user.entity';
import { Vehicle } from 'src/vehicles/vehicle.entity';
import { Insurance } from 'src/Insurance/insurance.entity';
import { VehicleAffectation } from 'src/vehicles/vehicleAffectation/vehicle-affectation.entity';
import { Role } from 'src/roles/role.entity';
import { MaintenanceExpense } from 'src/expenses/maintenance/maintenanceExpense.entity';
import { SpareParts } from 'src/expenses/spareparts/spareParts.entity';
import { LogBook } from 'src/logbook/logbook.entity';


export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [   
      User, 
      Profile, 
      Vehicle, 
      Insurance, 
      VehicleAffectation,
      Role,
      MaintenanceExpense,
      SpareParts,
      LogBook
    ],
    synchronize: false,
    //dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA))
  })
);