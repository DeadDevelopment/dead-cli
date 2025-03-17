import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
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
            ENDPOINTS.titleSubListButton,
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
                scss: '{name}.component.scss'
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
