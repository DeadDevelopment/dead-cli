import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Toolbar {
    name: string,
    logoSrc: string,
    logoAlt: string,
    buttons: {
        label: string,
        routerLink: string,
        type: string
    }[]
}

export async function generateT(options: any): Promise<void> {
    try {
        const payload: Toolbar = {
            name: options.name || 'dead-toolbar',
            logoSrc: options.logoSrc || 'https://firebasestorage.googleapis.com/v0/b/deaddevelopment-95591.appspot.com/o/dead_skull.PNG?alt=media&token=1634c2ba-f3e8-49db-bfd6-0b49576cba4a',
            logoAlt: options.logoAlt || 'Dead Development Logo',
            buttons: options.buttons ? JSON.parse(options.buttons) : [{"label": "Link", "routerLink": "/route"}]
        }

        const response = await axios.post(
            ENDPOINTS.toolbar,
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
