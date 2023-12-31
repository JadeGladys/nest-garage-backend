import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./role.entity";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ){}

    async all(): Promise<Role[]>{
        return this.roleRepository.find();
    }

    async create(data): Promise<Role> {
        return this.roleRepository.save(data);
    }

    async update(id: number, data): Promise<any> {
        return this.roleRepository.update(id, data);
    }
}