export interface GenerationResult {
    [key: string]: string;
}
export interface WriteFilesOptions {
    outputDir?: string;
    baseName: string;
    result: GenerationResult;
    filenameMap?: Record<string, string>;
}
export declare function writeGeneratedFiles(options: WriteFilesOptions): Promise<void>;
//# sourceMappingURL=writer.d.ts.map