export declare type UploaderTypes = 'IMAGE' | 'DOCUMENT';
export interface IGetUploadURLParams {
    uploadType: UploaderTypes;
    userId: string;
    fileName: string;
    newFileName: string;
    mimeType: string;
    itemId: number;
}
