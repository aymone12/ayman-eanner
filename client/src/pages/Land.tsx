import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Land = (): JSX.Element => {
  const [selectedGridType, setSelectedGridType] = useState("tree-phase");
  const [selectedInstallationType, setSelectedInstallationType] =
    useState("ongrid");

  const gridTypeOptions = [
    {
      id: "tree-phase",
      label: "Tree Phase",
      description: "Perfect For High Power Usage",
      selected: true,
    },
    {
      id: "single-phase",
      label: "Single Phase",
      description: "Perfect For Low Power Usage",
      selected: false,
    },
  ];

  const installationTypeOptions = [
    {
      id: "ongrid",
      label: "Ongrid",
      description: "Check Me If You Have Grid",
      selected: true,
    },
    {
      id: "offgrid",
      label: "Offgrid",
      description: "Check Me If You Have No Energy Source",
      selected: false,
    },
    {
      id: "hybrid",
      label: "Hybrid",
      description: "I'm Adapted To All Other Energies",
      selected: false,
    },
  ];

  const processSteps = [
    {
      title: "Answer Our Questions",
      description:
        "Answer A Few Questions Online To Get A Price Guide. Our Installer In Your Area Will Then Contact You To Book In A Personalised Survey.",
      highlighted: true,
    },
    {
      title: "Get Your Quote",
      description:
        "After The Survey We'll Send You Your Bespoke Quote, Based On Your Home's Needs.",
      highlighted: false,
    },
    {
      title: "Book Your Installation",
      description:
        "If You Go Ahead With Us, You Can Expect A Fast, Professional Installation By A Trusted, Local Expert. All Backed By A Workmanship Guarantee.",
      highlighted: false,
    },
  ];

  return (
    <div className="bg-[#06141b] grid justify-items-center [align-items:start] w-screen">
      <div className="bg-[#06141b] w-[1920px] h-[6326px] relative">
        <header className="w-[1920px] h-[86px] top-0 left-0 absolute">
          <img
            className="w-full h-full object-cover"
            alt="Header"
            src="/figmaAssets/image-3.png"
          />
        </header>

        <section className="absolute w-[882px] h-[129px] top-[168px] left-[522px]">
          <div className="absolute top-0 left-[287px] [font-family:'Source_Code_Pro',Helvetica] font-semibold text-white text-lg tracking-[0] leading-[normal]">
            <span className="[font-family:'Source_Code_Pro',Helvetica] font-semibold text-white text-lg tracking-[0]">
              eaneer
            </span>
            <span className="[font-family:'Source_Code_Pro',Helvetica] font-semibold text-white text-lg tracking-[0]">
              {" "}
              energetics summer 20%
            </span>
          </div>
          <div className="absolute top-12 left-[167px] [font-family:'Inter',Helvetica] font-semibold text-white text-[28px] tracking-[0] leading-[normal]">
            Start Saving Up to 80% /mo On average
          </div>
          <div className="absolute top-[107px] left-0 [font-family:'Inter',Helvetica] font-medium text-white text-lg tracking-[0] leading-[normal]">
            Enter Your Solar Installation Details And Average Electricity Bill
            To Get A Quote And View Your savings
          </div>
        </section>

        <Button className="top-[351px] left-[797px] absolute w-[327px] h-[61px] rounded-[30px] border-2 border-solid border-white bg-transparent hover:bg-white/10 h-auto">
          <img
            className="absolute w-[43px] h-[43px] top-[7px] left-[269px]"
            alt="Component"
            src="/figmaAssets/component-1.svg"
          />
          <div className="absolute top-4 left-[18px] [font-family:'Inter',Helvetica] font-bold text-white text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
            Ready To Save Energy?
          </div>
        </Button>

        <section className="absolute w-[1361px] h-[527px] top-[461px] left-[217px]">
          <div className="absolute w-[1251px] h-[527px] top-0 left-[110px]">
            <div className="relative w-[1918px] h-[546px] top-[5px] left-[-327px] bg-[#06141b] shadow-[0px_0px_25px_#2c4a52]">
              <Card className="relative w-[582px] h-[491px] top-[31px] left-[1014px] bg-[#06141b] rounded-[20px] shadow-[0px_0px_20px_5px_#2c4a52] border-0">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {/* Grid Type Section */}
                    <div className="space-y-4">
                      <h3 className="[font-family:'Rubik',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[normal]">
                        Grid Type
                      </h3>
                      <RadioGroup
                        value={selectedGridType}
                        onValueChange={setSelectedGridType}
                        className="flex flex-row gap-3"
                      >
                        {gridTypeOptions.map((option) => (
                          <div
                            key={option.id}
                            className="flex-1 relative"
                          >
                            <div
                              className={`relative w-full h-[120px] rounded-[15px] border-2 p-4 ${
                                selectedGridType === option.id
                                  ? "border-white bg-[#0a1b23]"
                                  : "border-gray-500 bg-[#0a1b23]"
                              }`}
                            >
                              <div className="absolute top-4 left-4 w-[18px] h-[18px]">
                                <RadioGroupItem
                                  value={option.id}
                                  id={option.id}
                                  className="h-[18px] w-[18px] rounded-full border-2 border-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                                />
                              </div>
                              <Label
                                htmlFor={option.id}
                                className="absolute top-4 left-12 [font-family:'Inter',Helvetica] font-bold text-white text-lg tracking-[0] leading-[normal] cursor-pointer"
                              >
                                {option.label}
                              </Label>
                              <div className="absolute top-12 left-12 right-4 [font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal]">
                                {option.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Installation Type Section */}
                    <div className="space-y-4">
                      <h3 className="[font-family:'Rubik',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[normal]">
                        Installation Type
                      </h3>
                      <RadioGroup
                        value={selectedInstallationType}
                        onValueChange={setSelectedInstallationType}
                        className="flex flex-row gap-3"
                      >
                        {installationTypeOptions.map((option) => (
                          <div
                            key={option.id}
                            className="flex-1 relative"
                          >
                            <div
                              className={`relative w-full h-[120px] rounded-[15px] border-2 p-4 ${
                                selectedInstallationType === option.id
                                  ? "border-white bg-[#0a1b23]"
                                  : "border-gray-500 bg-[#0a1b23]"
                              }`}
                            >
                              <div className="absolute top-4 left-4 w-[18px] h-[18px]">
                                <RadioGroupItem
                                  value={option.id}
                                  id={option.id}
                                  className="h-[18px] w-[18px] rounded-full border-2 border-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                                />
                              </div>
                              <Label
                                htmlFor={option.id}
                                className="absolute top-4 left-12 [font-family:'Inter',Helvetica] font-bold text-white text-lg tracking-[0] leading-[normal] cursor-pointer"
                              >
                                {option.label}
                              </Label>
                              <div className="absolute top-12 left-12 right-4 [font-family:'Inter',Helvetica] font-normal text-white text-[15px] tracking-[0] leading-[normal]">
                                {option.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Electric Bill Section */}
                    <div className="space-y-4">
                      <h3 className="[font-family:'Rubik',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[normal]">
                        Electric Bill
                      </h3>
                      <div className="flex gap-4">
                        <div className="relative flex-1">
                          <Input
                            className="w-full h-[50px] rounded-[10px] border-2 border-white bg-transparent text-white text-lg placeholder:text-[#ffffff60] pr-12"
                            placeholder="0.00"
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 [font-family:'Rubik',Helvetica] font-light text-white text-base tracking-[0] leading-[normal] pointer-events-none">
                            Dh
                          </div>
                        </div>
                        <Button className="h-[50px] w-[200px] bg-white rounded-[10px] border-0 hover:bg-white/90 flex items-center justify-center">
                          <span className="[font-family:'Rubik',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[normal]">
                            Calculate
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <img
            className="absolute w-[792px] h-[445px] top-12 left-0 object-cover"
            alt="Element"
            src="/figmaAssets/1-1--1.png"
          />
        </section>

        <img
          className="w-[23px] h-[26px] top-[1089px] left-[948px] absolute object-cover"
          alt="Image"
          src="/figmaAssets/image-13.png"
        />

        <section className="absolute w-[1918px] h-[922px] top-[1185px] left-px bg-[url(/figmaAssets/image-8-bit-style.png)] bg-[100%_100%]">
          <div className="relative w-[738px] h-[249px] top-[336px] left-[592px]">
            <div className="absolute w-[734px] top-[85px] left-0 [font-family:'Inter',Helvetica] font-medium text-white text-xl text-center tracking-[0] leading-[normal]">
              Whether your goal is to reduce your electric bill or eliminate it
              completely, eaneer can help make that happen.
            </div>

            <div className="absolute top-0 left-[156px] [font-family:'Inter',Helvetica] font-bold text-white text-[28px] text-center tracking-[0] leading-[normal]">
              Power Your Home, Save Money
            </div>

            <Button className="absolute w-[327px] h-[61px] top-[188px] left-[200px] rounded-[30px] border-2 border-solid border-white bg-transparent hover:bg-white/10 h-auto">
              <img
                className="absolute w-[43px] h-[43px] top-[7px] left-[269px]"
                alt="Component"
                src="/figmaAssets/component-1.svg"
              />
              <div className="absolute top-4 left-[18px] [font-family:'Inter',Helvetica] font-bold text-white text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                Ready To Save Energy?
              </div>
            </Button>
          </div>
        </section>

        <section className="absolute w-[1919px] h-[986px] top-[2191px] left-0 bg-[linear-gradient(180deg,rgba(6,20,27,1)_0%,rgba(252,251,252,1)_100%)]">
          <img
            className="w-[723px] h-[482px] top-[381px] left-[589px] absolute object-cover"
            alt="Image"
            src="/figmaAssets/image-10.png"
          />

          <div className="absolute top-[117px] left-[738px] [font-family:'Inter',Helvetica] font-bold text-black text-[28px] text-center tracking-[0] leading-[normal]">
            <span className="[font-family:'Inter',Helvetica] font-bold text-black text-[28px] tracking-[0]">
              Take Control{" "}
            </span>
            <span className="[font-family:'Inter',Helvetica] font-bold text-black text-[28px] tracking-[0]">
              of
            </span>
            <span className="[font-family:'Inter',Helvetica] font-bold text-black text-[28px] tracking-[0]">
              {" "}
              Your Energy Bills
            </span>
          </div>

          <div className="absolute w-[820px] top-[189px] left-[550px] [font-family:'Inter',Helvetica] font-semibold text-black text-base text-center tracking-[0] leading-[normal]">
            Take control of your energy bills by switching to solar power;
            reduce reliance on expensive electricity, lock in lower rates, and
            enjoy long term savings
          </div>

          <Button className="top-[265px] left-[797px] absolute w-[327px] h-[61px] rounded-[30px] border-2 border-solid border-[#06141b] bg-transparent hover:bg-[#06141b]/10 h-auto">
            <img
              className="absolute w-[43px] h-[43px] top-[7px] left-[269px]"
              alt="Component"
              src="/figmaAssets/component-1-2.svg"
            />
            <div className="absolute top-4 left-[18px] [font-family:'Inter',Helvetica] font-bold text-[#06141b] text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
              Ready To Save Energy?
            </div>
          </Button>

          <div className="absolute top-[917px] left-[717px] [font-family:'Inter',Helvetica] font-semibold text-black text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
            It takes just a few steps to make your family happy
          </div>
        </section>

        <div className="absolute top-[3439px] left-[853px] [font-family:'Inter',Helvetica] font-semibold text-white text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
          How Do I Get Started?
        </div>

        <div className="absolute top-[3484px] left-[599px] [font-family:'Inter',Helvetica] font-bold text-transparent text-[28px] text-center tracking-[0] leading-[normal]">
          <span className="text-white">Explore </span>
          <span className="text-[#69818d]">eaneer</span>
          <span className="text-[#69818d]"> energetics</span>
          <span className="text-white">: Solar Energy installations</span>
        </div>

        <section className="absolute w-[918px] h-[247px] top-[3608px] left-[502px]">
          <div className="flex gap-[17px]">
            {processSteps.map((step, index) => (
              <Card
                key={index}
                className={`w-[296px] h-[247px] bg-[#132e35] rounded-[20px] ${step.highlighted ? "border-[3px] border-solid border-white" : "border-2 border-solid border-white"}`}
              >
                <CardContent className="p-0">
                  <div className="absolute w-[245px] top-[89px] left-[21px] [font-family:'Inter',Helvetica] font-medium text-white text-[15px] tracking-[0] leading-[normal]">
                    {step.description}
                  </div>
                  <div className="absolute top-[45px] left-[21px] [font-family:'Inter',Helvetica] font-semibold text-white text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                    {step.title}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Button className="top-[3944px] left-[815px] absolute w-[327px] h-[61px] rounded-[30px] border-2 border-solid border-white bg-transparent hover:bg-white/10 h-auto">
          <img
            className="absolute w-[43px] h-[43px] top-[7px] left-[269px]"
            alt="Component"
            src="/figmaAssets/component-1.svg"
          />
          <div className="absolute top-4 left-[18px] [font-family:'Inter',Helvetica] font-bold text-white text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
            Ready To Save Energy?
          </div>
        </Button>

        <Button className="top-[5097px] left-[796px] absolute w-[327px] h-[61px] rounded-[30px] border-2 border-solid border-white bg-transparent hover:bg-white/10 h-auto">
          <img
            className="absolute w-[43px] h-[43px] top-[7px] left-[269px]"
            alt="Component"
            src="/figmaAssets/component-1.svg"
          />
          <div className="absolute top-4 left-[18px] [font-family:'Inter',Helvetica] font-bold text-white text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
            Ready To Save Energy?
          </div>
        </Button>

        <img
          className="w-[23px] h-[26px] top-[4091px] left-[948px] absolute object-cover"
          alt="Image"
          src="/figmaAssets/image-13.png"
        />

        <div className="absolute w-[1040px] top-[4358px] left-[440px] [font-family:'Inter',Helvetica] font-semibold text-transparent text-[51px] text-justify tracking-[0] leading-[normal]">
          <span className="text-white">With </span>
          <span className="text-[#69818d]">eaneer energetics</span>
          <span className="text-white">
            , your impact lives on. We&apos;re on a mission to make Morocco a
            beacon of green energy. Every solar installation is more than
            savings it&apos;s a legacy. Join our community, grow your impact,
            and inspire the future.
          </span>
        </div>

        <div className="absolute top-[4872px] left-[440px] bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(44,74,82,1)_50%,rgba(255,255,255,1)_75%,rgba(105,129,141,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-semibold text-transparent text-5xl tracking-[0] leading-[normal]">
          Together, We Rise Under One Sun.
        </div>

        <img
          className="w-[1280px] h-[309px] top-[5362px] left-80 absolute object-cover"
          alt="Image"
          src="/figmaAssets/image-12.png"
        />

        <img
          className="w-[23px] h-[26px] top-[5820px] left-[948px] absolute object-cover"
          alt="Image"
          src="/figmaAssets/image-13.png"
        />

        <footer className="w-[1920px] h-[329px] top-[5997px] left-0 absolute">
          <img
            className="w-full h-full object-cover"
            alt="Footer"
            src="/figmaAssets/image-14.png"
          />
        </footer>
      </div>
    </div>
  );
};
