/** @format */

export default class eventKeys {
  static readonly programs = {
    close: "close",
    open: "open",
    minimize: "minimize",
    maximize: "maximize",
    // TODO: specify where it's emitted from.

    /** Focus switched to a new window. All programs listen to this to disable focus. @argument focusedSceneKey  */
    newFocus: "new-focus",
  };

  static readonly UI = {
    /** From PointerButton component */
    click: "click",
  };
}
