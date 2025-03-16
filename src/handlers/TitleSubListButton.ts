import axios from 'axios';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Items {
    text: string,
    classes: string
}

export interface TitleSubListButton {
    name: string,
    title: string,
    sub: string,
    list: Items[],
    button: string,
    buttonType: string
}

export async function generateTslb(options: any): Promise<void> {
    try {
        const payload: TitleSubListButton = {
            name: options.name || 'dead-title-sub-list-button',
            title: options.title || {"text": "Title", "classes": "m-1rem pri-lite"},
            sub: options.sub || {"text": "Substatement sentences.", "classes": "m-1rem substatement pri-lite"},
            list: Array.isArray(options.list) ? options.list : [
                { text: "list item one", classes: "m-1rem body pri" },
                { text: "list item two", classes: "m-1rem body pri-dark" }
            ],
            button: options.button || {"label": "buttonLabel", "routerLink": "/link", "classes": "m-1rem"},
            buttonType: options.buttonType || 'mat-flat-button',
        };

        const response = await axios.post(
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateTitleSubListButton',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated TitleSubListButton.');
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
