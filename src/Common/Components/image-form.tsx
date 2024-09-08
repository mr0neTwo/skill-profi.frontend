import React, {useRef} from "react";

interface IImageForm {
    defaultImageUrl: string
    loadedImage: string | null
    loadImage: (image:string) => void
}

const ImageForm: React.FC<IImageForm> = ({defaultImageUrl, loadedImage, loadImage}) => {

    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                loadImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    return (
        <div className="w-[420px] h-72 p-4 border-2 border-secondary dark:border-secondary-dark rounded-lg">

            <div
                className="w-full h-full flex items-center justify-center cursor-pointer"
                onClick={handleImageClick}
            >
                <img
                    src={loadedImage || defaultImageUrl}
                    alt="Uploaded Preview"
                    className="max-w-full max-h-full"
                />
            </div>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputFileRef}
                className="hidden"
            />
        </div>
    )
}

export {ImageForm}