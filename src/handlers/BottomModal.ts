import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface bottommodal {
    name: string,
    trigger: {
        label: string,
        bType: string,
        classes: string
    },
    modal: {
        component: string,
        bType: string,
        bClasses: string,
        bLabel: string,
        fileName: string
    }
}

export async function generatebottommodal(options: any): Promise<void> {
    try {
        const payload: bottommodal = {
            name: options.name || 'dead-button',
            trigger: options.trigger || {"label": "Trigger Label", "bType": "mat-flat-button", "classes": "button-text m-1rem"},
            modal: options.modal || {
                "component": "CName",
                "bType": "mat-raised-button",
                "bClasses": "button-text",
                "bLabel": "Close",
                "fileName": "payment"
            }
        };

        const response = await axios.post(
            ENDPOINTS.bottomModal,
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
                spec: '{name}.component.spec.ts',
                modal: '{name}-bottom-modal.html',
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
