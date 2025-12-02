import { useEffect, useState } from "react"
import {
  ArrowBox,
  BottomSection,
  CharacterImage,
  DateBadge,
  DateBox,
  DateCaption,
  Description,
  DiamondImage,
  FeatureItem,
  FeatureRow,
  FeaturesList,
  HeroBackdropMasked,
  HeroBlurOne,
  HeroBlurTwo,
  HeroContainer,
  LeftColumn,
  LogoWrapper,
  MainContentRow,
  RightColumn,
  SeparatorIcon,
  StyledHero,
  StyledLogo,
  SubscribeButton,
  Tagline,
} from "./styles"
import heroBlurTwoImage from "../../img/hero/blur-2.webp"
import heroBlurOneImage from "../../img/hero/blur.webp"
import cyanArrowLeft from "../../img/hero/cyan-arrow-left.webp"
import cyanArrowRight from "../../img/hero/cyan-arrow-right.svg"
import dateArrow from "../../img/hero/date-arrow.svg"
import lightstickImage from "../../img/hero/lightstick.webp"
import DMF25Logo from "../../img/music-festival/DMF25_Logo2.png"
const JUMP_IN_URL = "https://decentraland.org/jump/?position=-62%2C-61"

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <StyledHero>
      {/* Backdrop blur applied only where the blur PNGs have alpha */}
      <HeroBackdropMasked $mask={heroBlurOneImage} aria-hidden="true" />
      <HeroBlurOne src={heroBlurOneImage} alt="" aria-hidden="true" />
      <HeroBlurTwo src={heroBlurTwoImage} alt="" aria-hidden="true" />
      <CharacterImage
        src={lightstickImage}
        alt="Festival Character"
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: scrollY * 0.2,
        }}
        transition={{
          opacity: { duration: 1, delay: 0.5 },
          y: { duration: 1, delay: 0 },
          scale: { duration: 1, delay: 0.5 },
        }}
      />
      <HeroContainer>
        {/* Main Content Row - Two Columns */}
        <MainContentRow>
          {/* Left Column */}
          <LeftColumn>
            <LogoWrapper
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <StyledLogo src={DMF25Logo} alt="Decentraland Music Festival" />
              <Tagline>
                WHERE THE STREAM <br /> HITS THE MAIN STAGE
              </Tagline>
              <Description>
                A four-day festival where fans and streamers redefine
                &ldquo;going live.&rdquo;
              </Description>
            </LogoWrapper>

            <BottomSection
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* <SignupLabel as="p">Jump into the festival</SignupLabel> */}
              <SubscribeButton
                as="a"
                href={JUMP_IN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>JUMP IN NOW</span>
              </SubscribeButton>
              <FeaturesList>
                <FeatureRow>
                  <FeatureItem>FREE TO ENTER</FeatureItem>
                  <SeparatorIcon src={cyanArrowLeft} alt="" />
                  <FeatureItem>NO HEADSET NEEDED</FeatureItem>
                  <SeparatorIcon src={cyanArrowRight} alt="" />
                  <FeatureItem>NEW FAN EXPERIENCES</FeatureItem>
                </FeatureRow>
              </FeaturesList>
            </BottomSection>
          </LeftColumn>

          {/* Right Column */}
          <RightColumn>
            <div className="countdown-container">
              <DateBadge
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <ArrowBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <img src={dateArrow} alt="arrow" />
                </ArrowBox>
                <DateBox>DEC 3-6</DateBox>
                <DateBox>2025 {/* TODO: Add the year dynamically */}</DateBox>
              </DateBadge>
              <DateCaption
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                HOSTED BY DECENTRALAND, THE SOCIAL VIRTUAL WORLD
              </DateCaption>
            </div>
          </RightColumn>
        </MainContentRow>
      </HeroContainer>
    </StyledHero>
  )
}

export { Hero, StyledLogo, DiamondImage }
