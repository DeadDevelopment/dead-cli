import axios from 'axios';
import { ERRORS } from '../utils/utils';
import { ENDPOINTS } from '../utils/endpoints';
import { writeGeneratedFiles } from '../utils/gWriter';
import { getIdToken } from '../utils/auth';
import { ui } from '../utils/ui';
import ora from 'ora';

export async function gHandler(raw: string, options: { ai?: string }) {
  const start = Date.now();
  const spinner = ora('Contacting DeadLibrary API…').start()

  async function callDeadLibraryAPI(forceRefresh = false) {
    const idToken = await getIdToken(forceRefresh);

    const payload: any = { raw };
    if (typeof options.ai === "string") payload.useAI = options.ai;

    return axios.post(
      ENDPOINTS.g,
      payload,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        validateStatus: () => true,
      }
    );
  }

  // 1st attempt
  let resp = await callDeadLibraryAPI(false);

  // If 401, refresh token once and retry
  if (resp.status === 401) {
    console.log(ui.warn('Status: 401, refreshing token…'));
    resp = await callDeadLibraryAPI(true);
  }

  // Log non-200 responses verbosely
  if (resp.status !== 200) {
    spinner.fail(ui.err(`DeadLibrary API Status: ${resp.status}`))
    console.error(ui.err(`Command syntax error.`))
    return
  }

  // Success path
  const data = resp.data;

  spinner.succeed(ui.ok(`DeadLibrary API Status: ${resp.status}`))

  if (data?.writeInstructions) {
    const secs = ((Date.now() - start) / 1000).toFixed(2)
    console.log(ui.label(`Files prepared in ${secs}s`))
    await writeGeneratedFiles(data.writeInstructions);
    return;
  }
  if (data?.help) {
    console.log(data.help);
    return;
  }
  spinner.fail(ui.err(ERRORS.HANDLER_TRY))
}
