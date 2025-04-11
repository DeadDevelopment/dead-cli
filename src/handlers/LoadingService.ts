import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface loadings {
    name: string,
}

export async function geneerateLS(options: any): Promise<void> {
    try {
        const payload: loadings = {
            name: options.name || 'dead-loading',
        };

        const response = await axios.post(
            ENDPOINTS.loadingService,
            payload
        );

        if (response.data.success && response.data.result) {
            
            const baseName = options.name;
            const result: GenerationResult = { ...response.data.result };
      
            // Define filename templates. You can customize these as needed.
            const filenameMap = {
                ts: '{name}.service.ts',
                spec: '{name}.service.spec.ts'
            };
      
            await writeGeneratedFiles({
                outputDir: './', // or use an option to let the user specify the directory
                baseName,
                result,
                filenameMap
            });

            console.log(MSGS.SUCCESS);
          } else {
            console.error(ERRORS.HANDLER_TRY);
          }
    } catch (error: any) {
        console.error('Error:', error.message);
    }
}

