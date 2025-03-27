import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Modal {
    name: string,
    button: {
      type: string,
      classes: string,
      label: string
    },
    modal: {
      fileName: string,
      oSpeed: string,
      cSpeed: string,
      title: string,
      titleClasses: string,
      content: string,
      contentClasses: string,
      actionsClasses: string,
      buttonLabel: string,
      buttonClasses: string,
      buttonType: string
    }
}

export async function generatemodal(options: any): Promise<void> {
    try {
        const payload: Modal = {
            name: options.name || 'dead-modal',
            button: options.button || {"label": "buttonLabel", "routerLink": "/link", "classes": "m-1rem"},
            modal: options.modal || {
                "actionsClasses": "m-auto mw-16rem",
                "buttonClasses": "m-1rem button-text",
                "buttonLabel": "Let's Go",
                "buttonType": "mat-flat-button",
                "cSpeed": "100",
                "oSpeed": "200",
                "content": "CompClassName",
                "contentClasses": "m-1rem",
                "fileName": "pop-up",
                "title": "Modal Title",
                "titleClasses": "substatement m-1rem pri-dark"
            }
        };

        const response = await axios.post(
            ENDPOINTS.modal,
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
                modal: '{name}-modal.html',
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

