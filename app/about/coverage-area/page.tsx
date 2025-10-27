import PageWrapper from "@/_lib/utils/page-wrapper";
import Image from "next/image";

const CoverageAreaPage = () => {
  return (
    <PageWrapper cssClasses="my-10">
      <h2 className="text-36px font-inter font-bold mb-10">Coverage Area</h2>
      <main>
        <div>
          <h3 className="text-20px font-inter font-bold mb-5">
            Distribution and coverage
          </h3>
          <Image
            src="/images/about-page/the-sentinel-distribution-map.jpg"
            alt="The Sentinel Distribution Map"
            width={1100}
            height={1100}
          />
        </div>
      </main>
    </PageWrapper>
  );
};

export default CoverageAreaPage;