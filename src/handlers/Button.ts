import axios from 'axios';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Button { 
    name: string,
    button: {
        label: string,
        routerLink: string,
        classes: string
    },
    buttonType: string
}

export async function generateB(options: any): Promise<void> {
    try {
        const payload: Button = {
            name: options.name || 'dead-button',
            button: options.button || {"label": "buttonLabel", "routerLink": "/link", "classes": "m-1rem"},
            buttonType: options.buttonType || 'mat-flat-button'
        };

        const response = await axios.post(
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateButton',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated Button.');
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
