import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Divider {
    name: string,
    orientation: string,
    classes: string
}

export async function generatedivider(options: any): Promise<void> {
    try {
        const payload: Divider = {
            name: options.name || 'dead-divider',
            orientation: options.oprientation || "!vertical",
            classes: options.classes || "m-1rem w-100",
        };

        const response = await axios.post(
            ENDPOINTS.divider,
            payload
        );

        if (response.data.success && response.data.result) {
            const baseName = options.name;
            const result: GenerationResult = { ...response.data.result };
    
            if (!result.scss) {
                result.scss = ''; // create an empty SCSS file
            }
    
            // Define filename templates. You can customize these as needed.
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
        console.error('Error:', error.message);
    }
}
