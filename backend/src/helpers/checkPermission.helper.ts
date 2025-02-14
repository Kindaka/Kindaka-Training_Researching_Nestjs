import { BadRequestException } from "@nestjs/common";
import { UserEntity } from "src/entity/user.entity";

export class Permission{
    static check(id: number, currentUser: UserEntity){
        if (id === currentUser.id) return;
        if (currentUser.role === 'ADMIN') return;
        throw new BadRequestException('Bạn không có quyền thực hiện hành động này');
    }
}   