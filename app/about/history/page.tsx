import PageWrapper from "@/_lib/utils/page-wrapper";

const HistoryPage = () => {
  return (
    <PageWrapper cssClasses="my-10">
      <h2 className="text-36px font-inter font-bold mb-10">History</h2>
      <main>
        <div className="space-y-4">
          <p>
            With deep roots in local storytelling,{" "}
            <span className="italic">The Sentinel</span> has been a trusted
            local voice for more than 90 years.
          </p>
          <p>
            Originally launched in 1932 as{" "}
            <span className="italic">The Kilcoy Sentinel</span>, the paper
            served the Kilcoy community until 1939 before going on hiatus. It
            was revived in 1985 under the{" "}
            <span className="italic">Somerset Sentinel</span> masthead,
            expanding its coverage to include Moore, Esk, and Lowood while
            remaining proudly based in Kilcoy.
          </p>
          <p>
            As the region grew, so did the paper&apos;s reach — eventually
            extending into Woodford and the wider Moreton Bay area. This
            expansion led to the creation of the{" "}
            <span className="italic">Moreton Bay Sentinel</span> in 2022,
            dedicated to covering Woodford, Caboolture, Morayfield, Bribie
            Island, and Burpengary.
          </p>
          <p>
            In November 2023, both publications were brought together under one
            banner following their purchase by{" "}
            <span className="italic">Glasshouse Country & Maleny News</span>,
            uniting Somerset and Moreton Bay coverage into a single publication
            —<span className="italic">The Sentinel.</span>
          </p>
          <p>
            Today, <span className="italic">The Sentinel</span> prints 10,000
            copies weekly and reaches an estimated readership of over 30,000
            people. Distributed free across Somerset and Moreton Bay, our
            coverage extends from Lowood and Fernvale in the south to Redcliffe
            and Bribie Island in the east, Moore and Linville in the west, and
            Elimbah and Beerburrum in the north.
          </p>
          <p>
            Thanks to the continued support of our readers and advertisers,{" "}
            <span className="italic">The Sentinel</span> remains stronger than
            ever — proudly delivering free, independent local news to the
            communities that make our region thrive.
          </p>
        </div>
      </main>
    </PageWrapper>
  );
};

export default HistoryPage;
