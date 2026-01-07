import { fetchPosts } from "@/_components/fetch-posts";
import TopStoriesSlider from "./top-stories-slider";

export default async function TopStoriesComponent() {
  const sliderData = await fetchPosts("top-stories", { perPage: 20 });

  if (sliderData.length === 0) return null;
  return (
    <div className="max-w-[1100px] mt-7 -mx-5 desktop:-mx-10 desktop:mt-10 desktop:px-10">
      <TopStoriesSlider
        data={sliderData}
        cssClasses="h-[500px] desktop:h-[450px]"
      />
    </div>
  );
}
