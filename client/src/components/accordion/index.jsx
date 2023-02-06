import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./index.scss";

const AccordionComponent = () => {
  return (
    <div>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Who choose LightFolio client galleries?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Our online galleries are built for professional photographers. You
            have a host of custom design options so you can create galleries
            that match your brand. Enable downloads, favorites, online sales and
            several other options for each gallery.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Can I upload my galleries for free
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Yes. Our base plan allows free online photo galleries, where you can
            upload up to a gigabyte of images. You will have access to most
            every feature found on paid tiers. Upgrade only when you need more
            storage
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Can I control who sees my gallery?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Photgraphers can limit access to their online galleries with a PIN
            or by requiring email + password authentication. The are optional
            settings you can enable.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                What options do I have with downloads?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Each of your photo galleries can restrict download types (single
            image vs entire gallery) and download sizes.{" "}
            <Link to={"/deliver-photos-to-client"}>Download delivery</Link> is
            also tracked so you can confirm which clients received their images.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                What are favorites?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Favorites give your clients the ability to select, collaborate and
            comment on their favorite images in your photo gallery. It's a
            convenient <Link to={"/photo-proofing"}>proofing system</Link>.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Can I use my own domain?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            All paid plans allow you to use your own domain to display the
            contents of your online galleries. Free plans allow you to choose a
            custom Lightfolio domain (mycompany.lightfolio.com).
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Will my galleries load fast from different locations?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Performance is important. All photo gallery content is delivered by
            a global content delivery network (CDN) to ensure your images load
            fast.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Do you charge a commission?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            For free plans, there is a commission when selling through your
            online store. However, all paid plans have 0% commission. This is a
            great way to try out sales on the free tier and if you start selling
            regularly, upgrade as needed.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Can I upload videos to my gallery?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Video uploads are no possible in your online gallery. This feature
            is currently in beta--simply request access to start uploading your
            own videos directly to Lightfolio.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Can I project my images wuth a watermark?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Yes. Copyright protection is important to photographers and so
            watermarks are an option you can enable. Create text or image based
            watermarks and apply them on any gallery.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Do you have a Lightroom integration?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Use our free Lightroom plugin to upload and sync photos in your
            galleries.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Do you support multiple languages?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            We serve photographers all across the world and now offer support
            for over a dozen languages. Display your online galleries using your
            clients native language.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                How will my galleries display on a mobile device?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Lightfolio photo galleries are built to display on any device.
            Clients can view your photo galleries on desktop, laptop, tablet or
            mobile device.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Can I promote my own brand?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Every photographer can promote their brand by using your own studio
            logo and favicon on all galleries.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                How do I share my gallery with clients?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Sharing client galleries is easy. Add a custom message and login &
            download details your gallery invitations. Keep track of who has
            visited each gallery to sure your clients received the invite.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Doy you support any integrations with Lightfolio galleries?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Our other products (
            <Link to={"/crm-for-photographers"}>Studio Manager</Link>,{" "}
            <Link to={"/websites"}>Websites</Link>) both integrate with
            Lightfolio Client Galleries. Using one platform to manage your
            entire photography business makes life much, much easier.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Have more questions?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Please reach out with other question at:
            <span
              onClick={(e) => {
                window.location.href = "mailto:hello@lightfolio.com";
              }}
            >
              hello@lightfolio.com
            </span>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordionComponent;
