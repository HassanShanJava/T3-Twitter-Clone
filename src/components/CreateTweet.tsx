import { useState } from "react"
import { trpc } from "../utils/trpc";

export const CreateTweet = () => {
    const [text, setText] =useState<string>('')


    // first trpc use
    //shows routers
    const {mutateAsync}=trpc.tweet.create.useMutation()

    function handleSubmit(e){
      e.preventDefault();
    }

    return (
      <form onSubmit={handleSubmit}>
        <textarea onChange={(e)=>setText(e.target.value)}/>

        <div>
          <button type="submit">Tweet</button>
        </div>
      </form>
    
  )
}

