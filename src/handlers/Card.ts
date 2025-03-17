import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Card {
    name: string
}

export async function generateC(options: any): Promise<void> {
    try {
        const payload: Card = {
            name: options.name || 'dead-card'
        }

        const response = await axios.post(
            ENDPOINTS.card,
            payload
        );

        if (response.data.success && response.data.result) {
            
            const baseName = options.name;
            const result: GenerationResult = { ...response.data.result };

            if (!result.scss) {
                result.scss = '';
            }

            const filenameMap = {
                html: '{name}.component.html',
                ts: '{name}.component.ts',
                scss: '{name}.component.scss'
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
        console.error('Error', error.message);
    }
}
