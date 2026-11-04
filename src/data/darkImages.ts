/** Light image path to its dark-canvas variant. */
export const darkImageFor: Record<string, string> = {
  "/images/projects/15-years-of-sb-dunk/02.jpg": "/images/home/dark/nike-sb.png",
  "/images/projects/15-years-of-sb-dunk/03.jpg": "/images/projects/15-years-of-sb-dunk/dark/03.png",
  "/images/projects/15-years-of-sb-dunk/08.jpg": "/images/projects/15-years-of-sb-dunk/dark/08.png",
  "/images/projects/15-years-of-sb-dunk/12.jpg": "/images/projects/15-years-of-sb-dunk/dark/12.png",
  "/images/projects/google-product-experts/01.jpg": "/images/projects/google-product-experts/dark/01.png",
  "/images/projects/google-product-experts/08.jpg": "/images/projects/google-product-experts/dark/08.png",
  "/images/projects/google-product-experts/10.jpg": "/images/projects/google-product-experts/dark/10.png",
  "/images/projects/google-product-experts/12.jpg": "/images/projects/google-product-experts/dark/12.png",
  "/images/projects/google-product-experts/14.jpg": "/images/projects/google-product-experts/dark/14.png",
  "/images/projects/google-product-experts/16.jpg": "/images/projects/google-product-experts/dark/16.png",
  "/images/projects/google-product-experts/22.jpg": "/images/projects/google-product-experts/dark/22.png",
  "/images/projects/google-product-experts/23.jpg": "/images/projects/google-product-experts/dark/23.png",
  "/images/projects/google-product-experts/24.jpg": "/images/home/dark/google.png",
  "/images/projects/google-product-experts/25.jpg": "/images/projects/google-product-experts/dark/25.png",
  "/images/projects/google-product-experts/27.jpg": "/images/projects/google-product-experts/dark/27.png",
  "/images/projects/google-product-experts/29.jpg": "/images/projects/google-product-experts/dark/29.png",
  "/images/projects/natures-recipe/01.jpg": "/images/projects/natures-recipe/dark/01.png",
  "/images/projects/natures-recipe/03.jpg": "/images/projects/natures-recipe/dark/03.png",
  "/images/projects/natures-recipe/04.jpg": "/images/projects/natures-recipe/dark/04.png",
  "/images/projects/natures-recipe/08.jpg": "/images/home/dark/natures-recipe.png",
  "/images/projects/nikeplus/02.jpg": "/images/projects/nikeplus/dark/02.png",
  "/images/projects/nikeplus/03.jpg": "/images/home/dark/nike-plus.png",
  "/images/projects/nikeplus/05.jpg": "/images/projects/nikeplus/dark/05.png",
  "/images/projects/nikeplus/07.jpg": "/images/projects/nikeplus/dark/07.png",
  "/images/projects/nikeplus/08.jpg": "/images/projects/nikeplus/dark/08.png",
  "/images/projects/nikeplus/10.jpg": "/images/projects/nikeplus/dark/10.png",
  "/images/projects/nikeplus/11.jpg": "/images/projects/nikeplus/dark/11.png",
  "/images/projects/nikeplus/12.jpg": "/images/projects/nikeplus/dark/12.png",
  "/nike/media/material-library/01.png": "/nike/media/material-library/dark-01.png",
  "/nike/media/material-library/02.png": "/nike/media/material-library/dark-02.png",
  "/nike/media/material-library/03.png": "/nike/media/material-library/dark-03.png",
  "/nike/media/material-library/04.png": "/nike/media/material-library/dark-04.png",
};

export function darkVariant(src?: string) {
  return src ? darkImageFor[src] : undefined;
}
