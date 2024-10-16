import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IdentificationIcon from "@/svg/identification";
import PaintBrushIcon from "@/svg/paint-brush";
import WrenchScrewdriverIcon from "@/svg/wrench-screwdriver";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FeatureItemProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

function FeatureItem({ title, desc, icon }: FeatureItemProps) {
  return (
    <Card className="my-4 md:flex-1 md:flex md:flex-col">
      <CardHeader className="min-h-28">
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center md:justify-between md:flex-1 flex-row-reverse gap-8">
        <p>{desc}</p>
        <div className="flex justify-center text-violet-400 mt-4 size-12 xl:size-24">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-violet-500 text-3xl md:text-4xl font-bold">
      {children}
    </h2>
  );
}

interface AboutItemProps {
  image: string;
  title: string;
  desc: string;
  imagePosition: "left" | "right";
}

function AboutItem({ title, desc, image, imagePosition }: AboutItemProps) {
  return (
    <div
      className={`flex flex-col ${
        imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
      } gap-4 md:gap-8`}
    >
      <div>
        <h4 className="text-2xl font-medium text-violet-300 md:text-3xl">
          {title}
        </h4>
        <p className="mt-4 text-zinc-100 md:text-lg">{desc}</p>
      </div>
      <div className="flex justify-center md:block md:w-[1600px]">
        <Image
          className="size-60 md:size-auto"
          src={`/images/${image}.webp`}
          alt={image}
          width={800}
          height={800}
        />
      </div>
    </div>
  );
}

interface IconLinkProps {
  href: string;
  image: string;
  alt: string;
}

function IconLink({ href, image, alt }: IconLinkProps) {
  return (
    <Link href={href}>
      <Image src={`/images/${image}`} alt={alt} width={48} height={48} />
    </Link>
  );
}

export default function Home() {
  return (
    <div className="">
      <div className="header mb-24">
        <header className="h-screen pt-8 md:p-12 flex flex-col justify-start md:justify-center m-auto px-4 md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]">
          <div>
            <h1 className="text-4xl md:text-5xl text-violet-500 font-bold">
              Game Plus:
              <br />
              <span className="text-zinc-200">
                AI and Blockchain Solutions for the Gaming
              </span>
            </h1>
            <h2 className="text-lg md:text-3xl font-semibold text-zinc-100 mt-4">
              Connect your social accounts, and leverage the powerful AI tools
              provided by Game Plus and Story Protocol to create intelligent
              gaming experiences.
            </h2>
          </div>
          <div className="flex flex-col items-center gap-8 mt-8 md:flex-row md:justify-center md:h-1/2">
            <Image
              src="/images/navbar-logo.png"
              alt="GamePlus"
              width={336.36}
              height={60}
            />
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-24"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <Image
              src="/images/story-logo.png"
              alt="Story"
              width={261.75}
              height={60}
            />
          </div>
        </header>
      </div>
      <div className="features-section-wrapper">
        <section className="min-h-screen m-auto px-4 md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] flex flex-col justify-center">
          <H2>Unlock the Power of Game Plus with Story Support</H2>
          <div className="mt-4 lg:flex md:gap-8 md:justify-center md:mt-16">
            <FeatureItem
              title="Personalize Your Digital Identity"
              desc="Upload avatars, connect Twitter and Steam, and create a unique
              digital identity powered by Game Plus's intelligent solutions."
              icon={<IdentificationIcon />}
            />
            <FeatureItem
              title="Revolutionary Gaming and AI Blockchain"
              desc="Game Plus provides powerful tools and intelligent solutions
              designed for the gaming industry, with blockchain technology
              support from Story Protocol."
              icon={<WrenchScrewdriverIcon />}
            />
            <FeatureItem
              title="Programmable AI Modules for Unlimited Creativity"
              desc="Enhance game development and experiences with AI-driven asset
              generation, dialogue engines, and programmable IP modules powered
              by Story Protocol."
              icon={<PaintBrushIcon />}
            />
          </div>
        </section>
      </div>
      <div className="mt-24 m-auto px-4 md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]">
        <section className="min-h-screen my-24 md:mt-0">
          <H2>
            Game Plus: AI and Blockchain Platform for the Gaming Industry,
            Supported by Story Protocol
          </H2>
          <h3 className="text-2xl md:text-3xl font-semibold mt-4">
            Game Plus is a revolutionary gaming and AI blockchain. Through
            locally-hosted large language models (LLMs), community-driven
            fine-tuned AI, and programmable IP support from Story, developers
            can create highly interactive and intelligent gaming experiences.
          </h3>
          <div className="mt-4 md:mt-16 flex flex-col gap-6 md:gap-12">
            <AboutItem
              title="Intelligent Game Development"
              desc="Game Plus enables developers to build smarter, more engaging games by leveraging locally-hosted large language models (LLMs) and community-driven fine-tuned AI. These models allow for dynamic interactions within games, from realistic NPC dialogues to complex decision-making systems that adapt to player actions. With Story Protocol's blockchain support, developers can securely integrate these advanced AI functionalities into their games, ensuring that data remains protected while enhancing gameplay with cutting-edge intelligence."
              image="intelligent-game-development"
              imagePosition="left"
            />
            <AboutItem
              title="Comprehensive AI Tool Support"
              desc="Game Plus provides a robust suite of AI-powered tools, including asset and dialogue generation engines, developer SDKs, access to vast datasets for AI training, player data analytics, and attribution modules. These tools are designed to streamline the game development process, enabling developers to rapidly prototype, iterate, and enhance their games. Story Protocol's blockchain infrastructure ensures that all these tools operate within a secure and scalable environment, offering developers a reliable foundation for integrating AI innovations."
              image="comprehensive-ai-tool-support"
              imagePosition="right"
            />
            <AboutItem
              title="Decentralized Content Creation"
              desc="Game Plus introduces a pioneering decentralized protocol that allows developers to create, manage, and monetize game content in a distributed manner. By integrating Story’s Programmable IP capabilities, developers can easily set terms for how their in-game assets and IPs can be used, shared, or remixed. This system automates licensing and revenue sharing, making it easier for creators to collaborate without complex legal negotiations. With Story's support, Game Plus acts as a seamless bridge between AI-driven content generation and secure, transparent IP management on the blockchain."
              image="decentralized-content-creation"
              imagePosition="left"
            />
          </div>
        </section>
      </div>
      <div className="start-section-wrapper">
        <section className="min-h-screen flex items-center">
          <Link className="w-full flex justify-center" href="/passport">
            <Button className="w-1/2 rounded-full h-16 md:h-24 text-2xl md:text-3xl border-violet-900 border-4">
              Start to Try!
            </Button>
          </Link>
        </section>
      </div>
      <div className="mt-24 m-auto px-4 md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]">
        <footer className="flex flex-col gap-4 p-4 md:flex-row justify-between">
          <Image
            src="/images/navbar-logo.png"
            alt="GamePlus"
            width={300}
            height={20}
          />
          <div>
            <div className="flex">
              <IconLink
                href="https://t.me/Gameplus_ai"
                image="telegram.svg"
                alt="Telegram"
              />
              <IconLink
                href="https://twitter.com/gameplus_ai"
                image="x.svg"
                alt="X"
              />
              <IconLink
                href="https://medium.com/@gameplus.official"
                image="medium.svg"
                alt="Medium"
              />
            </div>
            <div>© 2023 Game Plus. All Rights Reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
