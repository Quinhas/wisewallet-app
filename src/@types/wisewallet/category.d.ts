declare interface APICategory {
	id: number;
	user: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}

interface APICategoryDTO {
	description: string;
}

declare interface CategoryService {
	getAll: () => Promise<APICategory[]>;
	getByID: (data: GetByIDParams<number>) => Promise<APICategory>;
	create: (data: CreateParams<APICategoryDTO>) => Promise<APICategory>;
	update: (data: UpdateParams<number, Category>) => Promise<APICategory>;
	delete: (data: DeleteParams<number>) => Promise<APICategory>;
}
