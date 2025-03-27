import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Select {
    name: string,
    field: {
        appearance: string,
        classes: string,
        required: string
    },
    select: {
        lClasses: string,
        label: string
    },
    options: {
        value: string,
        label: string
    }[]
}

export async function generateS(options: any): Promise<void> {
    try {
        const payload: Select = {
            name: options.name || 'dead-select',
            field: options.field || {"appearance": "outline", "classes": "m-1rem", "required": "required"},
            select: options.select || {"lClasses": "pri", "label": "Select an option"},
            options: options.options || [
                {"label": "Option 1", "value": "option1"},
                {"label": "Option 2", "value": "option2"},
                {"label": "Option 3", "value": "option3"},
                {"label": "Option 4", "value": "option4"}
            ]
        };

        const response = await axios.post(
            ENDPOINTS.select,
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
