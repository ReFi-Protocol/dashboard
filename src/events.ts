import ReactGA from "react-ga4";

export const GaEvent = {
  STAKE: "stake",
  DESTAKE: "destake",
  RESTAKE: "restake",
  CLAIM: "claim",
  NFT_PURCHASE: "nft_purchase",
} as const;

export type GaEvent = (typeof GaEvent)[keyof typeof GaEvent];

export const registerEvent = ({
  event,
  additional_info,
}: {
  event: GaEvent;
  additional_info?: string;
}) => {
  const action = `${event}${additional_info ? `_${additional_info}` : ""}`;

  ReactGA.event({
    category: "user_actions",
    action,
    label: action,
  });
};
