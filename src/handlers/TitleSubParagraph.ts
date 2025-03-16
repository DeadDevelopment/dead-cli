import axios from 'axios';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface TitleSubParagraph {
    name: string,
    title: {
        text: string,
        classes: string
    },
    sub: {
        text: string,
        classes: string
    },
    paragraph: {
        text: string,
        classes: string
    } 
}

export async function generateTsp(options: any): Promise<void> {
    try {
        const payload: TitleSubParagraph = {
            name: options.name || 'dead-title-sub-paragraph',
            title: options.title || {"text": "Title", "classes": "m-1rem pri h2"},
            sub: options.sub || {"text": "Substatement sentences.", "classes": "m-1rem substatement pri-lite"},
            paragraph: options.paragraph || {"text": "Title", "classes": "m-1rem pri-lite small-text"}
        };

        const response = await axios.post(
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateTitleSubParagraph',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated TitleSubParagraph.');
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
