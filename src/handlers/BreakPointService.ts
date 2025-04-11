import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Breakp {
    name: string,
    mPoint: number, // px
    dPoint: number // px
}

export async function generateBps(options: any): Promise<void> {
    try {
        const payload: Breakp = {
            name: options.name || 'dead-breakpoint',
            mPoint: options.mPoint ? parseInt(options.mPoint) : 600,
            dPoint: options.dPoint ? parseInt(options.dPoint) : 1000,
        }

        const response = await axios.post(
            ENDPOINTS.breakPoint,
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

