import imageCompression from 'browser-image-compression';
    
export async function compressImage(image: File, maxSizeInBythes: number): Promise<File> {
    return await imageCompression(image, {
        maxSizeMB: maxSizeInBythes/1000/1000,
        maxIteration: 30,
        useWebWorker: true,
    })
}