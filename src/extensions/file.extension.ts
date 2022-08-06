export interface File extends Blob {
	readonly name?: string;
	id?: string | number;
	preview?: string;
}
