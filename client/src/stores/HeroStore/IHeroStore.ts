export interface ICarouselImage {
    image: string;
    title?: string;
    content?: string;
    buttonText?: string;
    clickAction?: (() => void);
    theme?: string;
}

export interface IAccordionContent {
    title: string;
    content: string;
}
