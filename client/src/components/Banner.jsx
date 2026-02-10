import React from "react";
import TextType from "../components/Sections/text";
import Carousel from "../components/Sections/carousel_cards";

function Banner() {
  return (
    <section className="banner-sec bg-img  h-[50%] w-auto bg-[url(./assets/banner-assets/bnr.jpg)] bg-red-500 ">
      <div className="page-center h-full">
        <div className="bnr-wrap flex items-center justify-between p-[90px 0px] h-full">
          <div className="bnr-left w-[48%]">
            <h1 className="text-white">
              <TextType
                text={[
                  "Text typing effect",
                  "for your websites",
                  "Happy coding!",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor
                cursorCharacter="_"
                texts={[
                  "Welcome to React Bits! Good to see you!",
                  "Build some amazing experiences!",
                ]}
                deletingSpeed={50}
                variableSpeedEnabled={false}
                variableSpeedMin={60}
                variableSpeedMax={120}
                cursorBlinkDuration={0.5}
              />
            </h1>
          </div>
          <div className="bnr-right w-[48%] flex items-center justify-center">
            {/* user cards here */}
            <div className="h-[340px] relative">
              <Carousel
                baseWidth={330}
                autoplay
                autoplayDelay={3000}
                pauseOnHover
                loop
                round={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
