import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface DatePicker {
    name: string,
    field: {
        appearance: string,
        classes: string
    }
    label: {
        text: string,
        classes: string
    },
    input: {
        required: string,
        classes: string,
        value: string
    }
}

export async function generatedatep(options: any): Promise<void> {
    try {
        const payload: DatePicker = {
            name: options.name || 'dead-date-picker',
            field: options.field || {
                "appearance": "outline",
                "classes": "body"
            },
            label: options.label || {
                "classes": "small-text m-0-5rem",
                "text": "Snag a Date"
            },
            input: options.input || {
                "required": "false",
                "classes": "m-1rem",
                "value": "selectedDate"
            }
        };

        const response = await axios.post(
            ENDPOINTS.datePicker,
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
    }  catch (error: any) {
        console.error('Error:', error.message);
    }
}
