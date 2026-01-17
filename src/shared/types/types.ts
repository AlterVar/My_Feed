export interface ResponseError {
	field: string;
	errors: string[];
};

export type DialogType = "share" | "post-details" | "avatar" | "cancel-change";