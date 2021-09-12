import { ColorPartial } from "@material-ui/core/styles/createPalette";

declare module "@material-ui/core/styles/createPalette" {
  interface PaletteColor extends ColorPartial {}
}