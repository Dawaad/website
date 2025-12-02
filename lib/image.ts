export interface VisualProps extends ImageProps{
    alt: string
    placeholder: string
    offset?: {x: number, y: number}
}

interface ImageProps {
    src: string;
}

export const customImageLoader = ({ src }: ImageProps) => {
    return `https://cdn.jtucker.io/${src}`;
};
