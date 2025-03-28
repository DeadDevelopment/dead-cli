import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface TitleParagraph {
    name: string,
    title: {
        classes: string,
        text: string
    },
    paragraph: {
        classes: string,
        text: string
    }
}

export async function generateTp(options: any): Promise<void> {
    try {
        const payload: TitleParagraph = {
            name: options.name || 'dead-title-paragraph',
            title: options.title || {"text": "Title", "classes": "" },
            paragraph: options.paragraph || {"text": "Paragraph text.", "classes": ""}
        };

        const response = await axios.post(
            ENDPOINTS.titleParagraph,
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

