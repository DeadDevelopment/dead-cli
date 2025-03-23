import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface ListButton {
    name: string,
    list: {
      text: string,
      classes: string
    }[],
    button: {
      label: string,
      routerLink: string,
      classes: string,
    },
    buttonType: string
}

export async function generateLb(options: any): Promise<void> {
    try {
        const payload: ListButton = {
            name: options.name || 'dead-list-button',
            buttonType: options.buttonType || 'mat-flat-button',
            list: options.list ? JSON.parse(options.list) : [
                { "classes": "m-1rem pri-dark body", "text": "list item 1"},
                { "classes": "m-1rem pri-dark body", "text": "list item 2"},
                { "classes": "m-1rem pri-dark small-text", "text": "list item 3"},
            ],
            button: options.button || {"classes": "m-1rem button-text", "label": "click me", "routerLink": "/path"}
        };

        const response = await axios.post(
            ENDPOINTS.listButton,
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
    }  catch (error: any) {
        console.error('Error:', error.message);
    }
}

