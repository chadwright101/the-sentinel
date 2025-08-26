import { fetchPosts } from "@/_components/fetch-posts";
import TopStoriesSlider from "./top-stories-slider";

const sliderData = await fetchPosts("top-stories", 1);

export default function TopStoriesComponent() {
  return (
    <div className="max-w-[1100px] mt-7 -mx-5 desktop:mx-auto desktop:mt-10 desktop:px-10">
      <TopStoriesSlider
        data={sliderData}
        cssClasses="h-[500px] desktop:h-[450px]"
      />
    </div>
  );
}
