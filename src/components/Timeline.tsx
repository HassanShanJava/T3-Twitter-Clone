import Image from "next/image";
import { RouterInputs, RouterOutputs, trpc } from "../utils/trpc";
import { CreateTweet } from "./CreateTweet";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";



dayjs.extend(relativeTime)
dayjs.extend(updateLocal)


dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy",
  },
});


function Tweet({
  tweet,
}: {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
}) {
  return (
    <div className="mb-4 border-b-2 border-gray-500">
      <div className="flex p-2">
        {/* so image s not null */}
        {tweet.author.image && (
          <Image
            src={tweet.author.image}
            alt={`${tweet.author.name} prof pic`}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
        <div className="ml-2 ">
          <div className="flex items-center">
            <p className="font-bold ">{tweet.author.name}</p>
            <p className="text-sm text-gray-400">
              {" "}
              - {dayjs(tweet.createdAt).fromNow()}
            </p>
          </div>
          <div>{tweet.text}</div>
        </div>
      </div>
    </div>
  );
}

const Timeline = () => {
  const { data } = trpc.tweet.timeline.useQuery({
    // here i am overridding the limit, otherwise there is 10 tweets
    limit: 10,
  });
  return (
    <div>
      <CreateTweet />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="border-l-2 border-r-2 border-t-2 border-gray-500">
        {data?.tweets.map((tweet) => {
          return <Tweet key={tweet.id} tweet={tweet} />;
        })}
      </div>
    </div>
  );
};

export default Timeline;
