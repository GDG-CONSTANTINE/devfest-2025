import { LiquidButton } from "@/components/animate-ui/components/buttons/liquid";
import { Input } from "@/components/ui/input";
import { ArrowRight, Globe, Hash, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createNewAttendant } from "../services/firebase_handler";
import { GDG_FORM_URL } from "../data/settings";


function SocialMediaItem({ name, link }: { name: string, link: string }) {
    const LOGO_FOLDER_ROOT = "/icons/"
    return (
        <Link href={link}
            target="_blank"
            className="flex gap-2 items-center ">
            <Image
                width={25}
                height={25}
                src={`${LOGO_FOLDER_ROOT}${name}.png`} alt={name} />
            <span className="font-semibold">
                {name[0].toUpperCase() + name.substring(1, name.length)}
            </span>
        </Link>
    )
}



export default function ConnectSection() {
    const [fullName, setFullName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [loading, setIsLoading] = useState(false)


    async function handleAttendantsJoin() {
        // create the new attended
        setIsLoading(true)
        const res = await createNewAttendant({ full_name: fullName, email: emailAddress })
        if (res && res.success) {
            window.location.href = GDG_FORM_URL
        } else {
            setIsLoading(false)
            console.log(res?.data)
        }
    }


    return (
        <section
            id="Connect"
            className="w-screen pt-8"
        >
            {/* Title */}
            <div className="px-4 md:px-8 pt-10 pb-4 flex gap-2">
                <ArrowRight size={30} />
                <h1 className="flex flex-col instrument-sans-small">
                    <span className="text-xl md:text-2xl dark:text-gray-300">It`s time to</span>
                    <span>
                        <span className="text-lg md:text-3xl"> Connect, </span>
                        <span className="text-xl md:text-2xl dark:text-gray-300"> right?</span>
                    </span>
                </h1>
            </div>


            {/* call of action */}
            <p className="px-8 md:px-16 mt-2 text-sm md:text-medium instrument-sans-regular leading-8 dark:text-gray-300 text-gray-500">
                Join the excitement at <strong>Devfest Constantine 2025</strong>—the ultimate gathering of innovators, creators, and tech enthusiasts in our vibrant city! Whether you`re a seasoned developer, a curious student, or a team ready to hack the future, this event is your launchpad for collaboration, skill-building, and unforgettable moments. Sign up today and secure your spot at the biggest <strong>Tech</strong> festival of the year—spaces are filling fast, and you won`t want to miss the talks, workshops, and hackathon that redefine what`s possible. Let`s connect, code, and create something extraordinary together!
            </p>

            {/* Join Now */}
            <div className="flex flex-col items-center gap-4 px-4 md:px-16 py-12 w-full">
                {/* <div className="flex flex-col md:flex-row gap-4 w-full md:w-fit">
                <Input
                placeholder="Full Name"
                value={fullName}
                readOnly={loading}
                onChange={(e)=>{
                    setFullName(e.target.value)
                }}
                className="flex-1 border-2 border-dashed py-3 
                border-black/10 dark:border-gray-50/50 shadow-none 
                rounded-sm focus-visible:outline-none focus-visible:none focus-visible:none"
                />
                <Input
                placeholder="Email"
                value={emailAddress}
                readOnly={loading}
                onChange={(e)=>{
                    setEmailAddress(e.target.value)
                }}
                className="flex-1 border-2 border-dashed py-3 
                border-black/10 dark:border-gray-50/50 shadow-none
                rounded-sm focus-visible:outline-none focus-visible:none focus-visible:none"
                />
            </div> */}
                <a href="https://gdg.community.dev/events/details/google-gdg-constantine-presents-devfest-constantine-2025/" className="">
                    <LiquidButton
                        // disabled={emailAddress.trim().length == 0 || fullName.trim().length == 0 || loading}
                        // disabled
                        // onClick={() => {
                        // handleAttendantsJoin()
                        // }}
                        className="w-full md:w-fit rounded-md 
                border-2 border-dashed border-gray-50/30 px-8 py-3 text-base font-medium transition-all hover:shadow-lg cursor-pointer">
                        Join Now
                        {loading ? <LoaderCircle className="animate-spin" /> :
                            <ArrowRight className="ml-2 inline h-4 w-4" />}
                    </LiquidButton>
                </a>
            </div>


            {/* Social */}
            <div className="px-8 pt-4 md:pt-18 pb-4 flex gap-2">
                <Hash size={25} />
                <h1 className="flex flex-col instrument-sans-small">
                    <span className="text-md md:text-lg dark:text-gray-300">Follow</span>
                    <span>
                        <span className="text-lg md:text-xl"> GDG Constantine, </span>
                        <span className="text-md md:text-lg dark:text-gray-300"> on social media!</span>
                    </span>
                </h1>
            </div>

            <div className="flex flex-col md:flex-row md:pl-14 md:gap-24 items-center">
                {/* social media */}
                <div className="grid grid-cols-3 grid-rows-2 w-fit space-x-6 space-y-4 justify-end items-center pl-8 md:pl-auto">
                    <SocialMediaItem name={"facebook"} link="https://www.facebook.com/GDGConstantine" />
                    <SocialMediaItem name={"tiktok"} link="https://www.tiktok.com/@gdg.constantine" />
                    <SocialMediaItem name={"linkedin"} link="https://www.linkedin.com/company/gdg-constantine/" />
                    <Link href={"https://linktr.ee/gdgconstantine"}
                        target="_blank"
                        className="flex gap-2 items-center ">
                        <Globe size={25} />
                        <span className="font-semibold">
                            Link Tree
                        </span>
                    </Link>
                    <div className="-mt-4">
                        <SocialMediaItem name={"instagram"} link="https://www.instagram.com/gdg_constantine/" />
                    </div>
                </div>
                {/* email */}
                <div className="py-5 pb-10">
                    <h1 className="flex flex-col instrument-sans-small items-center justify-center">
                        Or just send us an  Email ?
                    </h1>
                    <Link href={"mailto:gdgconstantine.info@gmail.com"} type="email" className="text-sm mt-4 font-semibold">
                        gdgconstantine.info@gmail.com
                    </Link>
                </div>

                {/* Location Map */}
                {/* <div className="ml-auto- flex items-center gap-2">
                    <h1 className="flex flex-col px-4 md:px-8 instrument-sans-small items-center justify-center">
                        <span className="text-sm md:text-md dark:text-gray-300">Find us at</span>
                        <span className="text-md md:text-base font-semibold"> Hotel El-Khiam </span>
                    </h1>
                    <Link
                        href="https://maps.app.goo.gl/ShzTX4gEkMj9eQDq8"
                        target="_blank"
                        className="overflow-hidden rounded-lg border-2 border-dashed border-black/10 dark:border-gray-50/30 hover:border-black/30 dark:hover:border-gray-50/50 transition-all"
                    >
                        <iframe
                            src="https://www.google.com/maps/place/Mega+f%C3%AAte/@36.2624775,6.584464,16.08z/data=!4m6!3m5!1s0x12f171235a8bf8e7:0x668392829426e996!8m2!3d36.2604418!4d6.5922056!16s%2Fg%2F11s51zqw38?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
                            width="200"
                            height="150"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="pointer-events-none"
                        />
                    </Link>
                </div> */}
            </div>
        </section>
    )
}