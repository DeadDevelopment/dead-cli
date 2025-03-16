import axios from 'axios';
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
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateTabs',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated Tabs.');
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

