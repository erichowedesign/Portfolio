import type { ImageSlot } from "@/data/projects";

const image = (file: string, width: number, height: number): ImageSlot => ({
  label: "Fun Stuff",
  src: `/images/projects/fun-stuff/page/${file}`,
  width,
  height,
});

/** Images in the Fun Stuff well, in the order they appear on the page. */
export const funStuffImages: ImageSlot[][] = [
  [image("01.png", 2731, 4096)],
  [image("02.png", 2161, 2160)],
  [image("03.jpg", 2160, 2700)],
  [image("04.png", 3840, 1600)],
  [image("05.png", 3277, 4096)],
  [image("06.png", 2160, 2700)],
  [image("07.png", 3840, 1600)],
  [
    image("08.png", 2160, 2700),
    {
      label: "Donnie Vegas Full Tilt Record",
      video: "/images/projects/fun-stuff/Donnie%20Vegas%20Full%20Tilt%20Record.MP4",
      width: 2160,
      height: 2700,
    },
  ],
  [image("09.jpg", 2400, 960)],
  [image("10.png", 3840, 3840)],
  [image("11.png", 3840, 2480)],
  [image("12.png", 819, 819)],
  [image("13.png", 2160, 2160)],
  [image("14.png", 3840, 3840)],
  [image("20.png", 1081, 1350)],
  [image("21.png", 3840, 2400)],
  [image("15.png", 1584, 2448)],
  [image("16.png", 3840, 1978)],
  [image("17.png", 3840, 1978)],
  [image("18.png", 3840, 1978)],
  [image("19.png", 3277, 4096)],
];
