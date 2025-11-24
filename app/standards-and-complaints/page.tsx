import { Metadata } from "next";
import PageWrapper from "@/_lib/utils/page-wrapper";

export const metadata: Metadata = {
  title: "Standards & Complaints | The Sentinel",
  description:
    "The Sentinel complaints process. Learn how to report editorial complaints and our standards.",
};

const StandardsAndComplaintsPage = () => {
  return (
    <PageWrapper cssClasses="my-10">
      <main>
        <h2 className="text-36px font-inter font-bold mb-10">
          Standards & Complaints
        </h2>
        <div className="space-y-4">
          <p>
            The Sentinel is committed to addressing complaints about the
            editorial content in a fair and reasonable manner, and upholds the
            complaints process as set out by the Australian Press Council.
          </p>
          <p>
            Any person who believes that the editorial principles, standards and
            guidelines set out above have not been followed is encouraged to
            contact the Managing Editor — by emailing news@sentinelnews.com.au.
          </p>
          <p>
            In the event that the complainant is not satisfied with the result
            from this process, they will be referred to take their complaint to
            the Australian Press Council
            (www.presscouncil.org.au/making-a-complaint/).
          </p>
          <p>2025 The Sentinel. All rights reserved </p>
        </div>
      </main>
    </PageWrapper>
  );
};

export default StandardsAndComplaintsPage;
