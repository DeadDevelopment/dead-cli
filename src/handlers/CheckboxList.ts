import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface checkboxlist {
    name: string,
    checkboxes: {
        classes: string,
        ngModel: string,
        indeterminate: string,
        labelPos: string,
        label: string,
        disabled: string
    }[]
}

export async function generatecboxes(options: any): Promise<void> {
    try {
        const payload: checkboxlist = {
            name: options.name || 'dead-checkbox-list',
            checkboxes: options.checkboxs || [
                {
                    "classes": "m-1rem",
                    "ngModel": "checked",
                    "indeterminate": "!indeterminate",
                    "labelPos": "after",
                    "label": "Check the box to win a prize.",
                    "disabled": "!disabled"
                },
                {
                    "classes": "m-1rem",
                    "ngModel": "checked",
                    "indeterminate": "!indeterminate",
                    "labelPos": "after",
                    "label": "Check the box to win a prize.",
                    "disabled": "!disabled"
                }
            ]
        };

        const response = await axios.post(
            ENDPOINTS.checkboxList,
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
