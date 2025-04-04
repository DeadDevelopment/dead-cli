import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface timepicker {
    name: string,
    field: {
        appearance: string,
        classes: string
    },
    fieldLabel: {
        text: string,
        classes: string
    },
    input: {
        placeholder: string,
        classes: string,
        required: string,
        iconPlacement: string // matIconSuffix || matIconPrefix
    }
}

export async function generatetimep(options: any): Promise<void> {
    try{
        
        const payload: timepicker = {
            name: options.name || 'dead-time-picker',
            field: options.field || {"appearance": "outline", "classes": "m-1rem"},
            fieldLabel: options.fieldLabel || {"classes": "m-1rem", "text": "Schedule a time."},
            input: options.input || {"classes": "button-text", "iconPlacement": "suffix", "placeholder": "Our Hours: 8AM-4PM"}
        };

        const response = await axios.post(
            ENDPOINTS.timePicker,
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
