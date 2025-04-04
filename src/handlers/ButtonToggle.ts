import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface buttontoggle {
    name: string,
    group: {
        classes: string,
        name: string,
        ariaLabel: string
    },
    toggles: {
        value: string,
        label: string,
        classes: string
    }[]
}

export async function generatebtog(options: any): Promise<void> {
    try {
        const payload: buttontoggle = {
            name: options.name || 'dead-button-toggle',
            group: options.group || {"ariaLabel": "List of toggles to configure.", "classes": "m-1rem body", "name": "toggles"},
            toggles: options.toggles || [
                {"value": "1", "classes": "pri pri-dark-bg", "label": "Select Option 1."},
                {"value": "2", "classes": "pri-lite pri-dark-bg", "label": "Select Option 2."}
            ]
        };

        const response = await axios.post(
            ENDPOINTS.buttonToggle,
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
