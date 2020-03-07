export interface Mail {
    from: string;
    to: string[];
    body: any;
    headers: [];
    image: Blob[];
}
