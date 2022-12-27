import { program } from "commander";

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .option("-h, --help", "display help for command")
  .option("-f, --format <type>", "output format")
  .version("0.0.1");

program.parse();

if (program.opts().help) {
  program.help();
}
