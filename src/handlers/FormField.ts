import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface FormField {
    name: string,
    pclasses: string,
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
        type: string,
        classes: string
    },
    required: string
}

export async function generateFf(options: any): Promise<void> {
    try {
        const payload: FormField = {
            name: options.name || 'dead-form-field',
            pclasses: options.pclasses || 'm-1rem',
            required: options.required || 'required="true"',
            field: options.field || {"appearance": "fill", "classes": "button-text"},
            fieldLabel: options.fieldLabel || {"text": "Label text.", "classes": "pri-dark small-text"},
            input: options.input || {"placeholder": "Placeholder text.", "type": "text", "classes": "small-text pri-dark"}
        };

        const response = await axios.post(
            ENDPOINTS.formField,
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
