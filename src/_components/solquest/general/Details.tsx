"use client"
import { H1 } from "./ui/H1"
import { CloseButton } from "./ui/Button"
import { Button } from "~/_components/final/ui/button"
import { useState } from "react"
import { api } from "~/trpc/react"
import { useWallet } from "@solana/wallet-adapter-react"
import Image from "next/image"

interface props{
    title: string,
    details: string,
    pay: number,
    publisher: string,
    bountyId: string,
    userId: string,
    close: () => void
}

export default function Details({title, details, pay, publisher, bountyId, userId, close}:props){
    const createApplication = api.bounty.createApplication.useMutation({})
    const [isApplying, setIsApplying] = useState<boolean>(false)
    const {wallet} = useWallet()
    const applyToBounty = () => {
        setIsApplying(true)
        handleApply()
    }
    const handleApply = async () => {
        try{
            if (!wallet){
                alert("Connect wallet before applying!")
                return
            }
            setIsApplying(true)
            const values = {
                userId,
                bountyId,
                creatorPk: wallet?.adapter.publicKey?.toString() ?? ""
            }
            createApplication.mutate(values, {
                onSuccess: () => {
                    close()
                    alert("Applied successfully!")
                },
                onError: (error) => {
                    alert(`Error: ${error.message ?? "Unknown error. Check console for more details"}`)
                }
            })
        } catch(err){
            console.log(err)
        } finally{
            setIsApplying(false)
        }
    }
    return(
        <section className="w-full h-full fixed top-0 left-0 backdrop-blur-lg backdrop-brightness-50 flex justify-center items-center">
            <div className="h-full max-w-3xl overflow-auto w-full bg-primary-foreground py-6 px-6 relative">
                <CloseButton handleClick={close}/>
                <H1 style={2}>{title}</H1>

        <pre className="text-wrap">{details}</pre>

                <p className="font-bold my-3">Publisher: <span className="text-primary"> {publisher} </span></p>
                <p className="font-bold my-3 flex gap-3 items-center">Pay: 
                    <div className="w-7 aspect-square bg-primary rounded-full">
                        <Image alt="solana" src="/usdc.png" width={30} height={30}/> 
                    </div>
                    {pay} USDC
                </p>

                <div className="my-10 m-auto w-fit">
                    <Button 
                    onClick={applyToBounty} 
                    variant="secondary">
                        {isApplying? "Applying...":"Apply to Bounty"}
                    </Button>
                </div>
            </div>
        </section>
    )
}
