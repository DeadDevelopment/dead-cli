import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface tooltip {
    name: string,
    tip: {
        value: string,
        position: string
    },
    button: {
        classes: string,
        label: string,
        type: string,
        routerLink: string
    }
}

export async function generatetip(options: any): Promise<void> {
    try{
        
        const payload: tooltip = {
            name: options.name || 'dead-tooltip',
            tip: options.tip || {"value": "Do what thou wilt.", "position": "after"},
            button: options.button || {"label": "buttonLabel", "routerLink": "/link", "classes": "m-1rem", "type": "mat-flat-button"},
        };

        const response = await axios.post(
            ENDPOINTS.tooltip,
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
