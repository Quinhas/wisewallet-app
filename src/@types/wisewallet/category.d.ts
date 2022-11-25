declare interface APICategory {
	id: number;
	user: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

interface CategoryDTO {
	description: string;
}

declare interface CategoryService {
	getAll: () => Promise<APICategory[]>;
	getByID: (data: GetByIDParams<number>) => Promise<APICategory>;
	create: (data: CreateParams<CategoryDTO>) => Promise<APICategory>;
	update: (data: UpdateParams<number, Category>) => Promise<APICategory>;
	delete: (data: DeleteParams<number>) => Promise<APICategory>;
}
