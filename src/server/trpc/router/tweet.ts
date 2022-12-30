import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const tweetrouter=router({
    create: protectedProcedure.input(z.object({
        text:z.string({
           required_error:"Tweet is required"   
        })
    })).mutation((context, input)=>{
        // here is a callback
        const {prisma, session}=context
        const {text}=input

        const userId=session.user.id

        return prisma.tweet.create({
            data:{
                text,
                author:{
                    connect:{
                        id:userId
                    }
                }
            }            
        })
    })

})