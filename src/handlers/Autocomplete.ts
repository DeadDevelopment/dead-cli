import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface autocomplete {
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
        type: string,
        classes: string,
        required: string
    },
    autocompletes: {
        value: string,
        label: string,
        classes: string
    }[]
}

export async function generateautocomplete(options: any): Promise<void> {
    try {
        const payload: autocomplete = {
            name: options.name || 'dead-modal',
            field: options.field || {"appearance": "fill", "classes": "button-text"},
            fieldLabel: options.fieldLabel || {"text": "Label text.", "classes": "pri-dark small-text"},
            input: options.input || {"placeholder": "Placeholder text.", "type": "text", "classes": "small-text pri-dark"},
            autocompletes: options.autocompletes || [
                {"value": "1", "label": "Option 1", "classes": "pri small-text"},
                {"value": "2", "label": "Option 2", "classes": "pri small-text"}
            ]
        };

        const response = await axios.post(
            ENDPOINTS.autocomplete,
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
                modal: '{name}-modal.html',
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


