export interface NormalizedFile {
    name: string;
    content: string;
    type?: 'typescript' | 'html' | 'scss';
}
export interface WriteFilesOptions {
    outputDir?: string;
    baseName: string;
    files: NormalizedFile[];
}
export declare function writeGeneratedFiles(options: WriteFilesOptions): Promise<void>;
//# sourceMappingURL=gWriter.d.ts.map