import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface sidenav {
    name: string,
    drawerContainer: {
        classes: string,
        autoSize: string
    },
    drawer: {
        classes: string,
        mode: string
    },
    trigger: {
        label: string,
        bType: string,
        classes: string
    },
    component: {
        className: string,
        classes: string
    }
}

export async function generatesiden(options: any): Promise<void> {
    try{
        
        const payload: sidenav = {
            name: options.name || 'dead-grid-list',
            drawerContainer: options.drawerContainer || {"autoSize": "!auto", "classes": "p-1rem"},
            drawer: options.drawer || {"classes": "p-1rem", "mode": "side"},
            trigger: options.trigger || {"label": "Menu", "classes": "m-1rem button-text pri-dark-bg pri", "bType": "mat-flat-button"},
            component: options.component || {"className": "Nav", "classes": "p-1rem"}
        };

        const response = await axios.post(
            ENDPOINTS.sideNav,
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

