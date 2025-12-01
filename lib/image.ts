interface ImageProps {
    src: string;
}

export const customImageLoader = ({ src }: ImageProps) => {
    return `https://cdn.jtucker.io/${src}`;
};
