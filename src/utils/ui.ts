import chalk from 'chalk'

export const ui = {
  label:   (s: string) => chalk.bold.hex('#f5f5f5')(s),   // brand white
  warn:    (s: string) => chalk.bold.hex('#f5f5f5')(s),  
  heading: (s: string) => chalk.bold.hex('#a784c2')(s),   // brand purple
  ok:      (s: string) => chalk.bold.hex('#7cb17e')(s),   // brand green #7cb17e
  err:     (s: string) => chalk.bold.hex('#f94144')(s),   // brand error
  dim:     (s: string) => chalk.hex('#666666')(s),
  code:    (s: string) => chalk.hex('#a784c2')(s),
}
