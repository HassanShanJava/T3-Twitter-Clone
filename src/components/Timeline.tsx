import Image from "next/image";
import { RouterInputs, RouterOutputs, trpc } from "../utils/trpc";
import { CreateTweet } from "./CreateTweet";

function Tweet({
  tweet,
}: {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
}) {
  return (
    <div>
      <div>
        {tweet.author.image && (
          <Image
            src={tweet.author.image}
            alt={`${tweet.author.name} prof pic`}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
      </div>
    </div>
  );
}

const Timeline = () => {
  const { data } = trpc.tweet.timeline.useQuery({
    // here i am overridding the limit, otherwise there is 10 tweets
    limit: 2,
  });
  return (
    <div>
      <CreateTweet />
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {data?.tweets.map((tweet)=>{
        return <Tweet key={tweet.id} tweet={tweet}/>
      })}
    </div>
  );
};

export default Timeline;
