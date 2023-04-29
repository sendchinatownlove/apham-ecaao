import styled from "styled-components";
import { BubbleLabel, LabelMedium, THEME_COLORS } from "../theme";

const PageTitleText = styled.div`
    border-top: 1px solid #A8192E;
    padding: 16px 17px 8px;
    display: flex;
    justify-content: space-between;
`

const PageDescription = styled.div`
    color: #000000;
    text-align: left;
    padding: 8px 17px 23px;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
`;

type GiveAwaysDetailProps = {
  numberOfEntries: number;
}

export default function GiveAwaysDetail(props: GiveAwaysDetailProps) {
    const { numberOfEntries } = props;

    return (
    <div>
      <PageTitleText>
        <LabelMedium color={THEME_COLORS.RED}>GIVEAWAYS</LabelMedium>
        <BubbleLabel>{numberOfEntries} ENTRIES</BubbleLabel>
      </PageTitleText>
      <PageDescription>
        <span>For every completed activity, you'll earn one (1) raffle ticket. Each giveaway prize is worth a certain number of raffle tickets for one (1) raffle entry. Once you have enough tickets, enter them into the giveaway prize of your choice!</span>
      </PageDescription>
    </div>
  );
}