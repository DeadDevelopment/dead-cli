import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface chips {
    name: string,
    set: {
        classes: string,
        ariaLabel: string
    },
    chips: {
        label: string,
        classes: string,
        disabled: string
    }[]
}

export async function generateChips(options: any): Promise<void> {
    try {
        const payload: chips = {
            name: options.name || 'dead-chip-list',
            set: options.set || {"classes": "pri-lite", "ariaLabel": "aria-label"},
            chips: options.chips || [
                {"label": "Chip 1", "disabled": "!disabled", "classes": "m-1rem pri-dark-bg"}
            ]
        };

        const response = await axios.post(
            ENDPOINTS.chipList,
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
                scss: '{name}.component.scss',
                spec: '{name}.component.spec.ts'
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
