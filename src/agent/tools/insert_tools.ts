import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Http2ServerRequest } from "http2";
import { CategoryService } from "src/application/services/admin/category.service";
import { UserService } from "src/application/services/user/user.service";
import { CategorySpecification } from "src/application/specifications/admin/category-specifications";
import { UsernameSpecification } from "src/application/specifications/user/user-specifications";
import { Categories } from "src/domain/entities/Categories";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { CategoryListDto, CreateCategoryDto } from "src/presentation/dtos/baseinfo/category-dto";
import { GenericMapper } from "src/presentation/helpers/mapper-classes";


@Injectable()
export class InsertTools{
    constructor(
        private readonly userService: UserService,
        private readonly categoryService:CategoryService
    ){

    }

    async Insert_category(categoryDto:CreateCategoryDto,req:any){
            var user = req.user;
                const user_specification = new UsernameSpecification(user.username);
                var checkUser = await this.userService.getWithSpecification(user_specification, null,
                    {
                        id: true
        
                    });


        var specification = new CategorySpecification(categoryDto.name.trim());
            var checkCategory = await this.categoryService.getWithSpecification(specification);
            if (checkCategory.length > 0) {
                throw new HttpException("The category already exist", HttpStatus.BAD_REQUEST);
            }
            var category = GenericMapper.toEntity(Categories, categoryDto);
            category.name = categoryDto.name.trim();
            category.depth = 0;
            category.createAt = new Date();
            category.recordStatus = recordStatus.Active;
            category.user = checkUser[0];
            if (categoryDto.parentId) {
                var parentCategory = await this.categoryService.getById(categoryDto.parentId);
                if (parentCategory == null) {
                    throw new HttpException("The parent category not found", HttpStatus.NOT_FOUND);
                }
                category.depth = parentCategory.depth + 1;
                category.parent = new Categories();
                category.parent.id = categoryDto.parentId;
            } else {
                category.parent = null;
                category.depth = 0;
            }
    
            var createCategory = await this.categoryService.add(category);
            var result = GenericMapper.toDto(CategoryListDto, createCategory, { excludeExtraneousValues: true });
            return result;
}


}

  


