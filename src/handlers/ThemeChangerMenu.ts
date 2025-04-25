import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface themeMenu {
    name: string,
    menuTrig: {
        buttonType: string,
        icon: string,
        classes: string
    },
    menuItems: {
        label: string
    }[],
    themes: {
        methodName: string,
        themeName: string,
        primary: string,
        primaryLight: string,
        primaryDark: string,
        secondary: string,
        background: string,
        error: string
    }[],
    themeService: {
        name: string,
        path: string
    }
}

export async function generateTCM(options: any): Promise<void> {
    try {
        const payload: themeMenu = {
            name: options.name || 'dead-theme-changer-menu',
            menuTrig: options.menuTrig || {
                buttonType: "mat-flat-button",
                classes: "m-1rem button-text",
                icon: "menu"
            },
            menuItems: options.menuItems || [
                {label: "Dead Theme"},
                {label: "Light Theme"}
            ],
            themes: options.themes || [
                {
                    themeName: "DarkMode",
                    methodName: "setDarkMode",
                    primary: "#1E88E5",
                    primaryLight: "#6AB7FF",
                    primaryDark: "#005CB2",
                    secondary: "#FF7043",
                    error: "#EF5350",
                    background: "#121212"
                },
                {
                    themeName: "LightMode",
                    methodName: "setLightMode",
                    primary: "#1976D2",
                    primaryLight: "#63A4FF",
                    primaryDark: "#004BA0",
                    secondary: "#FF8A65",
                    error: "#D32F2F",
                    background: "#FFFFFF"
                }  
            ],
            themeService: options.themeService || {
                name: "ThemeChanger",
                path: "../../services/ThemeChanger.service"
            }
        };

        console.log('Payload being sent:', JSON.stringify(payload, null, 2));

        const response = await axios.post(
            ENDPOINTS.themeChangerMenu,
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
