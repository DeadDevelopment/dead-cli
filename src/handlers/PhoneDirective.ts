import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface phoneDirective {
    name: string,
}

export async function generatePD(options: any): Promise<void> {
    try {
        const payload: phoneDirective = {
            name: options.name || 'dead-phone',
        };

        const response = await axios.post(
            ENDPOINTS.phoneDirective,
            payload
        );

        if (response.data.success && response.data.result) {
            
            const baseName = options.name;
            const result: GenerationResult = { ...response.data.result };
      
            // Define filename templates. You can customize these as needed.
            const filenameMap = {
                ts: '{name}.directive.ts',
                spec: '{name}.directive.spec.ts'
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

