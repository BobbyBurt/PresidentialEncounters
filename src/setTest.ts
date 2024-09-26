/** @format */

import characterData from "./data/characterData";
import characterTweenLibrary from "./data/characterTweenLibrary";

export default class setTest {
  private presidentName = "Poopypants";

  public script: Array<string | audioCommand | tweenCommand> = [
    `My name is President ${this.presidentName}`,
    { type: "font", key: characterTweenLibrary.characterTweenKeys.bounce },
    { type: "tween", key: "asdf", etc: characterData.names.blank },
  ];
}

type tweenCommand = {
  command: "tween";
  key: string;
  character: string;
};

type audioCommand = {
  command: "audio";
  key: string;
  delay: number;
};
