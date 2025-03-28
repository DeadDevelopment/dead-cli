import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Tabs {
    name: string,
    groupClasses: string,
    tabs: {
        tabLabel: string,
        content: string,
        classes: string
    }[],
    stretchTabs: string
    alignment: string
}

export async function generateTs(options: any): Promise<void> {
    try {
        const payload: Tabs = {
            name: options.name || 'dead-tabs',
            groupClasses: options.groupClasses || 'm-1rem',
            stretchTabs: options.stretchTabs || '',
            alignment: options.alignment || 'mat-align-tabs="center"',
            tabs: options.tabs || [
                {
                    tabLabel: "label1",
                    content: "Component1",
                    classes: "pri"
                },
                {
                    tabLabel: "label2",
                    content: "Component2",
                    classes: "pri"
                },
                {
                    tabLabel: "label3",
                    content: "Component3",
                    classes: "pri"
                },
            ]
        };

        const response = await axios.post(
            ENDPOINTS.tabs,
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

