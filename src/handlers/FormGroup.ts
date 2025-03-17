import axios from 'axios';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface FormGroup {
    name: string,
    groupName: string,
    formGroup: {
        fieldAppearance: string,
        fieldClasses: string,
        fieldLabel: string,
        fieldLableClasses: string,
        inputPlaceholder: string,
        inputClasses: string,
        inputType: string,
        controlName: string,
        required: string
    }[]
}

export async function generateFg(options: any): Promise<void> {
    try {
        const payload: FormGroup = {
            name: options.name || 'dead-form-group',
            groupName: options.groupName || 'formGroup',
            formGroup: options.formGroup ||
            [
                {
                    fieldAppearance: "outline",
                    fieldClasses: "m-1rem",
                    fieldLabel: "fieldLabel",
                    fieldLabelClasses: "small-text",
                    inputPlaceholder: "Placeholder",
                    inputClasses: "p-1rem",
                    inputType: "text",
                    controlName: "controlName",
                    required: "required"
                }
            ]
        }

        const response = await axios.post(
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateFormGroup',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated FormGroup.');
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
