import axios from 'axios';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface TitleButton {
    name: string,
    title: string,
    button: string,
    buttonType: string
}

export async function generateTb(options: any): Promise<void> {
    try {
        const payload: TitleButton = {
            name: options.name || 'dead-title-button',
            title: options.title || {"text": "Title", "classes": "m-1rem h2 pri-lite"},
            button: options.button || {"label": "buttonLabel", "routerLink": "/link", "classes": "m-1rem"},
            buttonType: options.buttonType || 'mat-flat-button'
        };

        const response = await axios.post(
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateTitleButton',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated TitleButton.');
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
