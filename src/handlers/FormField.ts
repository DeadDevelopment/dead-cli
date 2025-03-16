import axios from 'axios';
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
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateFormField',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated FormField.');
            const baseName = options.name; // Use the CLI name option
            // Make a copy of the result to modify if needed
            const result: GenerationResult = { ...response.data.result };
      
            // If you want to generate a SCSS file even if not provided:
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
        } else {
            console.error('Response indicated failure or missing result.');
        }
    } catch (error: any) {
        console.error('Error:', error.message);
    }
}
