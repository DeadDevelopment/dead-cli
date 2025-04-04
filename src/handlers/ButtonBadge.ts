import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface buttonbadge {
    name: string,
    button: {
        label: string,
        classes: string,
        bType: string,
        routerLink: string
    },
    value: string,
    position: string,
    overlap: string,
    size: string
}

export async function generatebuttonbadge(options: any): Promise<void> {
    try {
        const payload: buttonbadge = {
            name: options.name || 'dead-button-badge',
            button: options.button || {
                "classes": "m-1rem",
                "label": "Bag",
                "bType": "mat-flat-button",
                "routerLink": "/testRouterLink"
            },
            value: options.value || "2",
            position: options.position || "before",
            overlap: options.overlap || "false",
            size: options.size || "large"
        };

        const response = await axios.post(
            ENDPOINTS.buttonBadge,
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
