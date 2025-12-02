import { motion } from "framer-motion"
import { styled } from "styled-components"
import { breakpoints } from "../../utils/theme"

const StyledHero = styled(motion.div).attrs({})`
  position: relative;
  height: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  padding-top: 72px;
  background: transparent;
`

// Full-bleed background blur layers
const HeroBlurGradient = styled(motion.div).attrs({})`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  /* Approximate the right-side elliptical glow using layered radial-gradients */
  background:
    /* Inner ring/edge highlight with hollow center */
    radial-gradient(
      ellipse 38% 22% at 70% 55%,
      rgba(255, 245, 200, 0) 46%,
      rgba(255, 245, 200, 0.42) 52%,
      rgba(255, 245, 200, 0.16) 60%,
      rgba(255, 245, 200, 0) 72%
    ),
    /* Wide falloff that reaches the farthest screen corner */
      radial-gradient(
        ellipse farthest-corner at 70% 55%,
        rgba(0, 0, 0, 0) 28%,
        rgba(255, 234, 160, 0.08) 42%,
        rgba(255, 234, 160, 0.14) 60%,
        rgba(255, 234, 160, 0.18) 78%,
        rgba(255, 234, 160, 0.22) 100%
      );
`

const HeroBlurOne = styled(motion.img).attrs({})`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 0.6;
  pointer-events: none;
  user-select: none;
`

const HeroBlurTwo = styled(motion.img).attrs({})`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
`

// Backdrop blur clipped by an alpha mask (PNG) so blur only shows where
// the image has content (non-transparent). The mask source is provided via the
// `$mask` prop to allow reuse for multiple shapes.
const HeroBackdropMasked = styled(motion.div)<{ $mask: string }>`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background-color: rgba(
    0,
    0,
    0,
    0.001
  ); /* ensure backdrop-filter renders on Safari */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  /* Use the PNG alpha as a mask */
  -webkit-mask-image: url(${(p) => p.$mask});
  mask-image: url(${(p) => p.$mask});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center;
  mask-position: center;
`

const HeroContainer = styled(motion.div).attrs({})`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  max-width: 1600px;
  z-index: 4;
  padding: 0;
  height: 100%;
  padding-top: 32px;
  padding-bottom: 32px;

  @media (max-width: ${breakpoints.md}) {
    padding: 0;
  }
`

const CharacterImage = styled(motion.img).attrs({})`
  position: absolute;
  height: 85vh;
  width: auto;
  bottom: 0;
  right: 5%;
  z-index: 3;
  object-fit: contain;
  pointer-events: none;
  will-change: transform;

  @media (max-width: ${breakpoints.md}) {
    height: 60vh;
    right: 0;
  }

  @media (max-width: ${breakpoints.s}) {
    height: 60vh;
    right: -5%;
    display: none;
  }
`

const MainContentRow = styled(motion.div).attrs({})`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  padding: 40px 60px 80px 60px;
  gap: 60px;
  flex: 1;
  z-index: 2;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column-reverse;
    padding: 20px;
    gap: 14px;
  }
`

const LeftColumn = styled(motion.div).attrs({})`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${breakpoints.md}) {
    max-width: 100%;
    gap: 25px;
  }
`

const RightColumn = styled(motion.div).attrs({})`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;

  @media (max-width: ${breakpoints.md}) {
    flex: 0;
    width: 100%;
    height: auto;
    align-items: center;
  }
`

const CountdownRow = styled(motion.div).attrs({})`
  display: flex;
  gap: 10px;
  margin-top: 24px;
  align-items: flex-end;

  @media (max-width: ${breakpoints.md}) {
    margin-top: 16px;
    align-self: center;
  }
`

type CountdownVariant = "days" | "hours" | "minutes" | "seconds"

const countdownGradientMap: Record<CountdownVariant, string> = {
  days: "linear-gradient(90deg, rgba(19, 179, 211, 0.5) 0%, rgba(36, 130, 225, 0.5) 100%)",
  hours:
    "linear-gradient(90deg, rgba(36, 130, 225, 0.5) 0%, rgba(70, 83, 213, 0.5) 100%)",
  minutes:
    "linear-gradient(90deg, rgba(70, 83, 213, 0.5) 0%, rgba(100, 43, 203, 0.5) 100%)",
  seconds:
    "linear-gradient(90deg, rgba(100, 43, 203, 0.5) 0%, rgba(124, 9, 194, 0.5) 100%)",
}

const CountdownBox = styled(motion.div).attrs({})<{
  $variant: CountdownVariant
}>`
  min-width: 70px;
  padding: 32px 16px 16px 16px;
  min-width: 100px;
  border-radius: 16px;
  background: ${({ $variant }) => countdownGradientMap[$variant]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-transform: uppercase;
  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);

  .countdown-value {
    font-family: "Ethnocentric", sans-serif;
    font-size: 32px;
    letter-spacing: 0.08em;
    line-height: 1;
  }

  .countdown-label {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: 700;
    opacity: 0.7;
    letter-spacing: 0.12em;
  }

  @media (max-width: ${breakpoints.md}) {
    min-width: 60px;

    .countdown-value {
      font-size: 20px;
    }

    .countdown-label {
      font-size: 8px;
    }
  }
`

const OpenToEveryone = styled(motion.div).attrs({})`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`

const OpenToEveryoneContent = styled(motion.div).attrs({})`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Ethnocentric", sans-serif;
  letter-spacing: -1px;
  white-space: nowrap;

  @media (max-width: ${breakpoints.md}) {
    font-size: 16px;
  }
`

const OpenToEveryoneIcon = styled(motion.img).attrs({})`
  height: 28px;
  width: 28px;
  object-fit: contain;

  @media (max-width: ${breakpoints.md}) {
    height: 24px;
    width: 24px;
  }
`

const OpenLineWrapper = styled(motion.div).attrs({})`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 20px;
  gap: 0;

  @media (max-width: ${breakpoints.md}) {
    width: 100%;
    margin-left: 0;
  }
`

const OpenLine = styled(motion.img).attrs({})`
  width: 100%;
  height: 2px;
  flex: 1;

  @media (max-width: ${breakpoints.md}) {
    height: 1.5px;
  }
`

const EndBox = styled(motion.div).attrs({})`
  width: 8px;
  height: 8px;
  background: white;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.md}) {
    width: 6px;
    height: 6px;
  }
`

const DateBadge = styled(motion.div).attrs({})`
  display: flex;
  align-items: stretch;
  gap: 0;
  font-weight: bold;

  @media (max-width: ${breakpoints.md}) {
    gap: 0;
  }
`

const ArrowBox = styled(motion.div).attrs({})`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 8px;
  border: 1px solid white;
  overflow: hidden;

  img {
    height: 28px;
    width: auto;
  }

  @media (max-width: ${breakpoints.md}) {
    padding: 6px 12px;
    text-align: center;
    font-size: 10px;

    img {
      height: 28px;
    }
  }

  @media (max-width: ${breakpoints.s}) {
    padding: 8px 16px;
    transform: translateY(-1px);

    img {
      height: 20px;
    }
  }
`

const DateBox = styled(motion.div).attrs({})`
  display: grid;
  place-items: center;
  font-family: "Ethnocentric", sans-serif;
  line-height: 1;
  letter-spacing: -1px;
  padding: 10px 20px 0px;
  border: 1px solid white;
  border-left: none;
  font-size: 32px;
  text-transform: uppercase;
  font-weight: bold;
  background: transparent;
  min-width: 90px;
  overflow: hidden;

  &:first-of-type {
    border-left: none;
  }

  @media (max-width: ${breakpoints.md}) {
    font-size: 18px;
    padding: 8px 16px 3px;
    min-width: 90px;
    transform: translateY(-1px);
  }

  @media (max-width: ${breakpoints.s}) {
    font-size: 14px;
    padding: 6px 12px 1px;
    min-width: 90px;
    transform: translateY(-1px);
    width: 100%;
  }
`

const DateCaption = styled(motion.div).attrs({})`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #ffffff;
  align-self: flex-end;
  opacity: 0.95;

  font-family: Inter;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 0.14px;

  @media (max-width: ${breakpoints.md}) {
    font-size: 9.3px;
    margin-left: auto;
    margin-right: auto;
    letter-spacing: 0.22px;
  }
`

const LogoWrapper = styled(motion.div).attrs({})`
  display: flex;
  flex-direction: column;
`

const StyledLogo = styled(motion.img).attrs({})`
  width: 100%;
  max-width: 500px;
  height: auto;

  @media (max-width: ${breakpoints.md}) {
    max-width: 400px;
  }

  @media (max-width: ${breakpoints.s}) {
    max-width: 100%;
  }
`

const Tagline = styled(motion.h2).attrs({})`
  font-size: 34px;
  font-weight: bold;
  margin-top: 42px;
  text-transform: uppercase;
  line-height: 1;
  letter-spacing: -1px;
  margin-top: 2rem;
  margin-bottom: 14px;

  @media (max-width: ${breakpoints.md}) {
    font-size: 28px;
  }

  @media (max-width: ${breakpoints.s}) {
    font-size: 24px;
  }
`

const Description = styled(motion.p).attrs({})`
  font-size: 16px;
  line-height: 1.6;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 0.05em;
  max-width: 500px;

  @media (max-width: ${breakpoints.md}) {
    font-size: 18px;
  }
`

const BottomSection = styled(motion.div).attrs({})`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: ${breakpoints.s}) {
    flex-direction: column-reverse;
  }
`

// Inline signup form shown under the description
const InlineSignup = styled(motion.form).attrs({})`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 520px;
  height: 56px;
  border-radius: 28px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  @media (max-width: ${breakpoints.s}) {
    height: auto;
    padding: 10px;
    gap: 10px;
    border-radius: 20px;
    flex-direction: column;
    align-items: stretch;
    margin: 0;
  }
`

const SignupInput = styled(motion.input).attrs({ type: "email" })`
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0 12px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  outline: none;
  font-weight: 600;
  caret-color: #ffffff;

  &::placeholder {
    color: rgba(255, 255, 255, 0.85);
  }

  @media (max-width: ${breakpoints.s}) {
    width: 100%;
    font-size: 12px;
    padding: 12px 8px;
  }
`

const SignupLabel = styled.label`
  display: inline-block;
  margin-top: 42px;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  font-family: "Ethnocentric", sans-serif;
  letter-spacing: 0.06em;
  color: #ffffff;
  opacity: 0.95;

  @media (max-width: ${breakpoints.s}) {
    margin-left: 0;
    font-size: 10px;
    letter-spacing: 0.04em;
  }
`

const SubscribeButton = styled(motion.button).attrs({})`
  height: 100%;
  padding: 16px 24px;
  border: none !important;
  outline: none;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -0.5px;
  color: #111111;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
  position: relative;
  border-radius: 28px;
  max-width: 520px;
  margin-top: 42px;

  @media (max-width: ${breakpoints.s}) {
    height: 44px;
    border-radius: 12px;
    border: none;

    &::before {
      display: none;
    }
  }

  /* Gradient text inside the button */
  span {
    background: linear-gradient(
      90deg,
      #13b3d3 -15.31%,
      #2482e1 7.42%,
      #4653d5 30.7%,
      #642bcb 57.31%,
      #7c09c2 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
`

const FeaturesList = styled(motion.div).attrs({})`
  display: flex;
  flex-direction: column;
  max-width: 520px;
  gap: 8px;
  align-items: flex-start;

  @media (max-width: ${breakpoints.s}) {
    max-width: 100%;
    gap: 42px;
  }
`

const FeatureRow = styled(motion.div).attrs({})`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;

  @media (max-width: ${breakpoints.s}) {
    gap: 2px;
    align-items: flex-start;
    width: 100%;
    flex-wrap: nowrap;
  }
`

const FeatureItem = styled(motion.span).attrs({})`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;

  @media (max-width: ${breakpoints.s}) {
    font-size: 9px;
  }
`

const SeparatorIcon = styled(motion.img).attrs({})`
  height: 12px;
  width: auto;
  object-fit: contain;

  @media (max-width: ${breakpoints.s}) {
    height: 8px;
  }
`

const SeparatorLine = styled(motion.img).attrs({})`
  width: 100%;
  max-width: 600px;
  height: auto;
  margin: 4px 0;

  @media (max-width: ${breakpoints.s}) {
    max-width: 100%;
  }
`

const StarsContainer = styled(motion.div).attrs({})`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 40px;

  @media (max-width: ${breakpoints.s}) {
    max-width: 100%;
    height: 32px;
  }
`

const StarsBlurred = styled(motion.img).attrs({})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  object-position: left;
`

const StarsImage = styled(motion.img).attrs({})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  object-position: left;
  padding-left: 8px;
  padding-right: 8px;
`

const SignupBox = styled(motion.div).attrs({})`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: rgba(38, 6, 81, 0.3);
  backdrop-filter: blur(12px);
  bottom: 40px;
  right: 40px;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  z-index: 10;

  @media (max-width: ${breakpoints.md}) {
    bottom: 20px;
    right: 20px;
    left: 20px;
    max-width: none;
    padding: 15px 20px;
    gap: 15px;
  }

  @media (max-width: ${breakpoints.s}) {
    flex-direction: column;
    gap: 10px;
    padding: 15px;
  }
`

const SignupContent = styled(motion.div).attrs({})`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
  flex: 1;

  @media (max-width: ${breakpoints.s}) {
    text-align: center;
  }
`

const SignupTitle = styled(motion.h3).attrs({})`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 0.05em;
  line-height: 1.2;

  @media (max-width: ${breakpoints.s}) {
    font-size: 14px;
  }
`

const SignupSubtitle = styled(motion.p).attrs({})`
  font-size: 15px;
  margin: 0;
  opacity: 0.95;
  line-height: 1.4;

  @media (max-width: ${breakpoints.s}) {
    font-size: 13px;
  }
`

const SignupButton = styled(motion.button).attrs({})`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 28px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 32px;
  cursor: pointer;
  letter-spacing: 0.08em;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.1),
    inset 2px 2px 3px rgba(255, 255, 255, 0.15),
    inset -1px -1px 2px rgba(0, 0, 0, 0.05);
  position: relative;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.25);
    box-shadow:
      0 3px 10px rgba(0, 0, 0, 0.15),
      inset 2px 2px 4px rgba(255, 255, 255, 0.2),
      inset -1px -1px 2px rgba(0, 0, 0, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 1px 4px rgba(0, 0, 0, 0.1),
      inset 1px 1px 2px rgba(255, 255, 255, 0.1),
      inset -1px -1px 2px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: ${breakpoints.s}) {
    padding: 9px 24px;
    font-size: 12px;
    width: 100%;
  }
`

const DiamondImage = styled(motion.img).attrs({})`
  height: 24px;
  width: auto;

  @media (max-width: ${breakpoints.md}) {
    height: 20px;
  }

  @media (max-width: ${breakpoints.s}) {
    height: 16px;
  }
`

export {
  StyledHero,
  HeroContainer,
  CharacterImage,
  MainContentRow,
  LeftColumn,
  RightColumn,
  OpenToEveryone,
  OpenToEveryoneContent,
  OpenToEveryoneIcon,
  OpenLineWrapper,
  OpenLine,
  EndBox,
  DateBadge,
  ArrowBox,
  DateBox,
  LogoWrapper,
  StyledLogo,
  Tagline,
  Description,
  BottomSection,
  FeaturesList,
  FeatureRow,
  FeatureItem,
  SeparatorIcon,
  SeparatorLine,
  StarsContainer,
  StarsBlurred,
  StarsImage,
  SignupBox,
  SignupContent,
  SignupTitle,
  SignupSubtitle,
  SignupButton,
  DiamondImage,
  HeroBlurGradient,
  HeroBlurOne,
  HeroBlurTwo,
  HeroBackdropMasked,
  InlineSignup,
  SignupInput,
  SubscribeButton,
  DateCaption,
  SignupLabel,
  CountdownRow,
  CountdownBox,
}
