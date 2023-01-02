import { useState } from "react";
import { object, string } from "zod";
import { trpc } from "../utils/trpc";

export const tweetSchema = object({
  text: string({
    required_error: "Tweet is required",
  })
    .min(1)
    .max(300),
});

export const CreateTweet = () => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");

  // first trpc use
  //shows routers
  const { mutateAsync } = trpc.tweet.create.useMutation();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await tweetSchema.parse({ text });
    } catch (error) {
      setError("Tweet must be atleat 10 characters long");
      return;
    }

    mutateAsync({ text });
  }

  return (
    <>

      {error&& JSON.stringify(error)}

      <form onSubmit={handleSubmit} className='w-full flex flex-col border-2 p-4 rounded-md mb-4'>
        <textarea className="shadow p-4 w-full " onChange={(e) => setText(e.target.value)} />

        <div className="mt-4 flex justify-end">
          <button className="bg-primary text-white px-4 py-2 rounded-md" type="submit">Tweet</button>
        </div>
      </form>
      {/* display error outside the form */}
    </>

  );
};
