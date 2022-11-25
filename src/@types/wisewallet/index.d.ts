declare interface APIError {
	error: {
		message: string;
	};
}

type TypeID = string | number;

declare interface GetByIDParams<T extends TypeID = string> {
	id: T;
}

declare interface CreateParams<T> {
	data: T;
}

declare interface UpdateParams<D extends TypeID, T> {
	id: D;
	data: Partial<T>;
}

declare interface DeleteParams<T extends TypeID = string> {
	id: T;
}
