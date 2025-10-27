import PageWrapper from "@/_lib/utils/page-wrapper";
import DistributionAccordion from "@/_components/about-page/distribution-accordion";

const WhereToPickUpACopyPage = () => {
  return (
    <PageWrapper cssClasses="my-10">
      <h2 className="text-36px font-inter font-bold mb-10">
        Where to Pick Up a Copy
      </h2>
      <main>
        <DistributionAccordion />
      </main>
    </PageWrapper>
  );
};

export default WhereToPickUpACopyPage;