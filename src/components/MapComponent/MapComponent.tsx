import { useEffect, useState } from "react"
import { styled } from "styled-components"
import decoratorLeft from "../../img/maps/left-decorator.svg"
import mapMobile from "../../img/maps/map-mobile.webp"
import mapDesktop from "../../img/maps/map-web.webp"
import decoratorRight from "../../img/maps/right-decorator.svg"
import { SubscribeButton } from "../Hero/styles"

const MapComponent = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const JUMP_IN_URL = "https://decentraland.org/jump/?position=-62%2C-61"

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 768)
    })
  }, [])

  return (
    <MapContainer id="map">
      <HeaderWrapper>
        <Decorator src={decoratorLeft} alt="Decorator" />
        <TitleWrapper>
          <Title>FIND YOUR WAY</Title>
          <Description>
            Navigate Decentraland’s Music Festival with ease—see where every
            performance and experience is happening.
          </Description>
        </TitleWrapper>
        <Decorator src={decoratorRight} alt="Decorator" />
      </HeaderWrapper>
      <ContentWrapper>
        <MapImage src={isMobile ? mapMobile : mapDesktop} alt="Map" />
      </ContentWrapper>
      <SubscribeButton
        as="a"
        href={JUMP_IN_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>JUMP IN NOW</span>
      </SubscribeButton>
    </MapContainer>
  )
}

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(10, 9, 43, 1);
  padding: 72px 16px;
  gap: 20px;

  @media (max-width: 600px) {
    padding: 60px 16px;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 40px;
  max-width: 1200px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`

const Decorator = styled.img`
  height: 44px;
  width: auto;
`

const TitleWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`

const Title = styled.h2`
  font-size: 40px;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0;
  text-align: center;
  margin-bottom: 8px;
  text-shadow:
    0 0 6px rgba(255, 255, 255, 0.4),
    0 0 12px rgba(255, 255, 255, 0.3),
    0 0 24px rgba(255, 255, 255, 0.2);
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.1));
`

const Description = styled.p`
  font-size: 18px;
  font-weight: 600;
  max-width: 400px;
  margin: 0;
  text-align: center;
`

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
`

export { MapComponent }
