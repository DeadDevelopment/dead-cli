import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface TitleParagraphButton {
    name: string,
    title: {
        text: string,
        classes: string
    },
    paragraph: {
        text: string,
        classes: string
    },
    button: {
        text: string,
        classes: string
    },
    buttonType: string
}

export async function generateTpb(options: any): Promise<void> {
    try {
        const payload: TitleParagraphButton = {
            name: options.name || 'dead-title-paragraph-button',
            title: options.title || {"text": "Title", "classes": "m-1rem pri h2"},
            paragraph: options.paragraph || {"text": "Title", "classes": "m-1rem pri-lite small-text"},
            button: options.button || {"label": "buttonLabel", "routerLink": "/link", "classes": "m-1rem"},
            buttonType: options.buttonType || 'mat-flat-button'
        };

        const response = await axios.post(
            ENDPOINTS.titleParagraphButton,
            payload
        );

        if (response.data.success && response.data.result) {
            const baseName = options.name;
            const result: GenerationResult = { ...response.data.result };
      
            // If you want to generate a SCSS file even if not provided:
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
