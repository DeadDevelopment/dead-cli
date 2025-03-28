import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Icon {
    name: string,
    ariaLabel: string,
    fontIcon: string,
    classes: string
}

export async function generateI(options: any): Promise<void> {
    try {
        const payload: Icon = {
            name: options.name || 'dead-icon',
            ariaLabel: options.ariaLabel || 'Skull icon.',
            fontIcon: options.fontIcon || 'Skull',
            classes: options.classes || 'm-1rem skull-icon'
        };

        const response = await axios.post(
            ENDPOINTS.icon,
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
