import Image from "next/image";

export default function GalleryComponent() {
    //* Vars
    const GAP = 8; // Gap between items
    const GALLERY_WIDE_ENTRY_WIDTH = 500;
    const GALLERY_WIDE_ENTRY_HEIGHT = 250;
    const GALLERY_SQUARE_ENTRY_WIDTH = 250;
    const GALLERY_SQUARE_ENTRY_HEIGHT = 250;
    const GALLERY_PORTRAIT_ENTRY_WIDTH = 320;
    const GALLERY_PORTRAIT_ENTRY_HEIGHT = 510;

    //* Paths
    const GALLERY_ROOT_PATH = "/images/gallery/";

    return (
        <div className="w-full h-fit p-2 md:p-4 overflow-hidden">
            {/* Desktop Layout (lg and up) */}
            <div className="hidden lg:block">
                <div className="flex" style={{ gap: `${GAP}px` }}>
                    {/* Left to middle cube */}
                    <div className="flex flex-col" style={{ gap: `${GAP}px` }}>
                        {/* ----------- upper row ----------- */}
                        <div className="flex" style={{ gap: `${GAP}px` }}>
                            <GalleryItem 
                                src={`${GALLERY_ROOT_PATH}w_1.jpg`}
                                width={GALLERY_WIDE_ENTRY_WIDTH}
                                height={GALLERY_WIDE_ENTRY_HEIGHT}
                                highlight={"Doing something together to reach automate future"}
                            />
                            <GalleryItem 
                                src={`${GALLERY_ROOT_PATH}w_2.png`}
                                width={GALLERY_WIDE_ENTRY_WIDTH}
                                height={GALLERY_WIDE_ENTRY_HEIGHT}
                                highlight={"2"} 
                            />
                        </div>

                        {/* ------------- square items row + title square ------------ */}
                        <div className="flex" style={{ gap: `${GAP}px` }}>
                            <GalleryItem 
                                src={`${GALLERY_ROOT_PATH}c_1.jpg`}
                                width={GALLERY_SQUARE_ENTRY_WIDTH}
                                height={GALLERY_SQUARE_ENTRY_HEIGHT}
                                highlight={"3"} 
                            />
                            <GalleryItem 
                                src={`${GALLERY_ROOT_PATH}c_2.jpg`}
                                width={GALLERY_SQUARE_ENTRY_WIDTH}
                                height={GALLERY_SQUARE_ENTRY_HEIGHT}
                                highlight={"4"} 
                            />
                            
                            {/* Title square */}
                            <div 
                                className="flex p-8 border-2 dark:border-gray-300 border-gray-400 border-dashed justify-between items-end" 
                                style={{ width: `${GALLERY_WIDE_ENTRY_WIDTH - GAP}px`, height: `${GALLERY_SQUARE_ENTRY_HEIGHT}px` }}
                            >
                                <h1 className="righteous-regular flex flex-col">
                                    <span className="text-lg text-gray-500 dark:text-gray-200">What</span>
                                    <span className="text-5xl">DevFest</span>
                                    <span className="text-lg text-gray-500 dark:text-gray-200">Looked Like</span>
                                    <span className="text-3xl">Before !</span>
                                </h1>
                                <img className="w-18 h-12" src={"/stickers/arrow_sticker.png"} alt={""} />
                            </div>
                        </div>
                    </div>

                    {/* ----------- Right side rec -----------------*/}
                    <GalleryItem 
                        src={`${GALLERY_ROOT_PATH}p_1.jpg`}
                        width={GALLERY_PORTRAIT_ENTRY_WIDTH}
                        height={GALLERY_PORTRAIT_ENTRY_HEIGHT}
                        highlight={"5"} 
                    />
                </div>

                {/* ------------- bottom side row ------------------ */}
                <div className="flex" style={{ gap: `${GAP}px`, marginTop: `${GAP}px` }}>
                    <GalleryItem 
                        src={`${GALLERY_ROOT_PATH}w_3.jpg`}
                        width={GALLERY_WIDE_ENTRY_WIDTH}
                        height={GALLERY_WIDE_ENTRY_HEIGHT}
                        highlight={"6"} 
                    />
                    <GalleryItem 
                        src={`${GALLERY_ROOT_PATH}p_2.png`}
                        width={GALLERY_SQUARE_ENTRY_WIDTH}
                        height={GALLERY_SQUARE_ENTRY_HEIGHT}
                        highlight={"7"} 
                    />
                    <GalleryItem 
                        src={`${GALLERY_ROOT_PATH}w_4.png`}
                        width={GALLERY_WIDE_ENTRY_WIDTH + GALLERY_PORTRAIT_ENTRY_WIDTH}
                        height={GALLERY_WIDE_ENTRY_HEIGHT}
                        highlight={"8"} 
                    />
                </div>
            </div>

            {/* Tablet & Mobile Layout */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-1 overflow-x-hidden">
                {/* Title card - first on mobile */}
                <div className="md:col-span-2 flex p-6 md:p-8 border-2 dark:border-gray-300 border-gray-400 border-dashed justify-between items-end min-h-[200px]">
                    <h1 className="righteous-regular flex flex-col">
                        <span className="text-base md:text-lg text-gray-500 dark:text-gray-200">What</span>
                        <span className="text-3xl md:text-5xl">DevFest</span>
                        <span className="text-base md:text-lg text-gray-500 dark:text-gray-200">Looked Like</span>
                        <span className="text-2xl md:text-3xl">Before !</span>
                    </h1>
                    <img className="w-12 h-8 md:w-18 md:h-12" src={"/stickers/arrow_sticker.png"} alt={""} />
                </div>

                {/* Gallery items */}
                <GalleryItem 
                    src={`${GALLERY_ROOT_PATH}w_1.jpg`}
                    highlight={"Doing something together to reach automate future"}
                    responsive
                />
                <GalleryItem 
                    src={`${GALLERY_ROOT_PATH}w_2.png`}
                    highlight={"2"}
                    responsive
                />
                <GalleryItem 
                    src={`${GALLERY_ROOT_PATH}c_1.jpg`}
                    highlight={"3"}
                    responsive
                />
                <GalleryItem 
                    src={`${GALLERY_ROOT_PATH}c_2.jpg`}
                    highlight={"4"}
                    responsive
                />
                <GalleryItem 
                    src={`${GALLERY_ROOT_PATH}w_3.jpg`}
                    highlight={"6"}
                    responsive
                />
                <GalleryItem 
                    src={`${GALLERY_ROOT_PATH}w_4.png`}
                    highlight={"8"}
                    responsive
                    className="md:col-span-2"
                />
            </div>
        </div>
    );
}

function GalleryItem({ 
    src, 
    width, 
    height, 
    highlight,
    responsive = false,
    className = ""
}: {
    src: string;
    width?: number;
    height?: number;
    highlight: string;
    responsive?: boolean;
    className?: string;
}) {
    const style = responsive 
        ? {} 
        : { width: `${width}px`, height: `${height}px` };
    
    const containerClasses = responsive
        ? `relative overflow-hidden group w-full aspect-video ${className}`
        : `relative overflow-hidden group ${className}`;

    return (
        <div className={containerClasses} style={style}>
            <Image
                alt={`gallery_entry_title_${highlight}`}
                src={src}
                fill
                className="object-cover group-hover:blur-sm transition-all duration-500"
            />

            {/* hover card */}
            <div className="dark:bg-black/70 bg-white/70 w-full h-full flex items-center justify-center z-10 absolute -bottom-full border-2 border-dashed border-gray-800 dark:border-gray-300 group-hover:bottom-0 transition-all duration-500 p-4 md:p-8">
                <strong className="text-sm md:text-lg flex text-center items-center">
                    <span className="text-3xl md:text-5xl">"</span>
                    <span className="px-1 instrument-sans-regular">{highlight}</span>
                    <span className="text-3xl md:text-5xl">"</span>
                </strong>
            </div>
        </div>
    );
}