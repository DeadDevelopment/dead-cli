import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface exppanel {
    name: string,
    accordian: {
        classes: string,
        multi: string
    },
    panels: {
        panelClasses: string,
        headerClasses: string,
        title: string,
        titleClasses: string,
        description: string,
        descriptionClasses: string
        component: string
    }[]
}

export async function generateexp(options: any): Promise<void> {
    try {
        const payload: exppanel = {
            name: options.name || 'dead-expansion-panel',
            accordian: options.accordian || {"multi": "!multi", "classes": "m-1rem"},
            panels: options.panels || [
                {
                    "panelClasses": "p-1rem",
                    "headerClasses": "pri-lite button-text",
                    "title": "Expansion Panel Title",
                    "titleClasses": "m-1rem body pri",
                    "description": "Description for the panel",
                    "descriptionClasses": "m-1rem",
                    "component": "Component"
                }
            ]
        };

        const response = await axios.post(
            ENDPOINTS.expansionPanel,
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

