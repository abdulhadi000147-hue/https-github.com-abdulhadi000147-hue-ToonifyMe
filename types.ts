export enum CartoonStyle {
  Pixar3D = '3D Cartoon',
  Anime = 'Anime',
  ComicBook = 'Comic Book',
  Caricature = 'Caricature',
  PixelArt = 'Pixel Art',
  Claymation = 'Claymation',
  Cyberpunk = 'Cyberpunk',
  Sketch = 'Pencil Sketch'
}

export interface GeneratedImage {
  original: string; // Base64
  processed: string; // Base64 or URL
  style: CartoonStyle;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  result: GeneratedImage | null;
}