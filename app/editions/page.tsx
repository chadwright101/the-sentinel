import CalameoComponent from "@/_components/editions-page/calameo-component";
import PageWrapper from "@/_lib/utils/page-wrapper";

const EditionsPage = () => {
  return (
    <PageWrapper cssClasses="my-10">
      <main>
        <h2 className="text-36px font-inter font-bold mb-10">Editions</h2>
        <CalameoComponent />
      </main>
    </PageWrapper>
  );
};

export default EditionsPage;
