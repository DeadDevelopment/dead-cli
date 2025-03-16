import axios from 'axios';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface Menu {
    name: string,
    menuTrig: {
        buttonType: string,
        icon: string,
        classes: string
    },
    menuItems: {
        label: string,
        routerLink: string
    }[],
    position: string
}

export async function generateM(options: any): Promise<void> {
    try{
        const payload: Menu = {
            name: options.name || 'dead-menu',
            position: options.position || '',
            menuTrig: options.menuTrig || {"buttonType": "mat-fab", "classes": "size-4rem", "icon": "menu"},
            menuItems: options.menuItems ? JSON.parse(options.buttons) : [{"label": "Link", "routerLink": "/route"}],
        };

        const response = await axios.post(
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateMenu',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated Menu.');
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
