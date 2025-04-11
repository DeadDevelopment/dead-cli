import axios from 'axios';
import { ERRORS, MSGS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles, GenerationResult } from '../utils/writer';

export interface appConfig {
    app: {
        title: string,
        isLoadingName: string,
        isLoadingPath: string,
        loadingCName: string,
        breakPName: string,
        breakPPath: string,
    },
    desktop: {
        nav: string,
        footer: string
    },
    md: {
        nav: string,
        footer: string
    },
    mobile: {
        nav: string,
        footer: string
    },
    routes: {
        component: string,
        path: string,
        child: string,
        childImport: string
    }[]
}

export async function generateAppConfig(options: appConfig): Promise<void> {
    try {
        const payload: appConfig = {
            app: options.app || {
                "title": "DeadApp",
                "isLoadingName": "Loading",
                "isLoadingPath": `./services/Loading.service`,
                "breakPName": "BreakPoint",
                "breakPPath": `./services/BreakPoint.service`,
            },
            desktop: options.desktop || {
                "nav": "DNav",
                "footer": "DFooter",
            },
            md: options.md || {
                "nav": "MDNav",
                "footer": "MDFooter",
            },
            mobile: options.mobile || {
                "nav": "MNav",
                "footer": "MFooter",
            },
            routes: options.routes || [
                {
                    "component": "Home",
                    "path": ` `,
                    "child": "HomeRoutes",
                    "childImport": `./components/home/home.routes`,
                },
                {
                    "component": "Services",
                    "path": `services`,
                    "child": "ServicesRoutes",
                    "childImport": `./components/services/services.routes`,
                }
            ],
        };

        const response = await axios.post(
            ENDPOINTS.appConfig,
            payload
        );

        if (response.data.success && response.data.result) {
            
            const baseName = 'app';
            const result: GenerationResult = { ...response.data.result };

            if (!result.scss) {
                result.scss = ''; // create an empty SCSS file
            }
      
            // Define filename templates. You can customize these as needed.
            const filenameMap = {
                html: 'app.component.html',
                ts: 'app.component.ts',
                scss: 'app.component.scss',
                spec: 'app.component.spec.ts',
                config: 'app.config.ts',
                routes: 'app.routes.ts'
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

