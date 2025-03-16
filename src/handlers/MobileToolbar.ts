import axios from 'axios';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface MobileToolbar {
    name: string,
    logoSrc: string,
    logoAlt: string,
    homeIcon: {
        buttonType: string,
        icon: string,
        classes: string,
        iconClasses: string
    },
    menuTrig: {
        buttonType: string,
        icon: string,
        classes: string
    },
    menuItems: {
        label: string,
        routerLink: string,
    }[]
}

export async function generateMt(options: any): Promise<void> {
    try {
        const payload: MobileToolbar = {
            name: options.name || 'dead-mobile-toolbar',
            logoSrc: options.logoSrc || 'https://firebasestorage.googleapis.com/v0/b/deaddevelopment-95591.appspot.com/o/dead_skull.PNG?alt=media&token=1634c2ba-f3e8-49db-bfd6-0b49576cba4a',
            logoAlt: options.logoAlt || 'Dead Development Logo',
            menuItems: options.menuItems ? JSON.parse(options.buttons) : [{"label": "Link", "routerLink": "/route"}],
            homeIcon: options.homeIcon || {"buttonType": "mat-fab", "classes": "size-4rem", "icon": "home", "iconClasses": "pri-dark"},
            menuTrig: options.menuTrig || {"buttonType": "mat-fab", "classes": "size-4rem", "icon": "menu"}
        };

        const response = await axios.post(
            'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/generateMobileToolbar',
            payload
        );

        if (response.data.success && response.data.result) {
            console.log('Generated MobileToolbar.');
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
