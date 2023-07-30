import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceController } from "src/Insurance/insurance.controller";
import { Insurance } from "src/Insurance/insurance.entity";
import { InsuranceService } from "src/Insurance/insurance.service";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { JwtStrategy } from "src/auth/config/jwt.strategy";
import { LocalStrategy } from "src/auth/config/local.strategy";
import { User } from "src/user/user.entity";
import { UsersController } from "src/user/users.controller";
import { MaintenanceController } from "src/expenses/maintenance/maintenance.controller";
import { MaintenanceService } from "src/expenses/maintenance/maintenance.service";
import { MaintenanceExpense } from "src/expenses/maintenance/maintenanceExpense.entity";
import { SpareParts } from "src/expenses/spareparts/spareParts.entity";
import { SparePartController } from "src/expenses/spareparts/sparepart.controller";
import { SparePartService } from "src/expenses/spareparts/sparepart.service";
import { RoleController } from "src/roles/role.controller";
import { Role } from "src/roles/role.entity";
import { RoleService } from "src/roles/role.service";
import { Vehicle } from "src/vehicles/vehicle.entity";
import { VehicleAffectation } from "src/vehicles/vehicleAffectation/vehicle-affectation.entity";
import { AffectationService } from "src/vehicles/vehicleAffectation/vehicle-affectation.service";
import { AffectationController } from "src/vehicles/vehicleAffectation/vehicle-affection.controller";
import { VehiclesController } from "src/vehicles/vehicles.controller";
import { VehiclesService } from "src/vehicles/vehicles.service";
import { LogBook } from "src/logbook/logbook.entity";
import { LogBookService } from "src/logbook/logbook.service";

@Module({
    imports: [TypeOrmModule.forFeature([
        User, 
        Insurance, 
        Vehicle,
        VehicleAffectation,
        Role,
        SpareParts,
        MaintenanceExpense,
        LogBook
        
    ]),
    JwtModule.registerAsync({
        useFactory: () => ({
            secret: process.env.AUTH_SECRET,
            signOptions: {
                expiresIn: '60m'
            }
        })
    })
],
    providers: [
        LocalStrategy, 
        JwtStrategy, 
        AuthService,
        InsuranceService, 
        VehiclesService,
        AffectationService,
        RoleService,
        SparePartService,
        MaintenanceService,
        LogBookService
    ],
    controllers: [
        AuthController, 
        UsersController,
        InsuranceController,
        RoleController,
        VehiclesController,
        AffectationController,
        SparePartController,
        MaintenanceController
    ]
})
export class MainModule{

}