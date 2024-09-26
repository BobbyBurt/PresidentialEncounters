/** @format */

export default class characterTweenLibrary {
  static readonly characterTweenKeys = {
    bounce: "bounce",
  };
  static readonly tweenMap: Map<string, characterTween> = new Map([
    [
      this.characterTweenKeys.bounce,
      {
        targets: undefined,
        duration: 200,
        y: -15,
        yoyo: true,
        ease: Phaser.Math.Easing.Sine.Out,
        relativePosition: true,
      },
    ],
    [
      "shift-right",
      {
        targets: undefined,
        duration: 200,
        x: 15,
        ease: Phaser.Math.Easing.Cubic.Out,
        relativePosition: true,
      },
    ],
    [
      "shift-left",
      {
        targets: undefined,
        duration: 200,
        x: -15,
        ease: Phaser.Math.Easing.Cubic.Out,
        relativePosition: true,
      },
    ],
    [
      "talk-dip",
      {
        targets: undefined,
        duration: 100,
        y: 10,
        yoyo: true,
        ease: Phaser.Math.Easing.Sine.Out,
        relativePosition: true,
      },
    ],
    [
      "shake",
      {
        targets: undefined,
        duration: 40,
        x: -3,
        yoyo: true,
        repeat: 10,
        ease: Phaser.Math.Easing.Bounce.InOut,
        relativePosition: true,
      },
    ],
    [
      "float-up",
      {
        targets: undefined,
        duration: 1200,
        y: -300,
        ease: Phaser.Math.Easing.Quadratic.InOut,
      },
    ],
    [
      "fall-in",
      {
        targets: undefined,
        duration: 600,
        y: 400,
        ease: Phaser.Math.Easing.Bounce.Out,
      },
    ],
    [
      "appear-left",
      {
        targets: undefined,
        duration: 1000,
        startingX: -100,
        startingY: 400,
        x: 300,
        ease: Phaser.Math.Easing.Cubic.Out,
      },
    ],
  ]);
}

// I can't figure out how to get intellisense to auto fill the properties

export type characterTween = Phaser.Types.Tweens.TweenBuilderConfig & {
  startingX?: number;
  startingY?: number;
  relativePosition?: boolean;
};

// export type characterTweenKeys =  "bounce" | "shift-right" | "shift-left" | "talk-dip" | "shake" | "float-up" | "fall-in" | "appear-left";

// export var characterTweenKeys2 = {
//   bounce: 'bounce',
//   shiftRight: 'shift-right'
// }
